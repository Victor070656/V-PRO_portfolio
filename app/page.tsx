"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[var(--background-color)] text-[var(--text-primary)] antialiased relative min-h-screen flex flex-col overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--primary-color)] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--accent-color)] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      <Navbar />

      <main className="flex-grow flex items-center relative z-10">
        <div className="container mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Content Section */}
            <div className="flex flex-col gap-8 text-center lg:text-left order-2 lg:order-1">
              {/* Greeting Badge */}
              <div className="inline-flex items-center gap-2 bg-[var(--primary-color)]/10 backdrop-blur-sm border border-[var(--primary-color)]/20 rounded-full px-4 py-2 text-[var(--primary-color)] font-semibold text-sm w-fit mx-auto lg:mx-0">
                <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full animate-pulse"></div>
                Available for opportunities
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <p className="text-[var(--text-secondary)] font-medium text-lg tracking-wide">
                  Hello, I'm
                </p>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[var(--text-primary)] leading-none">
                  Victor
                  <br />
                  <span className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] bg-clip-text text-transparent">
                    Ikechukwu
                  </span>
                </h1>
                <h2 className="text-2xl md:text-3xl text-[var(--text-secondary)] font-light tracking-wide">
                  Software Developer & Digital Craftsman
                </h2>
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                I specialize in building exceptional digital experiences that
                combine beautiful design with robust functionality. Passionate
                about modern web technologies and creating solutions that make a
                difference.
              </p>

              {/* Stats */}
              <div className="flex gap-8 justify-center lg:justify-start text-center">
                <div>
                  <div className="text-3xl font-bold text-[var(--primary-color)]">
                    3+
                  </div>
                  <div className="text-sm text-[var(--text-secondary)] font-medium">
                    Years Experience
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[var(--primary-color)]">
                    50+
                  </div>
                  <div className="text-sm text-[var(--text-secondary)] font-medium">
                    Projects Completed
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[var(--primary-color)]">
                    100%
                  </div>
                  <div className="text-sm text-[var(--text-secondary)] font-medium">
                    Client Satisfaction
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
                <Link
                  className="group relative bg-[var(--primary-color)] text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--primary-color)]/25 hover:-translate-y-1 active:translate-y-0 overflow-hidden"
                  href="/projects"
                >
                  <span className="relative z-10">View My Work</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-color)] to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  className="group relative bg-[var(--secondary-color)] text-[var(--text-primary)] py-4 px-8 rounded-2xl font-bold text-lg border-2 border-[var(--secondary-color)] hover:border-[var(--primary-color)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 backdrop-blur-sm"
                  href="/contact"
                >
                  <span className="relative z-10">Get In Touch</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--accent-color)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex gap-6 justify-center lg:justify-start mt-6">
                <Link
                  href="https://x.com/victor10722752"
                  className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Link>
                <Link
                  href="https://linkedin.com/in/victorikechukwu"
                  className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
                <Link
                  href="https://github.com/Victor070656"
                  className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative w-full max-w-lg mx-auto order-1 lg:order-2">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[var(--primary-color)] rounded-full opacity-20 animate-bounce delay-300"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--accent-color)] rounded-full opacity-20 animate-bounce delay-700"></div>

              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square bg-gradient-to-tr from-[var(--primary-color)]/20 to-[var(--accent-color)]/20 backdrop-blur-sm border border-white/20">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary-color)]/10 to-[var(--accent-color)]/10"></div>
                <img
                  alt="Victor Ikechukwu - Software Developer"
                  className="w-full h-full object-cover relative z-10 transition-transform duration-500 hover:scale-105"
                  src="/vic.jpg"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-1/4 -right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-3 shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    Available
                  </span>
                </div>
              </div>

              <div className="absolute bottom-1/4 -left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-3 shadow-lg animate-float delay-500">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    Fast Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[var(--text-secondary)] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[var(--text-secondary)] rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
