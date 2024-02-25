import React from "react";
import Header from "../header/Header";

interface MainLayoutProp {
  children?: React.ReactNode;
}

const MainLayout: React.FunctionComponent<MainLayoutProp> = ({ children }) => {
  return (
    <div
      className="bg-black text-default"
      style={{
        minHeight: "100dvh",
        fontFamily: "Pretendard",
      }}
    >
      <Header />
      <section className="w-full mt-[2em] flex items-center justify-center">
        {children}
      </section>
    </div>
  );
};

export default MainLayout;
