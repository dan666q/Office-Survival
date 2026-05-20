interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const variants = {
  primary:
    "bg-cyan-400 hover:bg-cyan-300 text-black font-bold shadow-lg shadow-cyan-500/20",
  secondary:
    "bg-zinc-700 hover:bg-zinc-600 text-zinc-100 border border-zinc-600",
  danger:
    "bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30",
  ghost: "bg-transparent hover:bg-white/5 text-zinc-400 hover:text-zinc-200",
};

const sizes = {
  sm: "text-xs px-3 py-1.5 rounded-lg",
  md: "text-sm px-4 py-2.5 rounded-xl",
  lg: "text-base px-6 py-3.5 rounded-2xl",
};

export default function Button({
  children,
  onClick,
  variant = "secondary",
  size = "md",
  disabled = false,
  fullWidth = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
          inline-flex items-center justify-center gap-2
          transition-all duration-200
          active:scale-95
          disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
    >
      {children}
    </button>
  );
}
