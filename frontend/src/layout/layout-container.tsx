import { NavMenu } from "./nav-menu";

export const LayoutContainer: React.FC<{ children: JSX.Element }> = (props) => {
  return (
    <div className="h-screen bg-sky-50 relative">
      <NavMenu />
      <div className="pt-14 h-full overflow-y-auto">{props.children}</div>
    </div>
  );
};
