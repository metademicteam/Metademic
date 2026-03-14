"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [id]: checked });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const passwordRequirements = [
    { id: 1, label: "Minimum 8 characters", regex: /.{8,}/ },
    { id: 2, label: "Minimum one small letter", regex: /[a-z]/ },
    { id: 3, label: "Minimum one capital letter", regex: /[A-Z]/ },
    { id: 4, label: "Minimum one number", regex: /[0-9]/ },
  ];

  const getPasswordMetrics = (password: string) => {
    const checks = passwordRequirements.map(req => ({
      ...req,
      isMet: req.regex.test(password)
    }));
    const metCount = checks.filter(c => c.isMet).length;
    
    let strength = "Weak";
    let colorClass = "text-red-500";
    let bgClass = "bg-red-500";

    if (metCount === 4) {
      strength = "Strong";
      colorClass = "text-green-600";
      bgClass = "bg-green-600";
    } else if (metCount >= 2) {
      strength = "Medium";
      colorClass = "text-yellow-600";
      bgClass = "bg-yellow-500";
    }

    return { checks, strength, colorClass, bgClass, isStrong: metCount === 4 };
  };

  const metrics = getPasswordMetrics(formData.password);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.repeatPassword) {
      alert("Please fill in all required fields marked with *");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!metrics.isStrong) {
      alert("Registration failed: Password is too weak. Please meet all requirements.");
      return;
    }

    if (formData.password !== formData.repeatPassword) {
      alert("Passwords do not match");
      return;
    }
    
    if (!formData.acceptTerms) {
      alert("Please accept the Terms of Use and Privacy Policy");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Check if email is blocked/previously rejected
      const { data: blockedData } = await supabase
        .from("blocked_emails")
        .select("email")
        .eq("email", formData.email.toLowerCase())
        .maybeSingle();

      if (blockedData) {
        alert("This email address has been restricted from registration due to a previous rejection or policy violation.");
        setIsSubmitting(false);
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: formData.email.split('@')[0], // Default name
          }
        }
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          alert("This email is already registered. Please try logging in or use a different email.");
        } else {
          alert("Registration error: " + error.message);
        }
        return;
      }

      if (data.user) {
        alert("Registration successful! Please check your email for confirmation.");
        router.push("/login");
      }
    } catch (err: unknown) {
      console.error("Registration error:", err);
      alert("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Header Bar */}
      <div className="bg-[#f2f2f2] border-b border-gray-200 py-2.5 px-4 md:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto w-full">
          <h2 className="text-black text-[13px] font-bold">User Registration</h2>
        </div>
      </div>

      <main className="flex-grow max-w-[1200px] mx-auto w-full px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
          
          {/* Left Column: Register Form */}
          <div className="lg:col-span-7">
            <div className="mb-10">
              <h1 className="text-[22px] font-bold text-[#004a99] mb-4">Registration</h1>
              <div className="h-[1px] bg-gray-200 w-full"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Email Field */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="md:w-36 flex justify-end shrink-0 pt-2">
                  <Label htmlFor="email" className="text-black text-[13px] font-bold text-right relative inline-block">
                    <span className="text-red-600 absolute -left-3">*</span>E-Mail address
                  </Label>
                </div>
                <div className="flex-1 space-y-2">
                  <Input 
                    id="email" 
                    type="email" 
                    className="h-9 border-gray-300 rounded-none w-full max-w-md focus-visible:ring-1 focus-visible:ring-[#004a99] focus-visible:border-[#004a99] text-black font-medium" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                  <p className="text-[11px] text-black font-medium leading-tight max-w-md">
                    Please provide a valid e-mail address as you will be required to confirm it.
                  </p>
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="md:w-36 flex justify-end shrink-0 pt-2">
                  <Label htmlFor="password" className="text-black text-[13px] font-bold text-right relative inline-block">
                    <span className="text-red-600 absolute -left-3">*</span>Password
                  </Label>
                </div>
                <div className="flex-1 space-y-3">
                  <Input 
                    id="password" 
                    type="password" 
                    className="h-9 border-gray-300 rounded-none w-full max-w-md focus-visible:ring-1 focus-visible:ring-[#004a99] focus-visible:border-[#004a99] text-black font-medium" 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                  />
                  
                  {/* Password Strength UI */}
                  {formData.password && (
                    <div className="max-w-md space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-black">Password Strength:</span>
                        <span className={metrics.colorClass}>{metrics.strength}</span>
                      </div>
                      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ease-out ${metrics.bgClass}`}
                          style={{ width: `${(metrics.checks.filter(c => c.isMet).length / 4) * 100}%` }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1">
                        {metrics.checks.map(check => (
                          <div key={check.id} className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300 ${check.isMet ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <span className={`text-[10px] leading-none ${check.isMet ? 'text-black font-bold' : 'text-gray-400'}`}>
                              {check.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Repeat Password Field */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="md:w-36 flex justify-end shrink-0 pt-2 text-right">
                  <Label htmlFor="repeatPassword" className="text-black text-[13px] font-bold relative inline-block leading-tight">
                    <span className="text-red-600 absolute -left-3 top-[-2px]">*</span>Repeat New Password
                  </Label>
                </div>
                <div className="flex-1">
                  <Input 
                    id="repeatPassword" 
                    type="password" 
                    className="h-9 border-gray-300 rounded-none w-full max-w-md focus-visible:ring-1 focus-visible:ring-[#004a99] focus-visible:border-[#004a99] text-black font-medium" 
                    value={formData.repeatPassword}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              {/* Terms and Privacy */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="md:w-36 flex justify-end shrink-0 pt-1">
                  <span className="text-red-600 text-sm font-bold">*</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <input 
                      id="acceptTerms" 
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                      className="mt-1 w-4 h-4 border-gray-400 rounded-none accent-[#004a99] cursor-pointer"
                    />
                    <Label htmlFor="acceptTerms" className="text-[12px] text-black leading-relaxed font-bold cursor-pointer">
                      I have read the <Link href="/terms" className="text-[#004a99] hover:underline font-bold">Terms of Use</Link> and the <Link href="/privacy" className="text-[#004a99] hover:underline font-bold">Privacy Policy</Link> and I accept them.
                    </Label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 pt-2">
                <div className="md:w-36 shrink-0"></div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-[#005bb7] hover:bg-[#004a99] text-white rounded-md px-6 h-10 text-[14px] font-bold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Registering..." : "Register with metademic.com"}
                  </Button>
              </div>
            </form>

            <div className="mt-16">
              <p className="text-[11px] text-black italic font-medium">
                <span className="text-red-600 not-italic font-bold">*</span> denotes required fields.
              </p>
            </div>
          </div>

          {/* Right Column: Benefits & Contact */}
          <div className="lg:col-span-4 lg:col-start-9 space-y-12">
            <div className="space-y-5">
              <h3 className="text-[14px] font-bold text-black border-b border-gray-100 pb-2 uppercase tracking-tight">Your benefits:</h3>
              <p className="text-[14px] font-bold text-black">As a registered user you can:</p>
              <ul className="space-y-1.5 list-disc pl-5 text-[13px] text-black font-medium leading-relaxed">
                <li>submit and track the progress of your manuscripts online</li>
                <li>subscribe to receive free table of contents for your favorite journals</li>
                <li>manage your e-mail alerts and alert frequency</li>
                <li>save and manage your search queries</li>
                <li>receive new publications matching your search queries</li>
              </ul>
              <p className="text-[13px] text-black font-medium">
                Registration takes 30 seconds. <Link href="/login" className="text-red-600 hover:underline font-bold">Register now.</Link>
              </p>
            </div>

            {/* Contact Box */}
            <div className="border border-gray-200 p-8 bg-[#fbfbfb] shadow-sm">
              <h3 className="text-[14px] font-bold text-black mb-6 border-b border-gray-100 pb-2">Contact us</h3>
              <div className="space-y-4">
                <Link href="/contact" className="flex items-center gap-3 text-[#004a99] hover:underline text-[13px] font-bold">
                  <Mail className="w-4 h-4 text-[#004a99]" />
                  Contact Form
                </Link>
                <div className="flex items-center gap-3 text-black text-[13px] font-bold">
                  <Phone className="w-4 h-4 text-black" />
                  +41 61 683 77 34
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
