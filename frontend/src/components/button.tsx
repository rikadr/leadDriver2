import { ReactNode } from "react";
import { classNames } from "../common/class-names-utils";

type Variant = "primary" | "secondary" | "danger";

export const Button: React.FC<{
  variant?: Variant;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  children?: ReactNode;
}> = ({
  variant = "primary",
  onClick,
  type = "button",
  className,
  children,
}) => {
  const colors: Record<Variant, string> = {
    primary: "bg-sky-500 hover:bg-sky-700",
    secondary: "bg-zink-900 hover:bg-zinc-700",
    danger: "bg-red-700 hover:bg-red-900",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        "px-4 py-1 rounded-lg text-sm",
        "ring-[0.5px] ring-white/50 hover:ring-white/70",
        "transition-all duration-100",
        colors[variant],
        className
      )}
    >
      {children}
    </button>
  );
};
