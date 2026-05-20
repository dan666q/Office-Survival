interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "danger" | "warning" | "success" | "info";
  size?: "sm" | "md";
}

const variants = {
  default: "bg-zinc-700/50 text-zinc-300 border-zinc-600",
  danger: "bg-red-500/15 text-red-300 border-red-500/30",
  warning: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  success: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  info: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
};

const sizes = {
  sm: "text-[10px] px-2 py-0.5",
  md: "text-xs px-2.5 py-1",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
}: BadgeProps) {
  return (
    <span
      className={`
          inline-flex items-center rounded-full border font-medium tracking-wide
          ${variants[variant]}
          ${sizes[size]}
        `}
    >
      {children}
    </span>
  );
}
