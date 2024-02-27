import React from "react";

interface NavigationMenuButtonProp {
  isNavigationMenuButtonOpened: boolean;
  onClick: () => void;
}

const NavigationMenuButton: React.FunctionComponent<
  NavigationMenuButtonProp
> = ({ isNavigationMenuButtonOpened, onClick }) => {
  return (
    <button
      className="md:hidden h-[2em] w-[2em] rounded-full border border-default cursor-pointer hover:opacity-50 flex items-center justify-center relative"
      onClick={onClick}
    >
      <div
        className="h-[2px] absolute top-[0em] right-[0.4em] left-[0.4em] bg-default"
        style={{
          transform: isNavigationMenuButtonOpened
            ? "translateY(-100%) translateY(1em) rotate(45deg)"
            : "translateY(1em)",
          transition: "all 0.05s linear",
        }}
      ></div>
      <div
        className="h-[2px] absolute bottom-[0em] right-[0.4em] left-[0.4em] bg-default"
        style={{
          transform: isNavigationMenuButtonOpened
            ? "translateY(100%) translateY(-1em) rotate(-45deg)"
            : "translateY(-1em)",
          transition: "all 0.05s linear",
        }}
      ></div>
    </button>
  );
};

export default NavigationMenuButton;
