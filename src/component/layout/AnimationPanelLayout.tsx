import React from "react";
import Box from "../box/Box";

interface AnimationPanelLayoutProp {
  headertext: string;
}

const AnimationPanelLayout: React.FunctionComponent<
  React.HTMLAttributes<HTMLElement> & AnimationPanelLayoutProp
> = (props) => {
  return (
    <Box
      className="w-[calc(100vw-2em)] max-w-screen-md relative p-[1em] mt-[1em]"
      {...props}
    >
      <h2 className="w-full text-left font-bold mb-[1em]">
        {props.headertext}
      </h2>
      {props.children}
    </Box>
  );
};

export default AnimationPanelLayout;
