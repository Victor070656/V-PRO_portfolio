import { MoreVertical } from "lucide-react";

const projects = [
  {
    name: "E-commerce Platform",
    client: "StyleCo",
    budget: "$15,000",
  },
  {
    name: "SaaS Dashboard",
    client: "Innovate Inc.",
    budget: "$25,000",
  },
  {
    name: "Mobile App Design",
    client: "ConnectApp",
    budget: "$8,000",
  },
  {
    name: "Marketing Website",
    client: "GrowthLeap",
    budget: "$12,000",
  },
];

export default function RecentProjects() {
  return (
    <div className="bg-[var(--background-color)] p-6 rounded-xl shadow-sm h-full">
      <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--secondary-color)] flex-shrink-0">
               {/* In a real app, you'd use an Image component with a dynamic src */}
               <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 opacity-50"></div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{project.name}</p>
              <p className="text-xs text-[var(--text-secondary)]">{project.client}</p>
            </div>
            <div className="text-sm font-medium">{project.budget}</div>
            <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}