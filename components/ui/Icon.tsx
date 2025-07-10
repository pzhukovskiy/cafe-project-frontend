import { ReactNode } from "react";

interface IconProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "green" | "purple" | "white" | "gray" | "orange";
  className?: string;
}

export default function Icon({
  children,
  size = "md",
  color = "blue",
  className = ""
}: IconProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16 md:w-20 md:h-20"
  };

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    white: "text-white",
    gray: "bg-gray-100 text-gray-600",
    orange: "bg-orange-100 text-orange-600"
  };

  const classes = `${sizeClasses[size]} ${colorClasses[color]} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
} 