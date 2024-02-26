import React, { useState } from "react";
import NavigationMenuButton from "./NavigationMenuButton";
import { Path, pathToString } from "../path";
import { motion } from "framer-motion";

const Navigation: React.FunctionComponent = () => {
  const [_currentPath, setCurrentPath] = useState<Path>();
  const [isNavigationModalOpened, setIsNavigationModalOpened] = useState(false);

  return (
    <React.Fragment>
      <NavigationMenuButton
        isNavigationMenuButtonOpened={isNavigationModalOpened}
        onClick={() => {
          setIsNavigationModalOpened(!isNavigationModalOpened);
        }}
      />

      {isNavigationModalOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 top-[4em] px-[1.5em] bg-black z-modal"
        >
          {[Path.ANIMATION, Path.PORTFOLIO].map((path, index) => (
            <motion.button
              key={index}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  type: "tween",
                  delay: index * 0.2,
                },
              }}
              className="w-full border-b border-boundary py-[0.8em] flex items-center justify-start"
              onClick={() => {
                setCurrentPath(path);
                setIsNavigationModalOpened(false);
              }}
            >
              <p className="w-full text-left">{pathToString(path)}</p>
            </motion.button>
          ))}
        </motion.div>
      )}
    </React.Fragment>
  );
};

export default Navigation;
