import React from "react";
import Navigation from "./navigation/Navigation";
import GitHubSvg from "../asset/svg/GitHubSvg";

const Header: React.FunctionComponent = () => {
  return (
    <header className="h-[4em] px-[1.5em] flex items-center justify-between border-b border-boundary bg-black">
      <GitHubSvg
        className="w-[2em] h-[2em] fill-white cursor-pointer hover:opacity-50 flex-none"
        onClick={() => {
          window.open("https://github.com/jaeseung-lee/jaeseung-lee.github.io");
        }}
      />

      <Navigation />
    </header>
  );
};

export default Header;
