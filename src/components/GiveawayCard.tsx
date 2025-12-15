import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GiveawayCardProps {
  children: ReactNode;
  className?: string;
  highlight?: "green" | "red" | "blue" | "purple" | "orange";
}

const highlightClasses = {
  green: "border-l-4 border-l-badge-green",
  red: "border-l-4 border-l-badge-red",
  blue: "border-l-4 border-l-badge-blue",
  purple: "border-l-4 border-l-badge-purple",
  orange: "border-l-4 border-l-badge-orange",
};

export const GiveawayCard = ({ children, className, highlight }: GiveawayCardProps) => {
  return (
    <div
      className={cn(
        "bg-card rounded-xl p-4 card-glow",
        highlight && highlightClasses[highlight],
        className
      )}
    >
      {children}
    </div>
  );
};
