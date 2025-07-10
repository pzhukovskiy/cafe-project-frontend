import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  icon
}: ButtonProps) {
  const baseClasses = "inline-flex items-center font-semibold rounded-full transition-all duration-200 shadow-lg hover:shadow-xl";

  const variantClasses = {
    primary: "bg-white text-blue-600 hover:bg-gray-100",
    secondary: "bg-white text-orange-600 hover:bg-gray-100",
    outline: "border-2 border-white text-white hover:bg-white hover:text-gray-900"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} cursor-pointer`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
        {icon && <span className="ml-2">{icon}</span>}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
} 