"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Code2,
  Mail,
  Sparkles,
  Database,
  Layers,
  Terminal,
  Cpu,
  Award,
  Play,
  RotateCcw,
  CheckCircle,
  GraduationCap
} from "lucide-react";
import { Course } from "@/lib/models/course";

// Hardcoded featured courses as a premium fallback if db fetching is loading/empty
const FEATURED_COURSES = [
  {
    _id: "nextjs-prod",
    title: "Complete Next.js Production Architecture",
    description: "Learn server component optimizations, custom state syncer, middleware gates, and full telemetry logging.",
    category: "Web Engineering",
    duration: "42 hours",
    rating: 4.9,
    price: 89.99,
    students: 1420
  },
  {
    _id: "mongo-mastery",
    title: "MongoDB Schema Design & Query Tuning",
    description: "Master aggregation pipelines, index construction, compound index selection, and database safety protocols.",
    category: "Database Systems",
    duration: "38 hours",
    rating: 4.8,
    price: 79.99,
    students: 928
  },
  {
    _id: "creative-3d-web",
    title: "WebGL & 3D CSS Interaction in Next.js",
    description: "Build immersive interfaces using vector math, shaders, custom matrix transformations, and performance tuning.",
    category: "3D & Creative",
    duration: "25 hours",
    rating: 5.0,
    price: 99.99,
    students: 540
  }
];

const snippets = {
  next: `// App Router Dynamic Layout Gated by Role
export default async function AppLayout({ children }) {
  const session = await getSession();
  if (!session) redirect('/auth/signin');
  
  return (
    <div className="grid grid-cols-[280px_1fr] min-h-screen">
      <StudentSidebar user={session.user} />
      <main className="p-8 overflow-y-auto">{children}</main>
    </div>
  );
}`,
  db: `// High-Performance Aggregation Pipeline
const studentStats = await db.collection("enrollments").aggregate([
  { $match: { userId: new ObjectId(id) } },
  { $group: {
      _id: "$userId",
      averageProgress: { $avg: "$progress" },
      totalCourses: { $sum: 1 },
      completedCount: { $sum: { $cond: [{ $eq: ["$progress", 100] }, 1, 0] } }
  }}
]).toArray();`,
  payment: `// Flutterwave Hook Payload Init
const payload = {
  tx_ref: \`tx-vpro-\${uuidv4()}\`,
  amount: course.price,
  currency: "NGN",
  redirect_url: "\${origin}/api/payments/verify",
  customer: {
    email: session.user.email,
    name: session.user.name,
  },
  customizations: {
    title: \`Access: \${course.title}\`,
    description: "Enrollment code auto-dispatched post verification."
  }
};`
};

