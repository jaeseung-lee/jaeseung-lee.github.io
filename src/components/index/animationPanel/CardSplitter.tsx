import React, { useState } from "react";
import AnimationPanelLayout from "../../layout/AnimationPanelLayout";
import {
  AnimationPanelType,
  animationPanelTypeToString,
} from "./animationPanelType";
import { Variants, motion } from "framer-motion";
import Box from "../../box/Box";

const MAX_NUM_ROW_CARD = 10;

const CardSplitter: React.FunctionComponent = () => {
  const [numRowCard, setNumRowCard] = useState(5);
  const [startAnimation, setStartAnimation] = useState(false);

  function variant(index: number): Variants {
    return {
      collect: {
        transform: `translateX(calc(100% * ${
          (numRowCard - 1) / 2 - (index % numRowCard)
        })) translateY(calc(100% * ${
          (numRowCard - 1) / 2 - Math.floor(index / numRowCard)
        }))`,
      },
      split: {
        transform: "translateX(0) translateY(0)",
        transition: {
          type: "tween",
          delay: index * 0.05,
        },
      },
    };
  }

  return (
    <AnimationPanelLayout
      headertext={animationPanelTypeToString(AnimationPanelType.CARD_SPLITTER)}
    >
      <div
        className="w-full aspect-square grid"
        style={{
          gridTemplateColumns: `repeat(${numRowCard}, minmax(0, 1fr))`,
        }}
        key={numRowCard}
      >
        {new Array(numRowCard * numRowCard).fill(0).map((_, index) => (
          <motion.div
            variants={variant(index)}
            key={index}
            className="p-[0.5vw] text-black"
            animate={startAnimation ? "split" : "collect"}
          >
            <div
              className="rounded-[0.5em] w-full h-full bg-white text-black flex items-center justify-center shadow-lg"
              style={{
                fontSize: `calc(10em / ${numRowCard})`,
              }}
            >
              <p>{index + 1}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <Box className="p-[1em] flex flex-col gap-[1em] mt-[1em]">
        <Box
          className="py-[0.2em] cursor-pointer hover:opacity-50 px-[0.5em] text-center"
          onClick={() => {
            setStartAnimation(!startAnimation);
          }}
        >
          {startAnimation ? "Collect" : "Split"}
        </Box>
        <p className="flex-none">Maximum Num Row Cards : {MAX_NUM_ROW_CARD}</p>
        <label className="flex flex-row gap-[0.5em] items-center justify-center">
          <p className="flex-none">Num Row Card</p>
          <input
            className="w-full bg-transparent border border-boundary py-[0.2em] px-[0.5em] text-center"
            value={numRowCard}
            type="number"
            onChange={(e) => {
              const input = parseInt(e.target.value);
              if (isNaN(input) || input <= 0 || input > MAX_NUM_ROW_CARD) {
                return;
              }

              setNumRowCard(input);
            }}
          ></input>
        </label>
      </Box>
    </AnimationPanelLayout>
  );
};

export default CardSplitter;
