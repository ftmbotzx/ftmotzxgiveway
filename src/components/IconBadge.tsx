import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface IconBadgeProps {
  icon: LucideIcon;
  color: "purple" | "orange" | "pink" | "green" | "blue" | "red" | "yellow" | "cyan";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const colorClasses = {
  purple: "badge-purple",
  orange: "badge-orange",
  pink: "badge-pink",
  green: "badge-green",
  blue: "badge-blue",
  red: "badge-red",
  yellow: "badge-yellow",
  cyan: "badge-cyan",
};

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
};

export const IconBadge = ({ icon: Icon, color, size = "md", className }: IconBadgeProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl",
        colorClasses[color],
        sizeClasses[size],
        className
      )}
    >
      <Icon size={iconSizes[size]} className="text-foreground" />
    </div>
  );
};
