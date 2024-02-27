import React from "react";
import Navigation from "./navigation/Navigation";
import GitHubSvg from "../asset/svg/GitHubSvg";

const Header: React.FunctionComponent = () => {
  return (
    <header className="h-[4em] px-[1.5em] flex items-center justify-end border-b border-boundary bg-black">
      <div className="w-full flex items-center justify-start">
        <GitHubSvg
          className="w-[2em] h-[2em] fill-white cursor-pointer hover:opacity-50"
          onClick={() => {
            window.open(
              "https://github.com/jaeseung-lee/jaeseung-lee.github.io"
            );
          }}
        />
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
