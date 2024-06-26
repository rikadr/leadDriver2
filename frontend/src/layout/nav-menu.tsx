import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useYouInitials } from "../route/my-profile/my-profile-api";
import { AppId, appUrl } from "../utils/app-url";
import LogoB from "../images/Lead driver logo b.png";

export const NavMenu: React.FC = () => {
  const you = useYouInitials();

  return (
    <div className="absolute w-full h-14 border-b-[1px] select-none border-white/10 backdrop-blur-md bg-sky-600/20 flex items-center z-50">
      <Link
        to={appUrl["home"]}
        className="flex items-center gap-2 font-bold px-6 h-full transition-colors duration-200 hover:bg-sky-500 hover:text-white"
      >
        <img src={LogoB} alt="LeadDriver" className="h-8" />
        LeadDriver
      </Link>
      <MenuItem appId="events" title="Events" />
      <MenuItem appId="my-profile" title="My profile" />
      <MenuItem appId="login" title="Login" />
      <div className="grow" />
      <Link
        to={appUrl["my-profile"]}
        className="mx-2 aspect-square h-10 bg-sky-500 transition-colors duration-200 hover:bg-sky-700 rounded-full text-white flex items-center justify-center pb-0.5"
      >
        {you.data?.data?.initials ?? ":("}
      </Link>
    </div>
  );
};

const MenuItem: React.FC<{ appId: AppId; title: string }> = ({
  appId,
  title,
}) => {
  const location = useLocation();
  const isActive = location.pathname === "/" + appUrl[appId];
  return (
    <Link
      to={appUrl[appId]}
      className={
        "transition-colors duration-300 p-4 text-sm hover:text-sky-500 border-b-2 border-sky-500" +
        (isActive
          ? " text-sky-500 border-opacity-100"
          : " border-opacity-0 hover:border-sky-500/50")
      }
    >
      {title}
    </Link>
  );
};
