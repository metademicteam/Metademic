import * as React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    
    // Simplistic variants
    const variants = {
      default: "bg-[var(--mdpi-blue)] text-white hover:bg-[var(--mdpi-blue-dark)] shadow-sm",
      outline: "border border-[var(--mdpi-blue)] bg-transparent hover:bg-slate-100 text-[var(--mdpi-blue)]",
      ghost: "hover:bg-slate-100 hover:text-slate-900",
      link: "text-[var(--mdpi-link-blue)] underline-offset-4 hover:underline",
      secondary: "bg-[var(--mdpi-gray-light)] text-[var(--mdpi-text-dark)] hover:bg-[#d5d5d5]"
    }
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    }
    
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
