import React from "react";

interface MainLayoutProp {
  children?: React.ReactNode;
}

const MainLayout: React.FunctionComponent<MainLayoutProp> = ({ children }) => {
  return (
    <div
      className="bg-black text-default"
      style={{
        minHeight: "100dvh",
      }}
    >
      {children}
    </div>
  );
};

export default MainLayout;
