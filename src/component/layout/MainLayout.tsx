import React from "react";
import Header from "../header/Header";

const MainLayout: React.FunctionComponent<React.HTMLAttributes<HTMLElement>> = (
  props
) => {
  return (
    <div
      {...props}
      className={"bg-black text-default pb-[10vh] " + props.className}
      style={{
        minHeight: "100dvh",
        fontFamily: "Pretendard",
      }}
    >
      <Header />
      <section className="w-full mt-[1em] flex items-center justify-center flex-col">
        {props.children}
      </section>
    </div>
  );
};

export default MainLayout;
