import React from "react";
import { useTheme } from "src/theme/ThemeContext";

interface CustomCardProps {
  className?: string;
  children: React.ReactNode;
}

export default function CustomCard({ className = "", children }: CustomCardProps) {
  const { isDarkMode } = useTheme();

  const baseClasses = "transition-colors";
  const themeClasses = isDarkMode 
    ? "bg-primary-gradient hover:hover-primary-gradient" 
    : "bg-white hover:bg-gray-200";

  return (
    <div className={`${baseClasses} ${themeClasses} ${className}`}>
      {children}
    </div>
  );
}
