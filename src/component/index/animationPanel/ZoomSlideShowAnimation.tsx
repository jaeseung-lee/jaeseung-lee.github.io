import React, { useEffect, useRef, useState } from "react";
import AnimationPanelLayout from "../../layout/AnimationPanelLayout";

import {
  AnimationPanelType,
  animationPanelTypeToString,
} from "./animationPanelType";
import { PRELOADED_IMAGE_LIST } from "../../asset/preloadedData";
import { Variants, motion } from "framer-motion";

export const getNextImageIndex = (
  imageListLength: number,
  currentImageIndex: number
) => {
  if (imageListLength == currentImageIndex + 1) {
    return 0;
  } else {
    return currentImageIndex + 1;
  }
};

export const getBackImageIndex = (
  imageListLength: number,
  currentImageIndex: number
) => {
  if (currentImageIndex == 0) {
    return imageListLength - 1;
  } else {
    return currentImageIndex - 1;
  }
};

const ZoomSlideShowAnimation: React.FunctionComponent = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const variants: Variants = {
    initial: {
      scale: 0,
      zIndex: 0,
      transition: {
        type: "tween",
        delay: 1,
      },
    },
    nextImage: {
      scale: 0,
      zIndex: 1,
    },
    currentImage: {
      scale: 0.3,
      zIndex: 3,
      transition: {
        type: "easeIn",
        duration: 1,
      },
    },
    backImage: {
      scale: 1,
      zIndex: 2,
      transition: {
        type: "easeIn",
        duration: 1,
      },
    },
  };

  const indexToVariant = (index: number) => {
    if (index == imageIndex) {
      return "currentImage";
    }

    if (index == getNextImageIndex(PRELOADED_IMAGE_LIST.length, imageIndex)) {
      return "nextImage";
    }

    if (index == getBackImageIndex(PRELOADED_IMAGE_LIST.length, imageIndex)) {
      return "backImage";
    }

    return "initial";
  };

  const isNextOrPrevButtonPressableRef = useRef(true);

  useEffect(() => {
    isNextOrPrevButtonPressableRef.current = false;
    setTimeout(() => {
      isNextOrPrevButtonPressableRef.current = true;
    }, 2000);
  }, [imageIndex]);

  return (
    <AnimationPanelLayout
      headertext={animationPanelTypeToString(
        AnimationPanelType.ZOOM_SLIDE_SHOW
      )}
    >
      <div className="w-full aspect-video relative">
        {PRELOADED_IMAGE_LIST.map((imageSrc, index) => (
          <motion.img
            key={index}
            className="absolute aspect-video inset-0 w-full"
            src={imageSrc}
            animate={indexToVariant(index)}
            variants={variants}
          ></motion.img>
        ))}
      </div>
      <div className="w-full flex flex-row items-center justify-between mt-[1em]">
        <button
          className="hover:opacity-50 cursor-pointer"
          onClick={() => {
            if (!isNextOrPrevButtonPressableRef.current) {
              return;
            }

            isNextOrPrevButtonPressableRef.current = false;

            setImageIndex(
              getBackImageIndex(PRELOADED_IMAGE_LIST.length, imageIndex)
            );
          }}
        >
          Prev
        </button>
        <button
          className="hover:opacity-50 cursor-pointer"
          onClick={() => {
            if (!isNextOrPrevButtonPressableRef.current) {
              return;
            }

            isNextOrPrevButtonPressableRef.current = false;

            setImageIndex(
              getNextImageIndex(PRELOADED_IMAGE_LIST.length, imageIndex)
            );
          }}
        >
          Next
        </button>
      </div>
    </AnimationPanelLayout>
  );
};

export default ZoomSlideShowAnimation;
