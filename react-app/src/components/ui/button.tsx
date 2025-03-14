import type React from "react"
import type { ReactNode } from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2.5 rounded-md font-medium transition-all duration-200 hover:shadow-md active:shadow-inner ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

