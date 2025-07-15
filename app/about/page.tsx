import Navbar from "@/components/Navbar";
import { CheckCheck, Linkedin, MailboxIcon, TimerIcon } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <div className="container mx-auto flex flex-col grow px-4">
        <main className="flex flex-1 justify-center py-12">
          <div className="w-full max-w-4xl space-y-16">
            <section className="flex flex-col items-center text-center">
              <div className="mb-6">
                <div
                  className="bg-center bg-no-repeat bg-cover rounded-full w-40 h-40 border-4 border-[var(--accent-color)] shadow-lg"
                  style={{
                    backgroundImage: `url("/vic.jpg")`,
                  }}
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">Victor Ikechukwu</h1>
                <p className="text-lg text-[var(--text-secondary)]">
                  Software Developer
                </p>
                <p className="text-[var(--text-secondary)]">
                  Based in Port Harcourt, Nigeria
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold border-b border-[var(--accent-color)] pb-2">
                About Me
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed pt-4">
                I'm a passionate software developer with a focus on creating
                innovative and efficient solutions...
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold border-b border-[var(--accent-color)] pb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-3 pt-4">
                {[
                  "JavaScript",
                  "React",
                  "React Native",
                  "Node.js",
                  "Python",
                  "Django",
                  "SQL",
                  "Git",
                  "HTML",
                  "CSS",
                  "PHP",
                  "Laravel",
                  "REST APIs",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="flex h-10 items-center justify-center rounded-full bg-[var(--secondary-color)] px-5 text-sm font-medium"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>

            <div className="grid md:grid-cols-2 gap-16">
              <Experience />
              <Education />
            </div>

            <ContactSection />
          </div>
        </main>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold border-b border-[var(--accent-color)] pb-2">
        Experience
      </h2>
      <div className="relative pt-4">
        <div className="absolute left-4 top-4 h-full w-0.5 bg-[var(--accent-color)]" />
        {[
          {
            role: "Software Engineer at Tech Innovators Inc.",
            period: "2020 - Present",
          },
          { role: "Freelance Web Developer", period: "2018 - 2020" },
        ].map((item, idx) => (
          <div key={idx} className="relative mb-8 pl-12">
            <TimelineIcon />
            <p className="font-medium">{item.role}</p>
            <p className="text-sm text-[var(--text-secondary)]">
              {item.period}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold border-b border-[var(--accent-color)] pb-2">
        Education
      </h2>
      <div className="relative pt-4">
        <div className="absolute left-4 top-4 h-full w-0.5 bg-[var(--accent-color)]" />
        <div className="relative pl-12">
          <TimelineIcon />
          <p className="font-medium">
            National Diploma in Software Engineering
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            MOCTECH Imo State, 2022
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold border-b border-[var(--accent-color)] pb-2">
        Contact
      </h2>
      <p className="text-[var(--text-secondary)] leading-relaxed pt-4">
        I'm always open to new opportunities and collaborations. Feel free to
        reach out through:
      </p>
      <div className="mt-6 space-y-4">
        <Link
          href="mailto:ikechukwuv052@gmail.com"
          target="_blank"
          className="flex items-center gap-4 rounded-lg bg-[var(--secondary-color)] p-4"
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-[var(--background-color)] text-[var(--primary-color)]">
            <MailboxIcon />
          </div>
          <p className="flex-1 truncate">ikechukwuv052@gmail.com</p>
        </Link>
        <Link
          href="https://linkedin.com/in/victorikechukwu"
          target="_blank"
          className="flex items-center gap-4 rounded-lg bg-[var(--secondary-color)] p-4"
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-[var(--background-color)] text-[var(--primary-color)]">
            <Linkedin />
          </div>
          <p className="flex-1 truncate">linkedin.com/in/victorikechukwu</p>
        </Link>
      </div>
    </section>
  );
}

function TimelineIcon() {
  return (
    <div className="absolute -left-1 top-0 flex size-8 items-center justify-center rounded-full bg-[var(--accent-color)] text-[var(--primary-color)]">
      {/* Replace with actual icon paths as needed */}
      <CheckCheck className="text-xl" />
    </div>
  );
}
