"use client";

import { useMotionTemplate, useMotionValue } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SIDE_BAR_HANDLE_SIZE = 24;

const SlideBar: React.FunctionComponent = () => {
  const slideBarRef = useRef<HTMLDivElement>(null);

  const controllerLeft = useMotionValue(0);
  const [ratio, setRatio] = useState(0);
  const controllerBackground = useMotionTemplate`linear-gradient(90deg, #3b82f6 ${controllerLeft}px, white 0)`;

  const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (!slideBarRef.current) {
      return;
    }

    controllerLeft.set(
      (e.nativeEvent.offsetX / e.currentTarget.offsetWidth) *
        slideBarRef.current.offsetWidth
    );
  };

  useEffect(() => {
    const controllerLeftOnChange = () => {
      if (!slideBarRef.current) {
        return;
      }

      const currentRatio =
        controllerLeft.get() /
        (slideBarRef.current.offsetWidth - SIDE_BAR_HANDLE_SIZE);

      if (currentRatio < 0) {
        setRatio(0);
      } else if (currentRatio > 1) {
        setRatio(1);
      } else {
        setRatio(currentRatio);
      }
    };

    controllerLeft.on("change", controllerLeftOnChange);

    return () => controllerLeft.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full px-[1em] flex flex-col items-center justify-center gap-[1em]">
      <p className="w-full text-left">Slide Bar</p>
      <div className="w-full flex items-center justify-center relative">
        <motion.div
          className="h-[0.5em] w-full rounded-full relative"
          ref={slideBarRef}
          onClick={handleOnClick}
          style={{
            background: controllerBackground,
          }}
        >
          <motion.div
            drag="x"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrag={(e) => {
              e.preventDefault();
            }}
            dragMomentum={false}
            dragElastic={0}
            dragConstraints={slideBarRef}
            className="absolute z-10 bg-white rounded-full border border-boundary cursor-pointer"
            style={{
              top: "50%",
              bottom: "50%",
              translateY: "-50%",
              width: SIDE_BAR_HANDLE_SIZE,
              height: SIDE_BAR_HANDLE_SIZE,
              left: 0,
              x: controllerLeft,
            }}
          />
        </motion.div>
      </div>
      <p className="w-full text-left">value : {(ratio * 100).toFixed(1)}%</p>
    </section>
  );
};

export default SlideBar;
