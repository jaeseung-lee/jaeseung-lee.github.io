import React from "react";
import AnimationPanelLayout from "../../layout/AnimationPanelLayout";
import {
  AnimationPanelType,
  animationPanelTypeToString,
} from "./animationPanelType";
import { PRELOADED_IMAGE_LIST } from "../../asset/preloadedData";
import { motion } from "framer-motion";
import Image from "next/image";

const ViewBox: React.FunctionComponent = () => {
  return (
    <AnimationPanelLayout
      headertext={animationPanelTypeToString(AnimationPanelType.VIEW_BOX)}
    >
      <div className="w-full aspect-video overflow-y-auto flex flex-col gap-[1em]">
        {PRELOADED_IMAGE_LIST.map((imageSrc, index) => (
          <motion.div
            className="rounded-[0.5em] w-full bg-white flex"
            key={index}
            style={{ flexDirection: index % 2 == 0 ? "row" : "row-reverse" }}
            initial={{ opacity: 0, x: index % 2 == 0 ? "-50%" : "50%" }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                duration: 1,
              },
            }}
          >
            <Image
              alt="view-box-image"
              className="w-[80%] aspect-video rounded-l-[0.5em]"
              src={imageSrc}
            ></Image>
            <div className="bg-white w-[20%] flex items-center justify-center text-black font-bold">
              {index}
            </div>
          </motion.div>
        ))}
      </div>
    </AnimationPanelLayout>
  );
};

export default ViewBox;
