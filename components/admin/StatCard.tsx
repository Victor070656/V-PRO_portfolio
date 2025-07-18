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
    <div className="admin-card p-6 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">{title}</h3>
        <div className="p-2 bg-[var(--accent-color)]/10 rounded-lg">
           <Icon className="w-5 h-5 text-[var(--accent-color)]" />
        </div>
      </div>
      <p className="text-2xl font-bold text-[var(--text-primary)] mb-2">{value}</p>
      <p className={`text-sm ${changeColor}`}>{change}</p>
    </div>
  );
}