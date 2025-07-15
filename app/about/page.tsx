import Navbar from "@/components/Navbar";
import {
  CheckCheck,
  Linkedin,
  MailboxIcon,
  TimerIcon,
  MapPin,
  Calendar,
  Award,
  Code,
  User,
  Briefcase,
  GraduationCap,
  Phone,
} from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[var(--background-color)]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--primary-color)] rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--accent-color)] rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] rounded-full mix-blend-multiply filter blur-3xl opacity-3"></div>
      </div>

      <Navbar />
      <div className="container mx-auto flex flex-col grow px-6 relative z-10">
        <main className="flex flex-1 justify-center py-12">
          <div className="w-full max-w-6xl space-y-20">
            {/* Hero Section */}
            <section className="flex flex-col items-center text-center relative">
              <div className="mb-8 relative group">
                {/* Decorative rings */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-[var(--accent-color)] to-[var(--primary-color)] rounded-full blur-md opacity-20 animate-pulse"></div>

                <div
                  className="relative bg-center bg-no-repeat bg-cover rounded-full w-48 h-48 border-4 border-white/20 shadow-2xl backdrop-blur-sm transform hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage: `url("/vic.jpg")`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-full"></div>
                </div>

                {/* Status indicator */}
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg animate-pulse">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="space-y-4 max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] bg-clip-text text-transparent">
                  Victor Ikechukwu
                </h1>
                <p className="text-2xl md:text-3xl font-light text-[var(--text-secondary)]">
                  Software Developer & Digital Craftsman
                </p>
                <div className="flex items-center justify-center gap-2 text-[var(--text-secondary)]">
                  <MapPin className="w-5 h-5" />
                  <span>Port Harcourt, Nigeria</span>
                </div>

                {/* Quick stats */}
                <div className="flex gap-8 justify-center mt-8 text-center">
                  <div className="group">
                    <div className="text-3xl font-bold text-[var(--primary-color)] group-hover:scale-110 transition-transform">
                      3+
                    </div>
                    <div className="text-sm text-[var(--text-secondary)]">
                      Years Experience
                    </div>
                  </div>
                  <div className="group">
                    <div className="text-3xl font-bold text-[var(--primary-color)] group-hover:scale-110 transition-transform">
                      50+
                    </div>
                    <div className="text-sm text-[var(--text-secondary)]">
                      Projects
                    </div>
                  </div>
                  <div className="group">
                    <div className="text-3xl font-bold text-[var(--primary-color)] group-hover:scale-110 transition-transform">
                      100%
                    </div>
                    <div className="text-sm text-[var(--text-secondary)]">
                      Satisfaction
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* About Me Section */}
            <section className="mb-16 group">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-[var(--primary-color)]/10 rounded-xl">
                  <User className="w-6 h-6 text-[var(--primary-color)]" />
                </div>
                <h2 className="text-3xl font-bold text-[var(--text-primary)]">
                  About Me
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[var(--accent-color)] to-transparent"></div>
              </div>

              <div className="bg-[var(--secondary-color)]/30 backdrop-blur-sm rounded-2xl p-8 border border-[var(--accent-color)]/20 hover:border-[var(--primary-color)]/30 transition-all duration-300 group-hover:shadow-lg">
                <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
                  I'm a passionate software developer with a focus on creating
                  innovative and efficient solutions. With over 3 years of
                  experience in full-stack development, I specialize in modern
                  web technologies and mobile applications. I believe in writing
                  clean, maintainable code and creating user experiences that
                  make a difference. When I'm not coding, you'll find me
                  exploring new technologies, contributing to open-source
                  projects, or mentoring aspiring developers.
                </p>
              </div>
            </section>

            {/* Skills Section */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-[var(--primary-color)]/10 rounded-xl">
                  <Code className="w-6 h-6 text-[var(--primary-color)]" />
                </div>
                <h2 className="text-3xl font-bold text-[var(--text-primary)]">
                  Skills & Technologies
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[var(--accent-color)] to-transparent"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  {
                    name: "JavaScript",
                    level: 95,
                    color: "from-yellow-400 to-yellow-600",
                  },
                  {
                    name: "React",
                    level: 90,
                    color: "from-blue-400 to-blue-600",
                  },
                  {
                    name: "React Native",
                    level: 85,
                    color: "from-cyan-400 to-cyan-600",
                  },
                  {
                    name: "Node.js",
                    level: 88,
                    color: "from-green-400 to-green-600",
                  },
                  {
                    name: "Python",
                    level: 82,
                    color: "from-indigo-400 to-indigo-600",
                  },
                  {
                    name: "Django",
                    level: 80,
                    color: "from-emerald-400 to-emerald-600",
                  },
                  {
                    name: "SQL",
                    level: 85,
                    color: "from-orange-400 to-orange-600",
                  },
                  { name: "Git", level: 90, color: "from-red-400 to-red-600" },
                  {
                    name: "HTML",
                    level: 95,
                    color: "from-orange-500 to-red-500",
                  },
                  {
                    name: "CSS",
                    level: 90,
                    color: "from-blue-500 to-purple-500",
                  },
                  {
                    name: "PHP",
                    level: 75,
                    color: "from-purple-400 to-purple-600",
                  },
                  {
                    name: "Laravel",
                    level: 78,
                    color: "from-red-500 to-pink-500",
                  },
                  {
                    name: "REST APIs",
                    level: 88,
                    color: "from-teal-400 to-teal-600",
                  },
                ].map((skill, idx) => (
                  <div
                    key={skill.name}
                    className="group relative bg-[var(--secondary-color)]/30 backdrop-blur-sm rounded-xl p-4 border border-[var(--accent-color)]/20 hover:border-[var(--primary-color)]/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-[var(--text-primary)] text-sm">
                        {skill.name}
                      </span>
                      <span className="text-xs text-[var(--text-secondary)]">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-[var(--accent-color)]/20 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience and Education Grid */}
            <div className="grid lg:grid-cols-2 gap-16">
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
  const experiences = [
    {
      role: "Software Engineer",
      company: "Tech Innovators Inc.",
      period: "2020 - Present",
      description:
        "Led development of scalable web applications using React and Node.js",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      role: "Freelance Web Developer",
      company: "Self-Employed",
      period: "2018 - 2020",
      description:
        "Developed custom websites and web applications for various clients",
      icon: <Code className="w-5 h-5" />,
    },
  ];

  return (
    <section className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[var(--primary-color)]/10 rounded-xl">
          <Briefcase className="w-6 h-6 text-[var(--primary-color)]" />
        </div>
        <h2 className="text-3xl font-bold text-[var(--text-primary)]">
          Experience
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-[var(--primary-color)] to-[var(--accent-color)]" />

        {experiences.map((item, idx) => (
          <div key={idx} className="relative mb-12 pl-16 group">
            <TimelineIcon icon={item.icon} />
            <div className="bg-[var(--secondary-color)]/30 backdrop-blur-sm rounded-xl p-6 border border-[var(--accent-color)]/20 hover:border-[var(--primary-color)]/30 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
              <h3 className="font-bold text-[var(--text-primary)] text-lg">
                {item.role}
              </h3>
              <p className="text-[var(--primary-color)] font-medium">
                {item.company}
              </p>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mt-1">
                <Calendar className="w-4 h-4" />
                {item.period}
              </div>
              <p className="text-[var(--text-secondary)] mt-3 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[var(--primary-color)]/10 rounded-xl">
          <GraduationCap className="w-6 h-6 text-[var(--primary-color)]" />
        </div>
        <h2 className="text-3xl font-bold text-[var(--text-primary)]">
          Education
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-[var(--primary-color)] to-[var(--accent-color)]" />

        <div className="relative pl-16 group">
          <TimelineIcon icon={<Award className="w-5 h-5" />} />
          <div className="bg-[var(--secondary-color)]/30 backdrop-blur-sm rounded-xl p-6 border border-[var(--accent-color)]/20 hover:border-[var(--primary-color)]/30 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
            <h3 className="font-bold text-[var(--text-primary)] text-lg">
              National Diploma in Software Engineering
            </h3>
            <p className="text-[var(--primary-color)] font-medium">
              MOCTECH Imo State
            </p>
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mt-1">
              <Calendar className="w-4 h-4" />
              2022
            </div>
            <p className="text-[var(--text-secondary)] mt-3 leading-relaxed">
              Focused on software development principles, algorithms, and modern
              programming practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const contacts = [
    {
      icon: <MailboxIcon className="w-5 h-5" />,
      label: "Email",
      value: "ikechukwuv052@gmail.com",
      href: "mailto:ikechukwuv052@gmail.com",
      color: "from-red-400 to-red-600",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/victorikechukwu",
      href: "https://linkedin.com/in/victorikechukwu",
      color: "from-blue-400 to-blue-600",
    },
  ];

  return (
    <section className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[var(--primary-color)]/10 rounded-xl">
          <Phone className="w-6 h-6 text-[var(--primary-color)]" />
        </div>
        <h2 className="text-3xl font-bold text-[var(--text-primary)]">
          Let's Connect
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--accent-color)] to-transparent"></div>
      </div>

      <div className="bg-[var(--secondary-color)]/30 backdrop-blur-sm rounded-2xl p-8 border border-[var(--accent-color)]/20">
        <p className="text-[var(--text-secondary)] leading-relaxed text-lg mb-8 text-center">
          I'm always open to new opportunities and collaborations. Let's discuss
          how we can work together to bring your ideas to life.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {contacts.map((contact, idx) => (
            <Link
              key={idx}
              href={contact.href}
              target="_blank"
              className="group relative bg-[var(--secondary-color)]/50 backdrop-blur-sm rounded-xl p-6 border border-[var(--accent-color)]/20 hover:border-[var(--primary-color)]/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${contact.color} text-white group-hover:scale-110 transition-transform`}
                >
                  {contact.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[var(--text-primary)] mb-1">
                    {contact.label}
                  </p>
                  <p className="text-[var(--text-secondary)] text-sm truncate">
                    {contact.value}
                  </p>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-color)]/5 to-[var(--accent-color)]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineIcon({ icon }) {
  return (
    <div className="absolute -left-1 top-6 flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
  );
}
