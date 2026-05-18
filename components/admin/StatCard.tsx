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
    <div className="arch-panel p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 bg-muted rounded">
           <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground mb-2">{value}</p>
      <p className={`text-sm ${changeColor}`}>{change}</p>
    </div>
  );
}