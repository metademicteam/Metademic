"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import { Search, ChevronDown } from "lucide-react";
import { 
  WORKPLACE_OPTIONS, 
  JOB_TYPE_OPTIONS, 
  TITLE_OPTIONS, 
  COUNTRIES, 
  TIMEZONES 
} from "@/utils/constants";

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

const SearchableSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  id, 
  required,
  className = ""
}: { 
  options: string[], 
  value: string, 
  onChange: (val: string) => void, 
  placeholder: string,
  id: string,
  required?: boolean,
  className?: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className || "w-full"}`} ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full h-8 px-2 border border-gray-300 bg-white text-[13px] rounded-sm cursor-pointer hover:border-blue-400 transition-colors"
      >
        <span className={value ? "text-black font-medium" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-black transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 shadow-xl rounded-sm py-1 animate-in fade-in zoom-in-95 duration-100 min-w-[200px]">
          <div className="p-2 border-b border-gray-100 flex items-center gap-2 sticky top-0 bg-white">
            <Search className="w-3.5 h-3.5 text-black" />
            <input 
              type="text"
              autoFocus
              className="w-full text-[12px] outline-none placeholder:text-gray-400 text-black font-medium"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-[250px] overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div 
                  key={opt}
                  className={`px-3 py-1.5 text-[12px] hover:bg-gray-50 cursor-pointer transition-colors ${
                    value === opt ? "bg-blue-50 text-[#004a99] font-bold" : "text-black font-medium"
                  }`}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                    setSearch("");
                  }}
                >
                  {opt}
                </div>
              ))
            ) : (
              <div className="px-3 py-4 text-[12px] text-black text-center">No results found</div>
            )}
          </div>
        </div>
      )}
      <input type="hidden" name={id} value={value} required={required} />
    </div>
  );
};

const FormRow = ({ label, id, children, required = false }: { label: string, id: string, children: React.ReactNode, required?: boolean }) => (
  <div className="flex flex-col md:flex-row border-b border-gray-100 last:border-0 py-3 px-4 hover:bg-gray-50/50 transition-colors">
    <div className="w-full md:w-[200px] shrink-0 flex items-center mb-1 md:mb-0">
      <label htmlFor={id} className="text-[13px] font-bold text-black flex items-center text-left">
        {required && <span className="text-red-600 mr-1">*</span>}
        {label}
      </label>
    </div>
    <div className="flex-1 w-full max-w-[600px]">
      {children}
    </div>
  </div>
);

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
      .upsert({
        id: user.id,
        ...profile,
        updated_at: new Date().toISOString(),
      });

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
    const redirectUri = encodeURIComponent(`${window.location.origin}/api/auth/orcid/callback`);
    const scopes = encodeURIComponent('/authenticate');
    const orcidUrl = `https://orcid.org/oauth/authorize?client_id=${clientId}&response_type=code&scope=${scopes}&redirect_uri=${redirectUri}`;
    window.location.href = orcidUrl;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProfile({ ...profile!, [e.target.id]: e.target.value });
  };

  const setManualValue = (id: string, value: string) => {
    setProfile({ ...profile!, [id]: value });
  };

  if (isLoading) return <div className="p-8 text-center text-black font-bold font-sans">Loading profile...</div>;

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500 font-sans max-w-full overflow-x-hidden">
      {/* Page Title */}
      <h1 className="text-xl font-bold text-black border-b border-gray-200 pb-2">Edit Profile Data</h1>

      <form onSubmit={handleSave} className="bg-white border border-gray-200 shadow-sm overflow-hidden rounded-sm mx-auto w-full">
        <div className="bg-[#fcfcfc] px-4 py-2 border-b border-gray-200">
          <h2 className="text-[#004a99] font-bold text-sm">Edit Profile</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {/* ORCID Row */}
          <FormRow label="ORCID" id="orcid">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <div className="w-5 h-5 rounded-full bg-[#A6CE39] flex items-center justify-center text-white text-[9px] font-bold shrink-0">iD</div>
              {profile?.orcid ? (
                <div className="text-[13px] flex items-center gap-2 whitespace-nowrap">
                  <span className="text-[#004a99] font-medium">{profile.orcid}</span>
                  <button type="button" className="text-red-500 hover:underline text-[11px] font-bold">[Unbind]</button>
                  <span className="text-blue-500 text-[11px] cursor-help font-bold">[What is this?]</span>
                </div>
              ) : (
                <button type="button" onClick={handleOrcidConnect} className="text-[#004a99] hover:underline text-[13px] whitespace-nowrap font-bold">Connect ORCID</button>
              )}
            </div>
          </FormRow>

          {/* Workplace - Searchable */}
          <FormRow label="Workplace" id="workplace" required>
            <SearchableSelect 
              id="workplace"
              options={WORKPLACE_OPTIONS}
              value={profile?.workplace || ""}
              onChange={(val) => setManualValue("workplace", val)}
              placeholder="Please choose ..."
              required
            />
          </FormRow>

          {/* Job Type - Searchable */}
          <FormRow label="Job Type" id="job_type" required>
            <SearchableSelect 
              id="job_type"
              options={JOB_TYPE_OPTIONS}
              value={profile?.job_type || ""}
              onChange={(val) => setManualValue("job_type", val)}
              placeholder="Please choose ..."
              required
            />
          </FormRow>

          {/* Title - Searchable & Improved Box */}
          <FormRow label="Title" id="title" required>
            <SearchableSelect 
              id="title"
              options={TITLE_OPTIONS}
              value={profile?.title || ""}
              onChange={(val) => setManualValue("title", val)}
              placeholder="Please choose ..."
              required
              className="w-full md:w-[150px]"
            />
          </FormRow>

          {/* Names */}
          <FormRow label="First name" id="first_name" required>
            <Input id="first_name" value={profile?.first_name || ""} onChange={handleChange} className="h-8 border-gray-300 rounded-sm text-[13px] bg-white text-black font-medium" required />
          </FormRow>
          <FormRow label="Middle name" id="middle_name">
            <Input id="middle_name" value={profile?.middle_name || ""} onChange={handleChange} className="h-8 border-gray-300 rounded-sm text-[13px] bg-white text-black font-medium" />
          </FormRow>
          <FormRow label="Last name" id="last_name" required>
            <Input id="last_name" value={profile?.last_name || ""} onChange={handleChange} className="h-8 border-gray-300 rounded-sm text-[13px] bg-white text-black font-medium" required />
          </FormRow>

          {/* Social */}
          <FormRow label="Facebook" id="facebook">
            <Input id="facebook" value={profile?.facebook || ""} onChange={handleChange} className="h-8 border-gray-300 rounded-sm text-[13px] bg-white text-black font-medium" />
          </FormRow>
          <FormRow label="Twitter" id="twitter">
            <Input id="twitter" value={profile?.twitter || ""} onChange={handleChange} className="h-8 border-gray-300 rounded-sm text-[13px] bg-white text-black font-medium" />
          </FormRow>

          {/* Affiliation */}
          <FormRow label="Affiliation" id="affiliation" required>
            <Input id="affiliation" value={profile?.affiliation || ""} onChange={handleChange} className="h-8 border-gray-300 rounded-sm text-[13px] bg-white text-black font-medium" required />
          </FormRow>

          {/* Address */}
          <FormRow label="Address1" id="address1" required>
            <Input id="address1" value={profile?.address1 || ""} onChange={handleChange} className="h-8 border-gray-300 rounded-sm text-[13px] bg-white text-black font-medium" required />
          </FormRow>
          <FormRow label="Address2" id="address2">
            <Input id="address2" value={profile?.address2 || ""} onChange={handleChange} className="h-8 border-gray-300 rounded-sm text-[13px] bg-white text-black font-medium" />
          </FormRow>
          <FormRow label="Zip Code" id="zip_code" required>
            <Input id="zip_code" value={profile?.zip_code || ""} onChange={handleChange} className="h-8 border-gray-300 rounded-sm text-[13px] w-full md:w-[200px] bg-white text-black font-medium" required />
          </FormRow>
          <FormRow label="City" id="city" required>
            <Input id="city" value={profile?.city || ""} onChange={handleChange} className="h-8 border-gray-300 rounded-sm text-[13px] bg-white text-black font-medium" required />
          </FormRow>

          {/* Country - Searchable */}
          <FormRow label="Country/Region" id="country" required>
            <SearchableSelect 
              id="country"
              options={COUNTRIES}
              value={profile?.country || ""}
              onChange={(val) => setManualValue("country", val)}
              placeholder="Search or choose country..."
              required
            />
          </FormRow>

          {/* Time Zone - Searchable */}
          <FormRow label="Time Zone" id="time_zone">
            <SearchableSelect 
              id="time_zone"
              options={TIMEZONES}
              value={profile?.time_zone || ""}
              onChange={(val) => setManualValue("time_zone", val)}
              placeholder="Search or choose time zone..."
            />
          </FormRow>

          {/* Biography */}
          <FormRow label="Biography" id="bio">
            <Textarea 
              id="bio" 
              rows={6} 
              value={profile?.bio || ""} 
              onChange={handleChange}
              className="w-full border-gray-300 rounded-sm text-[13px] resize-none focus:ring-1 focus:ring-blue-500 p-2 bg-white text-black font-medium"
            />
          </FormRow>
        </div>

        {/* Action Button */}
        <div className="bg-[#fcfcfc] px-4 py-3 border-t border-gray-200 flex justify-center md:justify-start">
          <Button type="submit" className="bg-[#004a99] hover:bg-[#003d7e] h-8 px-8 text-[13px] font-bold rounded-sm shadow-none w-full md:w-auto">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
