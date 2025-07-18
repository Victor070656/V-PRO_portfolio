"use client";

import { useState, useEffect, JSX } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function ContactPage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const html = document.documentElement;
      setIsDark(html.classList.contains("dark"));
    }
  }, []);

  return (
    <div
      className="relative flex min-h-screen flex-col bg-white dark:bg-[#101a23] text-[#101a23] dark:text-white overflow-x-hidden"
      style={{ fontFamily: "Inter, Noto Sans, sans-serif" }}
    >
      <div className="flex h-full grow flex-col">
        <Navbar />

        <main className="flex flex-1 justify-center px-4 sm:px-40 py-5">
          <div className="flex flex-col w-full max-w-3xl">
            <section className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <h1 className="text-[32px] font-bold leading-tight">
                  Get in Touch
                </h1>
                <p className="text-gray-600 dark:text-[#90aecb] text-sm">
                  I'm always open to discussing new projects, creative ideas, or
                  opportunities. Feel free to reach out!
                </p>
              </div>
            </section>

            <form
              className="flex flex-col gap-4 px-4 py-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <FormInput
                label="Your Name"
                name="name"
                placeholder="Enter your name"
              />
              <FormInput
                label="Your Email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
              <FormInput
                label="Subject"
                name="subject"
                placeholder="Enter the subject"
              />
              <FormTextarea
                label="Message"
                name="message"
                placeholder="Enter your message"
              />
              <div className="pt-2">
                <button
                  type="submit"
                  className="rounded-full h-10 px-4 bg-slate-600 hover:bg-slate-700 text-white text-sm font-bold transition"
                >
                  Send Message
                </button>
              </div>
            </form>

            <section className="px-4 pt-6 text-center">
              <h3 className="text-lg font-bold pb-2">Connect with Me</h3>
              <div className="flex justify-center flex-wrap gap-2">
                <SocialCard
                  label="Twitter"
                  href="https://x.com/victor10722752"
                  Icon={Twitter}
                />
                <SocialCard
                  label="LinkedIn"
                  href="https://linkedin.com/in/victorikechukwu"
                  Icon={Linkedin}
                />
                <SocialCard
                  label="GitHub"
                  href="https://github.com/Victor070656"
                  Icon={Github}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

// -- Subcomponents

function FormInput({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <label className="flex flex-col">
      <span className="text-base font-medium pb-2">{label}</span>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="rounded-xl h-14 p-[15px] bg-gray-100 dark:bg-[#182734] border border-gray-300 dark:border-[#314d68] placeholder:text-gray-500 dark:placeholder:text-[#90aecb] focus:border-blue-400 focus:outline-none text-[#101a23] dark:text-white transition"
      />
    </label>
  );
}

function FormTextarea({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder: string;
}) {
  return (
    <label className="flex flex-col">
      <span className="text-base font-medium pb-2">{label}</span>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        required
        className="rounded-xl min-h-36 p-[15px] bg-gray-100 dark:bg-[#182734] border border-gray-300 dark:border-[#314d68] placeholder:text-gray-500 dark:placeholder:text-[#90aecb] focus:border-blue-400 focus:outline-none text-[#101a23] dark:text-white resize-none transition"
      />
    </label>
  );
}

function SocialCard({
  label,
  href,
  Icon,
}: {
  label: string;
  href: string;
  Icon: any;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 bg-gray-50 dark:bg-[#101a23] py-2.5 text-center w-20 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1b2a3a] transition"
    >
      <div className="rounded-full bg-gray-200 dark:bg-[#223649] p-2.5">
        <Icon />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

// -- Icons

function SunIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
      <path d="M120,40V16a8,8,0,0,1,16,0V40..." />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
      <path d="M128,24a8,8,0,0,0,0,16A88,88,0..." />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
      <path d="..." />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
      <path d="..." />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
      <path d="..." />
    </svg>
  );
}

function LogoIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
        fill="currentColor"
      />
    </svg>
  );
}
