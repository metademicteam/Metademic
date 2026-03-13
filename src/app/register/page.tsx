"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveRight, Mail, Lock, User, Building, MapPin, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    orcid: "",
    affiliation: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Supabase Auth Integration goes here later
    console.log("Register form submitted:", formData);
  };

  const handleOrcidLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_ORCID_CLIENT_ID;
    const redirectUri = encodeURIComponent(`http://127.0.0.1:3000/api/auth/orcid/callback`);
    const orcidUrl = `https://orcid.org/oauth/authorize?client_id=${clientId}&response_type=code&scope=/authenticate&redirect_uri=${redirectUri}`;
    window.location.href = orcidUrl;
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row"
      >
        {/* Left Side: Branding/Info */}
        <div className="w-full lg:w-4/12 bg-gradient-to-br from-[var(--mdpi-blue)] to-[var(--mdpi-blue-dark)] p-10 flex flex-col justify-between text-white relative overflow-hidden order-2 lg:order-1">
          {/* Decorative background circles */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-white opacity-5 blur-2xl"></div>

          <div className="relative z-10 hidden lg:block">
            <Link href="/" className="inline-block mb-12">
              <h1 className="text-3xl font-bold tracking-tight">Metademic</h1>
            </Link>
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold leading-tight">Join the academic community.</h2>
              <div className="space-y-4 mt-8">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="w-6 h-6 text-blue-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">Publish Open Access</h4>
                    <p className="text-blue-100 text-sm mt-1">Share your research with the world securely and rapidly.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BadgeCheck className="w-6 h-6 text-blue-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">Manage Submissions</h4>
                    <p className="text-blue-100 text-sm mt-1">Track your articles through the peer-review process.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BadgeCheck className="w-6 h-6 text-blue-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white">Build Your Profile</h4>
                    <p className="text-blue-100 text-sm mt-1">Link your ORCID and affiliation to boost your academic presence.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-16 relative z-10">
            <p className="text-blue-200 text-sm">Already have an account?</p>
            <Link 
              href="/login" 
              className="mt-2 inline-flex items-center text-white font-medium hover:text-blue-200 transition-colors group"
            >
              Sign in instead
              <MoveRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Side: Register Form */}
        <div className="w-full lg:w-8/12 p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-white order-1 lg:order-2">
          <div className="w-full max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h3>
                <p className="text-gray-500 text-sm">Fill in your details to set up your profile.</p>
              </div>
              <Link href="/" className="lg:hidden text-2xl font-bold tracking-tight text-[var(--mdpi-blue)]">
                Metademic
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Mandatory Fields */}
              <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100 space-y-5">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Required Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="fullName" className="text-gray-700">Full Name <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input 
                        id="fullName" 
                        type="text" 
                        placeholder="Dr. Jane Doe" 
                        className="pl-10 h-11"
                        value={formData.fullName}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">Email Address <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="jane.doe@university.edu" 
                        className="pl-10 h-11"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700">Password <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Create a password" 
                        className="pl-10 h-11"
                        value={formData.password}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional Fields based on schema */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] space-y-5">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Academic Profile <span className="text-gray-400 normal-case font-normal">(Optional)</span></h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="orcid" className="text-gray-700 flex justify-between">
                      <span>ORCID iD</span>
                      <a href="https://orcid.org/register" target="_blank" rel="noreferrer" className="text-xs text-[var(--mdpi-link-blue)] hover:underline">What is ORCID?</a>
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <div className="w-4 h-4 rounded-full bg-[#A6CE39] flex items-center justify-center text-white font-bold text-[8px]">iD</div>
                      </div>
                      <Input 
                        id="orcid" 
                        type="text" 
                        placeholder="0000-0000-0000-0000" 
                        className="pl-10 h-11"
                        value={formData.orcid}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="affiliation" className="text-gray-700">Institution / Affiliation</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input 
                        id="affiliation" 
                        type="text" 
                        placeholder="University of Science" 
                        className="pl-10 h-11"
                        value={formData.affiliation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-gray-700">Country</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input 
                        id="country" 
                        type="text" 
                        placeholder="e.g. United States" 
                        className="pl-10 h-11"
                        value={formData.country}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-2">
                <p className="text-xs text-gray-500 max-w-sm">
                  By registering, you agree to our <Link href="/terms" className="text-[var(--mdpi-link-blue)] hover:underline">Terms & Conditions</Link> and <Link href="/privacy" className="text-[var(--mdpi-link-blue)] hover:underline">Privacy Policy</Link>.
                </p>
                <Button type="submit" className="w-full sm:w-auto px-8 h-12 text-base font-medium shrink-0">
                  Create Account
                </Button>
              </div>
            </form>

            {/* Divider */}
            <div className="mt-10 flex items-center before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
              <span className="px-4 text-sm text-gray-500 bg-white">Or sign up with</span>
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
