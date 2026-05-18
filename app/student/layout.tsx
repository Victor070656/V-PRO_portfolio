import type { Metadata } from "next";
import StudentSidebar from "@/components/student/Sidebar";

export const metadata: Metadata = {
  title: "Student Dashboard | V-PRO",
  description: "Student portal for V-PRO Learning Platform.",
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="arch-shell flex">
      <StudentSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
