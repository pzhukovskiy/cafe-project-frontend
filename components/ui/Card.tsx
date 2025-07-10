import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  variant?: "default" | "feature";
  className?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  variant = "default",
  className = "",
  onClick
}: CardProps) {
  const baseClasses = "rounded-xl shadow-lg hover:shadow-xl transition-all duration-300";

  const variantClasses = {
    default: "bg-white p-6",
    feature: "group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
} 