import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useYouInitials } from "../route/my-profile/my-profile-api";
import { AppId, appUrl } from "../utils/app-url";

export const NavMenu: React.FC = () => {
  const you = useYouInitials();

  return (
    <div className="h-14 border-b-[1px] border-black/10 backdrop-blur-md flex items-center absolute w-full">
      <Link
        to={appUrl["home"]}
        className="font-bold px-6 py-4 transition-colors duration-200 hover:bg-sky-500 hover:text-white"
      >
        LeadDriver
      </Link>
      <MenuItem appId="home" title="Home" />
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
  const isActive = location.pathname === appUrl[appId];
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
