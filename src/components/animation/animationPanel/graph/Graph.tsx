import React, { useState } from "react";
import AnimationPanelLayout from "../../../layout/AnimationPanelLayout";
import {
  AnimationPanelType,
  animationPanelTypeToString,
} from "../animationPanelType";
import Box from "../../../box/Box";
import SquareGraph from "./SquareGraph";
import Counter from "./Counter";
import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";

const Graph: React.FunctionComponent = () => {
  const [keys, setKeys] = useState([1, 1, 1, 1]);

  const setKeysToRerender = (index: number) => {
    setKeys([
      ...keys.slice(0, index),
      keys[index] + 1,
      ...keys.slice(index + 1),
    ]);
  };

  return (
    <AnimationPanelLayout
      headertext={animationPanelTypeToString(AnimationPanelType.GRAPH)}
    >
      <div className="flex flex-col gap-[1em]">
        <p>No packages, used only pure javascript.</p>
        <Box className="p-[0.5em] flex flex-col gap-[0.5em]" key={keys[0]}>
          <p>Square Graph</p>
          <SquareGraph
            id="main-random-square-graph"
            className="aspect-square"
            topRatio={Math.random() / 2 + 0.5}
            bottomRatio={Math.random() / 2 + 0.5}
            leftRatio={Math.random() / 2 + 0.5}
            rightRatio={Math.random() / 2 + 0.5}
          ></SquareGraph>

          <Box
            className="py-[0.2em] px-[0.5em] text-center hover:opacity-50 cursor-pointer"
            onClick={() => setKeysToRerender(0)}
          >
            Draw Again
          </Box>
        </Box>

        <Box className="p-[0.5em] flex flex-col gap-[0.5em]">
          <p>Line Graph</p>
          <Box>
            <LineGraph
              key={keys[1]}
              className="aspect-square w-full"
              backgroundColor="black"
              axisColor="#333333"
              valueList={[
                {
                  rowValueList: [30, 20, 40, 60, 10, 31, 27, 41, 99, 3],
                  valueName: "A",
                },
                {
                  rowValueList: [20, 31, 42, 30, 9, 18, 20, 66, 89, 100],
                  valueName: "B",
                },
                {
                  rowValueList: [12, 0, 49, 62, 81, 70, 3, 57, 22, 31],
                  valueName: "C",
                },
                {
                  rowValueList: [31, 22, 42, 8, 13, 9, 22, 70, 0, 10],
                  valueName: "D",
                },
              ]}
            ></LineGraph>
          </Box>

          <Box
            className="py-[0.2em] px-[0.5em] text-center hover:opacity-50 cursor-pointer"
            onClick={() => setKeysToRerender(1)}
          >
            Draw Again
          </Box>
        </Box>

        <Box className="p-[0.5em] flex flex-col gap-[0.5em]">
          <p>Bar</p>
          <Box>
            <BarGraph
              key={keys[2]}
              className="h-[2em]"
              maxValue={100}
              minValue={0}
              value={77}
            />
          </Box>

          <Box
            className="py-[0.2em] px-[0.5em] text-center hover:opacity-50 cursor-pointer"
            onClick={() => setKeysToRerender(2)}
          >
            Draw Again
          </Box>
        </Box>

        <Box className="p-[0.5em] flex flex-col gap-[0.5em]">
          <p>Counter</p>
          <Counter
            key={keys[3]}
            value={230}
            fixed={0}
            className="mx-auto text-center text-[3em]"
          />

          <Box
            className="py-[0.2em] px-[0.5em] text-center hover:opacity-50 cursor-pointer"
            onClick={() => setKeysToRerender(3)}
          >
            Draw Again
          </Box>
        </Box>
      </div>
    </AnimationPanelLayout>
  );
};

export default Graph;
