import { ReactNode } from "react";
import { classNames } from "../common/class-names-utils";

export const Card: React.FC<{
  hoverEffects?: boolean;
  className?: string;
  children?: ReactNode;
}> = ({ hoverEffects = false, className, children }) => {
  return (
    <div
      className={classNames(
        "p-4 flex flex-col gap-2 rounded-lg ring-[0.5px] ring-white/50",
        hoverEffects &&
          "hover:ring-white/70 hover:bg-gradient-to-t from-sky-700/20 to-zink-900",
        className
      )}
    >
      {children}
    </div>
  );
};
