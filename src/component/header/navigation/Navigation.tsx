import React, { useState } from "react";
import NavigationMenuButton from "./NavigationMenuButton";
import { Path, pathToString } from "../path";
import { motion } from "framer-motion";

const Navigation: React.FunctionComponent = () => {
  const [_currentPath, setCurrentPath] = useState<Path>(Path.INDEX);
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
          className="fixed bottom-0 left-0 right-0 top-[4em] px-[1.5em] bg-black"
        >
          {[Path.INDEX].map((path, index) => (
            <motion.button
              key={index}
              className="w-full border-b border-default py-[0.5em]"
              onClick={() => {
                setCurrentPath(path);
                setIsNavigationModalOpened(false);
              }}
            >
              {pathToString(path)}
            </motion.button>
          ))}
        </motion.div>
      )}
    </React.Fragment>
  );
};

export default Navigation;
