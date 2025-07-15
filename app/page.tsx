"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[var(--background-color)] text-[var(--text-primary)] antialiased relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-6 text-center md:text-left">
              <p className="text-[var(--primary-color)] font-bold text-lg">
                Hello, I'm
              </p>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-[var(--text-primary)]">
                Victor Ikechukwu
              </h1>
              <h2 className="text-2xl text-[var(--text-secondary)] font-medium">
                Software Developer
              </h2>
              <p className="text-lg text-[var(--text-secondary)] max-w-lg mx-auto md:mx-0">
                I build beautiful, functional, and accessible web experiences.
                I'm passionate about clean code, modern technologies, and
                creating user-centric solutions.
              </p>
              <div className="mt-4 flex gap-4 justify-center md:justify-start">
                <Link
                  className="bg-[var(--primary-color)] text-white py-3 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 font-bold"
                  href="/projects"
                >
                  View My Work
                </Link>
                <Link
                  className="inline-block bg-[var(--secondary-color)] text-[var(--text-primary)] py-3 px-6 rounded-lg hover:bg-[var(--accent-color)] dark:hover:bg-slate-700 transition-colors duration-300 font-bold"
                  href="/contact"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary-color)] to-[var(--accent-color)] rounded-full blur-2xl opacity-50" />
              <div className="relative rounded-full overflow-hidden shadow-2xl aspect-square">
                <img
                  alt="A profile image of Victor Ikechukwu"
                  className="w-full h-full object-cover"
                  src="/vic.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
