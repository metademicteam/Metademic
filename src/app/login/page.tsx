"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveRight, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Standard Email Login logic goes here
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error(error);
      return;
    }
    
    window.location.href = '/user/myprofile';
  };

  const handleOrcidLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_ORCID_CLIENT_ID;
    if (!clientId) {
      console.error("ORCID Client ID is missing. Please check your .env file for NEXT_PUBLIC_ORCID_CLIENT_ID");
      alert("Configuration Error: ORCID Client ID is missing.");
      return;
    }
    const redirectUri = encodeURIComponent(`http://127.0.0.1:3000/api/auth/orcid/callback`);
    const scopes = encodeURIComponent('/authenticate /read-limited');
    const orcidUrl = `https://orcid.org/oauth/authorize?client_id=${clientId}&response_type=code&scope=${scopes}&redirect_uri=${redirectUri}`;
    window.location.href = orcidUrl;
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side: Branding/Info */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-[var(--mdpi-blue)] to-[var(--mdpi-blue-dark)] p-10 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Decorative background circles */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-white opacity-5 blur-2xl"></div>

          <div className="relative z-10">
            <Link href="/" className="inline-block mb-12">
              <h1 className="text-3xl font-bold tracking-tight">Metademic</h1>
            </Link>
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold leading-tight">Welcome back to your academic hub.</h2>
              <p className="text-blue-100 text-sm leading-relaxed">
                Log in to access your dashboard, manage your publications, review submissions, and discover leading research.
              </p>
            </div>
          </div>

          <div className="mt-16 relative z-10">
            <p className="text-blue-200 text-sm">Don&apos;t have an account?</p>
            <Link 
              href="/register" 
              className="mt-2 inline-flex items-center text-white font-medium hover:text-blue-200 transition-colors group"
            >
              Create an account 
              <MoveRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h3>
            <p className="text-gray-500 mb-8 text-sm">Enter your email and password to access your account.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    className="pl-10 h-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Link href="#" className="text-sm font-medium text-[var(--mdpi-link-blue)] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    className="pl-10 h-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-base font-medium mt-2">
                Sign In
              </Button>
            </form>

            {/* Divider */}
            <div className="mt-8 flex items-center before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
              <span className="px-4 text-sm text-gray-500 bg-white">Or continue with</span>
            </div>

            {/* Alternative Logins - Future Placements */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Button type="button" variant="outline" className="h-12 w-full flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                  <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                  <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                  <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                </svg>
                Google
              </Button>
              <Button type="button" onClick={handleOrcidLogin} variant="outline" className="h-12 w-full flex items-center justify-center gap-2 hover:bg-[#a6ce39]/10 hover:text-[#a6ce39] hover:border-[#a6ce39] transition-colors">
                {/* ORCID Icon Approximation */}
                <div className="w-5 h-5 rounded-full bg-[#A6CE39] flex items-center justify-center text-white font-bold text-[10px]">iD</div>
                ORCID
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
