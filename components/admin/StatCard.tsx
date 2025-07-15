import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeColor: string;
};

export default function StatCard({ title, value, icon: Icon, change, changeColor }: StatCardProps) {
  return (
    <div className="bg-[var(--background-color)] p-6 rounded-xl border border-transparent hover:border-[var(--primary-color)] transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[var(--primary-color)]/10">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">{title}</h3>
        <div className="p-2 bg-[var(--primary-color)]/10 rounded-md">
           <Icon className="w-5 h-5 text-[var(--primary-color)]" />
        </div>
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className={`text-xs ${changeColor}`}>{change}</p>
    </div>
  );
}