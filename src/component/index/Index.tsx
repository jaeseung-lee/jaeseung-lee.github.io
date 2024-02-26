import React from "react";
import { Path, pathToString } from "../header/path";
import LayoutIdAnimation from "./animationPanel/LayoutIdAnimation";

const Index: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <div className="w-[calc(100vw-2em)]">
        <h1 className="text-left text-[1.5em]">
          {pathToString(Path.ANIMATION)}
        </h1>
      </div>

      <LayoutIdAnimation />
    </React.Fragment>
  );
};

export default Index;
