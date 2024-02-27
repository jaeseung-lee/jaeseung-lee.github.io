import React, { useState } from "react";
import { Path, pathToString } from "../header/path";
import LayoutIdAnimation from "./animationPanel/LayoutIdAnimation";
import {
  AnimationPanelType,
  animationPanelTypeToString,
} from "./animationPanel/animationPanelType";
import { motion } from "framer-motion";
import ZoomSlideShowAnimation from "./animationPanel/ZoomSlideShowAnimation";
import ViewBox from "./animationPanel/ViewBox";
import CardSplitter from "./animationPanel/CardSplitter";

export const animationTypeToPanel = (animationType: AnimationPanelType) => {
  switch (animationType) {
    case AnimationPanelType.LAYOUT_ID: {
      return <LayoutIdAnimation />;
    }
    case AnimationPanelType.ZOOM_SLIDE_SHOW: {
      return <ZoomSlideShowAnimation />;
    }
    case AnimationPanelType.VIEW_BOX: {
      return <ViewBox />;
    }
    case AnimationPanelType.CARD_SPLITTER: {
      return <CardSplitter />;
    }
  }
};

const Index: React.FunctionComponent = () => {
  const [currentAnimationType, setCurrentAnimationType] =
    useState<AnimationPanelType>(AnimationPanelType.LAYOUT_ID);

  return (
    <React.Fragment>
      <div className="w-[calc(100vw-2em)]">
        <h1 className="text-left text-[1.5em]">
          {pathToString(Path.ANIMATION)}
        </h1>
      </div>

      <div className="mx-auto inline-flex flex-wrap items-center w-[calc(100vw-2em)] justify-start overflow-x-auto mt-[0.5em] gap-[1em]">
        {[
          AnimationPanelType.LAYOUT_ID,
          AnimationPanelType.CARD_SPLITTER,
          AnimationPanelType.VIEW_BOX,
          AnimationPanelType.ZOOM_SLIDE_SHOW,
        ].map((animationPanelType) => (
          <div
            key={animationPanelType}
            className="relative flex py-[0.2em] px-[0.5em] flex-none cursor-pointer items-center justify-center"
            onClick={() => {
              setCurrentAnimationType(animationPanelType);
            }}
          >
            {currentAnimationType == animationPanelType && (
              <motion.div
                animate={{ opacity: 0.5 }}
                layoutId="animationPanelType"
                className="absolute bottom-0 left-0 right-0 top-0 rounded-lg bg-boundary"
              ></motion.div>
            )}
            <p>{animationPanelTypeToString(animationPanelType)}</p>
          </div>
        ))}
      </div>

      {animationTypeToPanel(currentAnimationType)}
    </React.Fragment>
  );
};

export default Index;
