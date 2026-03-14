"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Save
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface Profile {
  id?: string;
  orcid?: string;
  workplace?: string;
  job_type?: string;
  title?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  facebook?: string;
  twitter?: string;
  affiliation?: string;
  address1?: string;
  address2?: string;
  zip_code?: string;
  city?: string;
  country?: string;
  time_zone?: string;
  bio?: string;
  email?: string;
}

export default function EditProfilePage() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfile(data || {});
      }
      setIsLoading(false);
    }
    fetchProfile();
  }, [supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update(profile)
      .eq("id", user.id);

    if (error) {
      alert("Error saving profile: " + error.message);
    } else {
      alert("Profile updated successfully!");
    }
  };

  const handleOrcidConnect = () => {
    const clientId = process.env.NEXT_PUBLIC_ORCID_CLIENT_ID;
    if (!clientId) {
      alert("Configuration Error: ORCID Client ID is missing.");
      return;
    }
    const redirectUri = encodeURIComponent(`http://127.0.0.1:3000/api/auth/orcid/callback`);
    const scopes = encodeURIComponent('/authenticate /read-limited');
    const orcidUrl = `https://orcid.org/oauth/authorize?client_id=${clientId}&response_type=code&scope=${scopes}&redirect_uri=${redirectUri}`;
    window.location.href = orcidUrl;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 py-10 pb-20">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Edit Professional Profile</h1>
          <div className="flex items-center gap-2 mt-1">
             <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">User ID: {profile?.id?.substring(0,8)}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="text-xs">Discard Changes</Button>
          <Button onClick={handleSave} size="sm" className="bg-[var(--mdpi-blue)] hover:bg-[var(--mdpi-blue-dark)] text-xs gap-2">
            <Save className="w-3.5 h-3.5" />
            Save Profile
          </Button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* ORCID Binding Section */}
        <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-100 bg-[#fcfcfc]">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">ORCID</h3>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-[#A6CE39] flex items-center justify-center text-white text-xs font-bold ring-4 ring-[#a6ce39]/10">iD</div>
               <div>
                 <p className="text-sm font-medium text-gray-900">
                   {profile?.orcid ? (
                     <>
                       ORCID {profile.orcid}
                       <span className="ml-3 text-[var(--mdpi-link-blue)] cursor-pointer hover:underline text-xs">[Unbind]</span>
                     </>
                   ) : (
                     <span className="text-gray-400 italic">No ORCID iD connected</span>
                   )}
                   <span className="ml-2 text-gray-400 text-xs">[What is this?]</span>
                 </p>
               </div>
            </div>
            {profile?.orcid ? (
              <Button type="button" onClick={handleOrcidConnect} variant="outline" size="sm" className="text-xs border-gray-200 h-8">Update ORCID</Button>
            ) : (
              <Button type="button" onClick={handleOrcidConnect} className="bg-[#A6CE39] hover:bg-[#88ae2d] text-white text-xs h-8 font-bold">Connect ORCID</Button>
            )}
          </div>
        </div>

        {/* Workplace & Job Info */}
        <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-100 bg-[#fcfcfc]">
            <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              Professional Information
            </h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="workplace" className="text-xs font-bold text-gray-600">* Workplace</Label>
              <select id="workplace" value={profile?.workplace || ""} onChange={handleChange} className="w-full h-9 px-3 rounded-sm border border-gray-200 text-sm focus:border-blue-400 outline-none transition-all">
                <option value="Academic">Academic</option>
                <option value="Corporate">Corporate</option>
                <option value="Government">Government</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="job_type" className="text-xs font-bold text-gray-600">* Job Type</Label>
              <select id="job_type" value={profile?.job_type || ""} onChange={handleChange} className="w-full h-9 px-3 rounded-sm border border-gray-200 text-sm focus:border-blue-400 outline-none transition-all">
                <option value="">Select Job Type</option>
                <option value="Professor">Professor</option>
                <option value="Researcher">Researcher</option>
                <option value="Undergraduate Student">Undergraduate Student</option>
                <option value="PhD Student">PhD Student</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-bold text-gray-600">* Title</Label>
              <select id="title" value={profile?.title || ""} onChange={handleChange} className="w-full h-9 px-3 rounded-sm border border-gray-200 text-sm focus:border-blue-400 outline-none transition-all">
                <option value="">Select</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="first_name" className="text-xs font-bold text-gray-600">* First name</Label>
              <Input id="first_name" className="h-9 rounded-sm border-gray-200" value={profile?.first_name || ""} onChange={handleChange} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="middle_name" className="text-xs font-bold text-gray-600">Middle name</Label>
              <Input id="middle_name" className="h-9 rounded-sm border-gray-200" value={profile?.middle_name || ""} onChange={handleChange} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="last_name" className="text-xs font-bold text-gray-600">* Last name</Label>
              <Input id="last_name" className="h-9 rounded-sm border-gray-200" value={profile?.last_name || ""} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Social & Affiliation */}
        <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
           <div className="px-4 py-2 border-b border-gray-100 bg-[#fcfcfc]">
             <h3 className="text-sm font-bold text-gray-700">Online & Affiliation</h3>
           </div>
           <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="facebook" className="text-xs font-bold text-gray-600">Facebook</Label>
                <Input id="facebook" className="h-9 rounded-sm border-gray-200" value={profile?.facebook || ""} onChange={handleChange} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="twitter" className="text-xs font-bold text-gray-600">Twitter</Label>
                <Input id="twitter" className="h-9 rounded-sm border-gray-200" value={profile?.twitter || ""} onChange={handleChange} />
              </div>
              <div className="col-span-full space-y-1.5">
                <Label htmlFor="affiliation" className="text-xs font-bold text-gray-600">* Affiliation</Label>
                <Input id="affiliation" className="h-9 rounded-sm border-gray-200" value={profile?.affiliation || ""} onChange={handleChange} />
                <p className="text-[10px] text-gray-400">Please provide your university or institution name.</p>
              </div>
           </div>
        </div>

        {/* Address & Contact */}
        <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-100 bg-[#fcfcfc]">
            <h3 className="text-sm font-bold text-gray-700">Contact Details</h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="col-span-full space-y-1.5">
              <Label htmlFor="address1" className="text-xs font-bold text-gray-600">* Address1</Label>
              <Input id="address1" className="h-9 rounded-sm border-gray-200" value={profile?.address1 || ""} onChange={handleChange} />
            </div>
            <div className="col-span-full space-y-1.5">
              <Label htmlFor="address2" className="text-xs font-bold text-gray-600">Address2</Label>
              <Input id="address2" className="h-9 rounded-sm border-gray-200" value={profile?.address2 || ""} onChange={handleChange} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="zip_code" className="text-xs font-bold text-gray-600">* Zip Code</Label>
              <Input id="zip_code" className="h-9 rounded-sm border-gray-200" value={profile?.zip_code || ""} onChange={handleChange} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="city" className="text-xs font-bold text-gray-600">* City</Label>
              <Input id="city" className="h-9 rounded-sm border-gray-200" value={profile?.city || ""} onChange={handleChange} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="country" className="text-xs font-bold text-gray-600">* Country/Region</Label>
              <Input id="country" className="h-9 rounded-sm border-gray-200" value={profile?.country || ""} onChange={handleChange} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="time_zone" className="text-xs font-bold text-gray-600">Time Zone</Label>
              <Input id="time_zone" className="h-9 rounded-sm border-gray-200" value={profile?.time_zone || ""} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
           <div className="px-4 py-2 border-b border-gray-100 bg-[#fcfcfc]">
             <h3 className="text-sm font-bold text-gray-700">Biography</h3>
           </div>
           <div className="p-5">
             <Textarea 
               id="bio" 
               rows={5} 
               className="rounded-sm border-gray-200 resize-none"
               value={profile?.bio || ""}
               onChange={handleChange}
             />
           </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end border-t border-gray-100 pt-6">
           <Button type="submit" className="bg-[var(--mdpi-blue)] hover:bg-[var(--mdpi-blue-dark)] px-12 h-11 text-sm font-bold uppercase tracking-wide">
             Save Changes
           </Button>
        </div>
      </form>
    </div>
  );
}
