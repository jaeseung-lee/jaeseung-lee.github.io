import React from "react";
import Navigation from "./navigation/Navigation";

const Header: React.FunctionComponent = () => {
  return (
    <header className="h-[4em] px-[1.5em] flex items-center justify-end">
      <Navigation />
    </header>
  );
};

export default Header;
