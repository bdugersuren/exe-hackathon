import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants: Record<string, string> = {
  default: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm",
  destructive: "bg-red-500 text-white hover:bg-red-600",
  outline: "border border-slate-700 bg-transparent hover:bg-slate-800 hover:text-slate-100",
  secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700",
  ghost: "hover:bg-slate-800 hover:text-slate-100",
  link: "text-emerald-500 underline-offset-4 hover:underline",
  premium: "bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:from-emerald-300 hover:to-emerald-500 transition-all",
};

const sizeVariants: Record<string, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3 text-xs",
  lg: "h-11 rounded-md px-8 text-base",
  icon: "h-10 w-10",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "premium";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50",
          buttonVariants[variant],
          sizeVariants[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
