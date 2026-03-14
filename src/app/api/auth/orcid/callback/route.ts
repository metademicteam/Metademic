import { NextResponse } from 'next/server';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';
import { createClient as createSupabaseServer } from '@/utils/supabase/server';

// Initialize Supabase with Service Role Key for admin actions
const supabaseAdmin = createSupabaseAdmin(
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
    // 0. Check if user is already logged in (Linking Flow)
    const supabase = await createSupabaseServer();
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    // 1. Exchange code for access token from ORCID
    const params = new URLSearchParams();
    params.append('client_id', process.env.ORCID_CLIENT_ID!);
    params.append('client_secret', process.env.ORCID_CLIENT_SECRET!);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', `${origin}/api/auth/orcid/callback`);

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

    const { orcid, name, access_token } = tokenData;

    // 2. Fetch detailed ORCID record
    const profileUpdates: Record<string, string | null | undefined> = {
      full_name: name,
      orcid: orcid,
    };

    try {
      const recordResponse = await fetch(`https://pub.orcid.org/v3.0/${orcid}/record`, {
        headers: { 
          'Accept': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
      });

      if (recordResponse.ok) {
        const recordData = await recordResponse.json();
        
        // --- 1. BIOGRAPHY ---
        const bio = recordData.person?.biography?.content;
        if (bio) profileUpdates.bio = bio;

        // --- 2. NAMES ---
        const names = recordData.person?.name;
        if (names) {
          profileUpdates.first_name = names['given-names']?.value || profileUpdates.first_name;
          profileUpdates.last_name = names['family-name']?.value || profileUpdates.last_name;
          if (names['credit-name']?.value) {
            profileUpdates.full_name = names['credit-name'].value;
          }
        }

        // --- 3. AFFILIATIONS ---
        const employments = recordData['activities-summary']?.employments?.['affiliation-group'];
        const educations = recordData['activities-summary']?.educations?.['affiliation-group'];
        
        let targetAffiliation = null;
        if (employments && employments.length > 0) {
          targetAffiliation = employments[0].summaries?.[0]?.['employment-summary'];
          profileUpdates.workplace = 'Academic';
        } else if (educations && educations.length > 0) {
          targetAffiliation = educations[0].summaries?.[0]?.['education-summary'];
          profileUpdates.workplace = 'Student';
        }

        if (targetAffiliation) {
          profileUpdates.affiliation = targetAffiliation.organization?.name;
          profileUpdates.city = targetAffiliation.organization?.address?.city;
          profileUpdates.country = targetAffiliation.organization?.address?.country;
          const dept = targetAffiliation['department-name'];
          if (dept && profileUpdates.affiliation) {
            profileUpdates.affiliation = `${dept}, ${profileUpdates.affiliation}`;
          }
        }

        // --- 4. WEBSITES & SOCIAL ---
        const researcherUrls = recordData.person?.['researcher-urls']?.['researcher-url'];
        if (researcherUrls && researcherUrls.length > 0) {
          profileUpdates.website = researcherUrls[0].url?.value;
        }

        researcherUrls?.forEach((urlObj: { url?: { value?: string } }) => {
          const url = urlObj.url?.value?.toLowerCase();
          if (url?.includes('twitter.com') || url?.includes('x.com')) profileUpdates.twitter = url;
          if (url?.includes('facebook.com')) profileUpdates.facebook = url;
        });
      }
    } catch (recordErr) {
      console.error('Error fetching ORCID record:', recordErr);
    }

    let userToRedirect = currentUser;

    if (currentUser) {
      // LINKING FLOW: Link ORCID to current authenticated account
      await supabaseAdmin.auth.admin.updateUserById(currentUser.id, {
        user_metadata: { ...currentUser.user_metadata, orcid: orcid, full_name: name, provider: 'orcid' }
      });
      userToRedirect = currentUser;
    } else {
      // LOGIN / SIGNUP FLOW
      const userEmail = `${orcid}@orcid.auth`;
      const { data: users } = await supabaseAdmin.auth.admin.listUsers();
      let user = users?.users.find(u => u.user_metadata?.orcid === orcid || u.email === userEmail);

      if (!user) {
        const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
          email: userEmail,
          email_confirm: true,
          user_metadata: { full_name: name, orcid: orcid, provider: 'orcid' }
        });
        if (createError) throw createError;
        user = newUser.user;
      } else {
        await supabaseAdmin.auth.admin.updateUserById(user.id, {
          user_metadata: { ...user.user_metadata, orcid: orcid, full_name: name }
        });
      }
      userToRedirect = user;
    }

    // 4. Update Profile in database
    await supabaseAdmin
      .from('profiles')
      .upsert({
        id: userToRedirect!.id,
        ...profileUpdates,
        is_verified: true,
        updated_at: new Date().toISOString()
      });

    // 5. Final Redirect
    if (currentUser) {
      // If they were already logged in, just go back to edit profile
      return NextResponse.redirect(`${origin}/user/edit?success=ORCID Connected`);
    } else {
      // New login, generate magic link for session
      const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
        type: 'magiclink',
        email: userToRedirect!.email!,
        options: { redirectTo: `${origin}/user/myprofile` }
      });
      if (linkError) throw linkError;
      return NextResponse.redirect(linkData.properties.action_link);
    }

  } catch (err: unknown) {
    console.error('ORCID Callback Error:', err);
    return NextResponse.redirect(`${origin}/login?error=internal_server_error`);
  }
}
