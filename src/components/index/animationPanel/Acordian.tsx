import React, { useRef, useState } from "react";
import AnimationPanelLayout from "../../layout/AnimationPanelLayout";
import {
  AnimationPanelType,
  animationPanelTypeToString,
} from "./animationPanelType";
import { PRELOADED_IMAGE_LIST } from "../../asset/preloadedData";
import { motion, useScroll, useSpring } from "framer-motion";

const Acordian: React.FunctionComponent = () => {
  const scrollContainerRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: scrollContainerRef });
  const scaleX = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [openedImageIndex, setOpenedImageIndex] = useState(0);

  return (
    <AnimationPanelLayout
      headertext={animationPanelTypeToString(AnimationPanelType.ACORDIAN)}
    >
      <p className="mb-[1em]">Scroll and click the acordian.</p>
      <motion.div
        className="h-[2em] bg-white mx-auto w-full rounded-[0.5em]"
        style={{
          scaleX,
        }}
      ></motion.div>

      <div
        ref={scrollContainerRef}
        className="flex flex-row items-center justify-start rounded-[0.5em] overflow-x-auto mt-[1em]"
      >
        {PRELOADED_IMAGE_LIST.map((imageSrc, index) => (
          <motion.img
            key={index}
            className="object-cover object-center h-[60vh] flex-none"
            src={imageSrc}
            onClick={() => {
              setOpenedImageIndex(index);
            }}
            animate={{
              width: openedImageIndex == index ? "80%" : "5%",
              transition: {
                type: "tween",
                duration: 0.5,
              },
            }}
          ></motion.img>
        ))}
      </div>
    </AnimationPanelLayout>
  );
};

export default Acordian;