export default function Home() {
  // Course State
  const [dbCourses, setDbCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  // 3D Simulator State
  const [rotationX, setRotationX] = useState(25);
  const [rotationY, setRotationY] = useState(45);
  const [zoom, setZoom] = useState(1);
  const [metallic, setMetallic] = useState(70);
  const [roughness, setRoughness] = useState(30);
  const [wireframe, setWireframe] = useState(false);

  // Code compiler state
  const [codeTab, setCodeTab] = useState<"next" | "db" | "payment">("next");
  const [isCompiling, setIsCompiling] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    "Sandbox Compiler ready. Select tab code and run execution."
  ]);

  // Fetch real courses if available
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses");
        if (res.ok) {
          const data = await res.json();
          if (data.courses && data.courses.length > 0) {
            setDbCourses(data.courses);
          }
        }
      } catch (err) {
        console.error("Courses fetch error on landing page: ", err);
      } finally {
        setLoadingCourses(false);
      }
    }
    fetchCourses();
  }, []);

  const executeCode = () => {
    setIsCompiling(true);
    setConsoleOutput((prev) => [...prev, `[COMPILE] Initiating verify-dry-run for module: ${codeTab.toUpperCase()}...`]);
    setTimeout(() => {
      setConsoleOutput((prev) => [
        ...prev,
        `[PARSER] Resolving runtime abstractions...`,
        `[COMPILE] Linking database triggers and adapters...`,
        `[SUCCESS] 0 errors, modules compiled successfully. Status: 200 OK`
      ]);
      setIsCompiling(false);
    }, 1100);
  };

  const reset3D = () => {
    setRotationX(25);
    setRotationY(45);
    setZoom(1);
    setMetallic(70);
    setRoughness(30);
    setWireframe(false);
  };

  const displayedCourses = dbCourses.length > 0 ? dbCourses : FEATURED_COURSES;

  return (
    <div className="arch-shell">
      <Navbar />

      {/* Hero Section */}
      <header className="relative border-b border-white/10 bg-[#0C0C0C] py-20 lg:py-28 overflow-hidden">
        {/* Background Glowing Lines & Grids */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="arch-container relative z-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p className="label-md text-primary font-semibold">Creator Portfolio & LMS Platform</p>
            </div>
            
            <h1 className="display-lg text-foreground tracking-tight select-none">
              3D Creator <br />
              <span className="text-primary">&amp; LMS Architect</span>
            </h1>

            <p className="mt-8 text-base text-muted-foreground max-w-2xl leading-relaxed font-light">
              High-performance web architecture meets interactive educational software. I engineer state-of-the-art Next.js systems, high-efficiency MongoDB schemas, and complete learning management systems. Tweak parameters or explore course curriculums below.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/courses" className="arch-button">
                Explore Courses
                <BookOpen className="w-4 h-4" />
              </Link>
              <Link href="/projects" className="arch-button-secondary">
                Selected Projects
                <Briefcase className="w-4 h-4" />
              </Link>
              <a href="#workspace" className="arch-button-secondary text-sm border-white/10 hover:border-white/30">
                Launch Creator Studio
                <ArrowRight className="w-3 h-3 text-primary" />
              </a>
            </div>
          </div>

          {/* Core metrics visual panel wrapped in gradient shell */}
          <div className="gradient-shell-wrap-red">
            <div className="gradient-shell-inner p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="text-sm font-semibold tracking-wider font-mono uppercase text-primary flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  Live Platform Stats
                </span>
                <span className="text-xs text-green-400 font-mono bg-green-950/50 px-2 py-0.5 rounded border border-green-800">
                  Online
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Total Learners</p>
                  <p className="text-3xl font-bold font-display mt-1 text-foreground">5,420+</p>
                  <div className="w-full bg-white/10 h-1 mt-2 rounded overflow-hidden">
                    <div className="bg-primary h-full w-[85%]" />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Completion Rate</p>
                  <p className="text-3xl font-bold font-display mt-1 text-foreground">94.2%</p>
                  <div className="w-full bg-white/10 h-1 mt-2 rounded overflow-hidden">
                    <div className="bg-primary h-full w-[94%]" />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Total Hours Taught</p>
                  <p className="text-3xl font-bold font-display mt-1 text-foreground">105h+</p>
                  <div className="w-full bg-white/10 h-1 mt-2 rounded overflow-hidden">
                    <div className="bg-primary h-full w-[75%]" />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Certificates Verified</p>
                  <p className="text-3xl font-bold font-display mt-1 text-foreground">1,280+</p>
                  <div className="w-full bg-white/10 h-1 mt-2 rounded overflow-hidden">
                    <div className="bg-primary h-full w-[60%]" />
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Authorized learning gateway:</span>
                <Link href="/student/dashboard" className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
                  Student Portal
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Interactive Workspace Container */}
      <main className="arch-container py-20 space-y-28" id="workspace">
        
        {/* Workspace Title */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <p className="arch-kicker text-primary">Interactive Suite</p>
          <h2 className="arch-heading-lg text-foreground">Experience What I Can Do</h2>
          <p className="text-muted-foreground text-sm font-light">
            Adjust the sliders below to transform 3D shapes in real-time, or select backend architectures to run in our code verification sandbox.
          </p>
        </section>

        {/* Studio & Sandbox Dashboard Mockup */}
        <section className="grid gap-8 lg:grid-cols-12">
          
          {/* Left Block: 3D Creator Studio Mockup (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-lg overflow-hidden p-6 md:p-8 space-y-8">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    3D Interface Controller
                  </h3>
                  <p className="text-xs text-muted-foreground">Real-time WebGL transform simulator</p>
                </div>
                <button 
                  onClick={reset3D}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs font-mono text-muted-foreground hover:bg-white/5 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {/* Sliders Control Block */}
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Rotate X</span>
                      <span className="text-primary">{rotationX}°</span>
                    </div>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={rotationX}
                      onChange={(e) => setRotationX(Number(e.target.value))}
                      className="w-full accent-primary h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Rotate Y</span>
                      <span className="text-primary">{rotationY}°</span>
                    </div>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={rotationY}
                      onChange={(e) => setRotationY(Number(e.target.value))}
                      className="w-full accent-primary h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Scale</span>
                      <span className="text-primary">{zoom.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="1.5"
                      step="0.05"
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-full accent-primary h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground">Metallic Finish</span>
                      <span className="text-primary">{metallic}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={metallic}
                      onChange={(e) => setMetallic(Number(e.target.value))}
                      className="w-full accent-primary h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-6">
                    <span className="text-xs text-muted-foreground font-mono">Wireframe Mode</span>
                    <button
                      onClick={() => setWireframe(!wireframe)}
                      className={`text-xs px-3 py-1 rounded-full border transition-all ${
                        wireframe 
                          ? "bg-primary border-primary text-primary-foreground font-bold" 
                          : "border-white/10 text-muted-foreground hover:bg-white/5"
                      }`}
                    >
                      {wireframe ? "Enabled" : "Disabled"}
                    </button>
                  </div>
                </div>

                {/* Real-time CSS 3D Viewport Rendering Canvas */}
                <div className="relative h-64 md:h-auto border border-white/10 bg-black/60 rounded-md flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,transparent_100%)]"></div>
                  
                  {/* CSS 3D Cube Container */}
                  <div 
                    className="cube-viewport"
                    style={{
                      perspective: "800px",
                      width: "140px",
                      height: "140px",
                    }}
                  >
                    <div 
                      className="cube-element"
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        transformStyle: "preserve-3d",
                        transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${zoom})`,
                        transition: "transform 0.05s ease-out",
                      }}
                    >
                      {/* CSS 3D Faces */}
                      {[
                        { transform: "translateZ(70px)", text: "3D" },
                        { transform: "rotateY(180deg) translateZ(70px)", text: "LMS" },
                        { transform: "rotateY(-90deg) translateZ(70px)", text: "NEXT" },
                        { transform: "rotateY(90deg) translateZ(70px)", text: "DB" },
                        { transform: "rotateX(90deg) translateZ(70px)", text: "API" },
                        { transform: "rotateX(-90deg) translateZ(70px)", text: "NODE" }
                      ].map((face, index) => (
                        <div 
                          key={index} 
                          className="absolute inset-0 border flex items-center justify-center font-mono text-xs font-bold transition-all"
                          style={{
                            transform: face.transform,
                            background: wireframe ? "transparent" : `rgba(255, 11, 11, ${metallic / 450})`,
                            borderColor: wireframe ? "#FF0B0B" : "rgba(255, 255, 255, 0.4)",
                            borderWidth: wireframe ? "2px" : "1px",
                            boxShadow: wireframe ? "0 0 10px rgba(255, 11, 11, 0.5)" : "none",
                            color: wireframe ? "#FF0B0B" : "#D7E2EA",
                          }}
                        >
                          {face.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground border-t border-white/10 pt-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span>3D hardware acceleration enabled via Matrix Transform CSS.</span>
            </div>
          </div>

          {/* Right Block: Engineering Code Sandbox Mockup (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-lg overflow-hidden p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-primary" />
                  Engineering Sandbox
                </h3>
                <p className="text-xs text-muted-foreground">Test logic and compile payloads</p>
              </div>
            </div>

            {/* Sandbox Tabs */}
            <div className="flex border-b border-white/10">
              <button 
                onClick={() => setCodeTab("next")}
                className={`flex-1 pb-3 text-xs font-mono transition-all border-b ${
                  codeTab === "next" 
                    ? "border-primary text-foreground font-bold" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                App Router
              </button>
              <button 
                onClick={() => setCodeTab("db")}
                className={`flex-1 pb-3 text-xs font-mono transition-all border-b ${
                  codeTab === "db" 
                    ? "border-primary text-foreground font-bold" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Aggregation
              </button>
              <button 
                onClick={() => setCodeTab("payment")}
                className={`flex-1 pb-3 text-xs font-mono transition-all border-b ${
                  codeTab === "payment" 
                    ? "border-primary text-foreground font-bold" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Flutterwave
              </button>
            </div>

            {/* Code snippets view */}
            <div className="relative bg-black/80 rounded border border-white/5 p-4 overflow-x-auto max-h-60 h-60">
              <pre className="text-xs font-mono text-zinc-300 leading-relaxed">
                <code>{snippets[codeTab]}</code>
              </pre>
            </div>

            {/* Verification Console */}
            <div className="bg-zinc-950 border border-white/10 rounded p-4 h-32 overflow-y-auto flex flex-col font-mono text-[11px]">
              <span className="text-zinc-500 mb-2 uppercase text-[9px] tracking-wider border-b border-white/5 pb-1">Console logs</span>
              {consoleOutput.map((log, index) => (
                <div key={index} className={`mb-1 ${log.includes("SUCCESS") ? "text-green-400" : log.includes("INIT") ? "text-primary" : "text-zinc-400"}`}>
                  {log}
                </div>
              ))}
            </div>

            <button
              onClick={executeCode}
              disabled={isCompiling}
              className="arch-button w-full text-xs py-2.5 font-mono uppercase tracking-wider"
            >
              {isCompiling ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Running Compiler...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Play className="w-3.5 h-3.5 text-primary-foreground fill-primary-foreground" />
                  Execute Sandbox Engine
                </span>
              )}
            </button>
          </div>
        </section>

        {/* LMS Course Grid Showcase */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="arch-kicker text-primary">Mastery Hub</p>
              <h2 className="arch-heading-lg text-foreground">Featured LMS Courses</h2>
              <p className="text-muted-foreground max-w-2xl mt-2 text-sm font-light">
                High-caliber engineering tracks constructed to provide structural, production-oriented education. Enroll or inspect individual courses.
              </p>
            </div>
            <div>
              <Link href="/courses" className="arch-button">
                View All Courses
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayedCourses.slice(0, 3).map((course) => (
              <div key={course._id?.toString()} className="gradient-shell-wrap">
                <div className="gradient-shell-inner flex flex-col justify-between p-6 h-full space-y-6">
                  <div>
                    <div className="flex items-center justify-between text-xs text-primary font-mono mb-3">
                      <span className="bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                        {course.category}
                      </span>
                      <span>{course.duration}</span>
                    </div>

                    <h3 className="font-semibold text-lg text-foreground leading-snug line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-3 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between text-xs font-mono mb-4 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-primary" />
                        {course.students || 0} enrolled
                      </span>
                      <span>Rating: {course.rating} ★</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground text-sm font-mono">
                        {course.price === 0 ? "Free" : `$${course.price}`}
                      </span>
                      <Link 
                        href={`/courses/${course._id?.toString()}`} 
                        className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                      >
                        Inspect curriculum
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LMS Student Portal Experience Mockup */}
        <section className="gradient-shell-wrap">
          <div className="gradient-shell-inner p-8 md:p-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] items-center">
            <div className="space-y-5">
              <span className="arch-kicker text-primary">Student Center</span>
              <h2 className="arch-heading-md text-foreground">Interactive Student Portal</h2>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Registered students gain access to a dedicated dashboard, self-paced progress logging, direct access to instructor resources, verified certificate generation, and webhook-verified checkout options.
              </p>
              <div className="flex flex-wrap gap-3 pt-3">
                <Link href="/auth/signin" className="arch-button">
                  Sign In to Dashboard
                </Link>
                <Link href="/contact" className="arch-button-secondary">
                  Request Access
                </Link>
              </div>
            </div>

            {/* Dashboard Screenshot / Visual Mockup */}
            <div className="border border-white/15 bg-black/60 rounded-lg p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-[10px] text-muted-foreground font-mono">student_portal_vpro.sys</span>
              </div>

              {/* Progress Card Simulator */}
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/5 rounded p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-wider font-mono text-primary">Active Session</span>
                    <h4 className="text-xs font-bold">Complete Next.js Development Course</h4>
                    <p className="text-[10px] text-muted-foreground">Lesson 4: Middleware Configuration & Hooks</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono font-bold block text-foreground">84%</span>
                    <span className="text-[9px] text-muted-foreground uppercase">Done</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Course Completion Ratio</span>
                    <span className="text-primary font-mono font-bold">2 / 3 Courses</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[66.6%]" />
                  </div>
                </div>

                {/* Certificate Showcase */}
                <div className="border border-white/10 bg-white/5 p-4 rounded flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-primary" />
                    <div>
                      <h4 className="text-xs font-bold text-foreground">MongoDB Masterclass Certificate</h4>
                      <p className="text-[10px] text-muted-foreground">Issued on verification of final assignment</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-bold text-primary font-mono uppercase hover:underline">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Development Workflow Grid */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <p className="arch-kicker text-primary">Process</p>
            <h2 className="arch-heading-lg">Dependable Engineering Rhythm</h2>
            <p className="text-sm text-muted-foreground font-light">
              How ideas move from conceptual strategy into high-density web systems.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Discovery & Scope",
                desc: "Map the system objectives, user flows, data endpoints, and deployment goals before initial commit."
              },
              {
                step: "02",
                title: "Architecture Wire",
                desc: "Design the database collection index patterns, backend routes, state flowcharts, and styling systems."
              },
              {
                step: "03",
                title: "Implementation",
                desc: "Write typescript components, perform system test integrations, link payment hooks, and refine the interface."
              },
              {
                step: "04",
                title: "Validation & Launch",
                desc: "Conduct performance tuning, monitor compilation outputs, execute live validation, and release with confidence."
              }
            ].map((item, index) => (
              <div key={index} className="border border-white/10 bg-white/[0.02] p-6 rounded space-y-4 hover:border-primary/50 transition-colors">
                <span className="text-xs font-mono text-primary font-bold block">{item.step}</span>
                <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer block */}
      <footer className="border-t border-white/10 bg-[#0C0C0C] py-12">
        <div className="arch-container flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="font-mono">Victor Ikechukwu · V-PRO Portfolio & LMS</span>
          </div>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-foreground">About</Link>
            <Link href="/projects" className="hover:text-foreground">Work</Link>
            <Link href="/courses" className="hover:text-foreground">LMS Courses</Link>
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
          </div>
          <div>
            <span>© {new Date().getFullYear()} V-PRO. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
