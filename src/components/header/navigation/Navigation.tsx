"use client";

import React, { useState } from "react";
import NavigationMenuButton from "./NavigationMenuButton";
import { Path, getPath, pathToString } from "../path";
import { motion } from "framer-motion";
import Link from "next/link";

const Navigation: React.FunctionComponent = () => {
  const [isNavigationModalOpened, setIsNavigationModalOpened] = useState(false);

  return (
    <React.Fragment>
      <p className="flex-none text-[14px] md:pl-[1em]">
        {`Jae Seung Lee's Portfolio`}
      </p>

      <NavigationMenuButton
        isNavigationMenuButtonOpened={isNavigationModalOpened}
        onClick={() => {
          setIsNavigationModalOpened(!isNavigationModalOpened);
        }}
      />

      <div className="w-full h-full hidden md:inline-flex items-center justify-start pl-[2em] gap-[2em]">
        {[Path.ANIMATION, Path.COMPONENT].map((path, index) => (
          <Link
            href={"/" + getPath(path)}
            key={index}
            className="relative h-full flex items-center justify-center"
            onClick={() => {
              setIsNavigationModalOpened(false);
            }}
          >
            <p className="w-full text-left">{pathToString(path)}</p>
          </Link>
        ))}
      </div>

      {isNavigationModalOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 top-[4em] px-[1.5em] bg-black z-modal"
        >
          {[Path.ANIMATION, Path.COMPONENT].map((path, index) => (
            <motion.div
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
              className="w-full border-b border-boundary"
              onClick={() => {
                setIsNavigationModalOpened(false);
              }}
            >
              <Link
                href={"/" + getPath(path)}
                className="py-[0.8em] flex items-center justify-start"
              >
                <p className="w-full text-left">{pathToString(path)}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </React.Fragment>
  );
};

export default Navigation;
