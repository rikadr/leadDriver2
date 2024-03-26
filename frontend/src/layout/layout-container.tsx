import { NavMenu } from "./nav-menu";

export const LayoutContainer: React.FC<{ children: JSX.Element }> = (props) => {
  return (
    <div className="h-screen bg-zinc-900 relative font-display">
      <NavMenu />
      <div className="pt-16 px-6 h-full overflow-y-auto">{props.children}</div>
    </div>
  );
};
