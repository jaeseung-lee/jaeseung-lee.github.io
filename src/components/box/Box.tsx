import React from "react";

const Box: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div {...props} className={"border border-boundary " + props.className}>
      {props.children}
    </div>
  );
};

export default Box;
