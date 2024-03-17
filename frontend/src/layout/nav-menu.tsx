import React from "react";
import { useLocation } from "react-router-dom";
import { useYouInitials } from "../route/my-profile/my-profile-api";

export const NavMenu: React.FC = () => {
  const you = useYouInitials();

  return (
    <div className="h-14 border-b-[1px] border-black/10 backdrop-blur-md flex items-center absolute w-full">
      <a
        href="/"
        className="font-bold px-6 py-4 transition-colors duration-200 hover:bg-sky-500 hover:text-white"
      >
        LeadDriver
      </a>
      <MenuItem href="/" title="Home" />
      <MenuItem href="/my-profile" title="My profile" />
      <MenuItem href="/login" title="Login" />
      <div className="grow" />
      <a
        href="/my-profile"
        className="aspect-square h-10 bg-sky-500 transition-colors duration-200 hover:bg-sky-700 rounded-full text-white flex items-center justify-center pb-0.5"
      >
        {you.data?.data?.initials ?? ":("}
      </a>
    </div>
  );
};

const MenuItem: React.FC<{ href: string; title: string }> = ({
  href,
  title,
}) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  return (
    <a
      href={href}
      className={
        "transition-colors duration-300 p-4 text-sm hover:text-sky-500" +
        (isActive ? " text-sky-500 border-b-2 border-sky-500" : "")
      }
    >
      {title}
    </a>
  );
};
