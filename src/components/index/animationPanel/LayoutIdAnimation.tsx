import React, { useState } from "react";
import AnimationPanelLayout from "../../layout/AnimationPanelLayout";
import {
  PRELOADED_IMAGE_ID_LIST,
  imageLoader,
} from "../../asset/preloadedData";
import { motion } from "framer-motion";
import {
  AnimationPanelType,
  animationPanelTypeToString,
} from "./animationPanelType";
import Image from "next/image";

const LayoutIdAnimation: React.FunctionComponent = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>();

  return (
    <React.Fragment>
      <AnimationPanelLayout
        headertext={animationPanelTypeToString(AnimationPanelType.LAYOUT_ID)}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[1em]">
          {PRELOADED_IMAGE_ID_LIST.map((imageSrc, index) => (
            <motion.div
              key={index}
              layoutId={`layout-id-${index}`}
              onClick={() => setSelectedImageIndex(index)}
              whileHover={{
                scale: 1.1,
                transition: {
                  type: "tween",
                  duration: 0.5,
                },
              }}
              className="w-full aspect-square rounded-full border border-boundary cursor-pointer relative overflow-hidden"
            >
              <Image
                alt="layout-id-animation-image"
                loader={() =>
                  imageLoader({ src: imageSrc, width: 400, quality: 80 })
                }
                fill={true}
                src={`${imageSrc}.png`}
              ></Image>
            </motion.div>
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
          <motion.div
            layoutId={`layout-id-${selectedImageIndex}`}
            className="fixed w-full max-w-screen-sm aspect-square top-[10%] border border-boundary bg-black z-modal"
          >
            <Image
              alt="pop-up-layout-id-animation-image"
              src={PRELOADED_IMAGE_ID_LIST[selectedImageIndex]}
              loader={() =>
                imageLoader({
                  src: PRELOADED_IMAGE_ID_LIST[selectedImageIndex],
                  width: 400,
                  quality: 80,
                })
              }
              fill={true}
            ></Image>
          </motion.div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default LayoutIdAnimation;
