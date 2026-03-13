import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with Service Role Key for admin actions
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=No code provided`);
  }

  try {
    // 1. Exchange code for access token from ORCID
    const params = new URLSearchParams();
    params.append('client_id', process.env.ORCID_CLIENT_ID!);
    params.append('client_secret', process.env.ORCID_CLIENT_SECRET!);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', `http://127.0.0.1:3000/api/auth/orcid/callback`);

    const tokenResponse = await fetch('https://orcid.org/oauth/token', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('ORCID Token Error:', tokenData);
      return NextResponse.redirect(`${origin}/login?error=${tokenData.error_description}`);
    }

    const { orcid, name } = tokenData;

    // 2. Find or create user in Supabase
    // We'll use the email if provided by ORCID (optional) or just link via ORCID ID in metadata/profile
    // Note: ORCID Public API doesn't always return email. If not, we might need to ask or use a random one if just for testing.
    // For academic platforms, users usually have an email.
    
    const userEmail = `${orcid}@orcid.auth`; // Fallback email since ORCID login is enough

    // Check if user exists
    const { data: users } = await supabaseAdmin.auth.admin.listUsers();
    let user = users?.users.find(u => u.user_metadata?.orcid === orcid || u.email === userEmail);

    if (!user) {
      // Create new user
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: userEmail,
        email_confirm: true,
        user_metadata: {
          full_name: name,
          orcid: orcid,
          provider: 'orcid'
        }
      });
      
      if (createError) throw createError;
      user = newUser.user;
    } else {
        // Update user metadata if needed
        await supabaseAdmin.auth.admin.updateUserById(user.id, {
            user_metadata: { ...user.user_metadata, orcid: orcid, full_name: name }
        });
    }

    // 3. Generate a magic link/session for the user
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: user!.email!,
      options: {
          redirectTo: `${origin}/dashboard`
      }
    });

    if (linkError) throw linkError;

    // Redirect to the login link
    return NextResponse.redirect(linkData.properties.action_link);

  } catch (err: unknown) {
    const error = err as Error;
    console.error('ORCID Callback Error:', error);
    return NextResponse.redirect(`${origin}/login?error=internal_server_error`);
  }
}
