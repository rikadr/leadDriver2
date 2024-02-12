import React from "react";

export const NavMenu: React.FC = () => {
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
    </div>
  );
};

const MenuItem: React.FC<{ href: string; title: string }> = ({
  href,
  title,
}) => {
  return (
    <a
      href={href}
      className="transition-colors duration-300 
      p-4 text-sm hover:text-sky-500"
    >
      {title}
    </a>
  );
};
