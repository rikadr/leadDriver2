import { NavMenu } from "./nav-menu";

export const LayoutContainer: React.FC<{ children: JSX.Element }> = (props) => {
  return (
    <div className="h-screen bg-zinc-900 relative font-display">
      <NavMenu />
      <div className="py-4 px-6 h-full overflow-y-auto">
        <div className="h-14" /> {/* Spacer to clear content below nav menu */}
        {props.children}
      </div>
    </div>
  );
};
