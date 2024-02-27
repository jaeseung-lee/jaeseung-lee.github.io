import React, { useState } from "react";
import AnimationPanelLayout from "../../layout/AnimationPanelLayout";
import { PRELOADED_IMAGE_LIST } from "../../asset/preloadedData";
import { motion } from "framer-motion";
import {
  AnimationPanelType,
  animationPanelTypeToString,
} from "./animationPanelType";

const LayoutIdAnimation: React.FunctionComponent = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>();

  return (
    <React.Fragment>
      <AnimationPanelLayout
        headertext={animationPanelTypeToString(AnimationPanelType.LAYOUT_ID)}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[1em]">
          {PRELOADED_IMAGE_LIST.map((imageSrc, index) => (
            <motion.img
              key={index}
              src={imageSrc}
              layoutId={`layout-id-${index}`}
              className="w-full aspect-square rounded-full border border-boundary cursor-pointer"
              onClick={() => setSelectedImageIndex(index)}
              whileHover={{
                scale: 1.1,
                transition: {
                  type: "tween",
                  duration: 0.5,
                },
              }}
            ></motion.img>
          ))}
        </div>
      </AnimationPanelLayout>
      {selectedImageIndex != undefined && (
        <React.Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            onClick={() => {
              setSelectedImageIndex(undefined);
            }}
            className="fixed inset-0 bg-black z-modal-background"
          ></motion.div>
          <motion.img
            layoutId={`layout-id-${selectedImageIndex}`}
            src={PRELOADED_IMAGE_LIST[selectedImageIndex]}
            className="fixed w-full max-w-screen-sm aspect-square top-[10%] border border-boundary bg-black z-modal"
          ></motion.img>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default LayoutIdAnimation;
