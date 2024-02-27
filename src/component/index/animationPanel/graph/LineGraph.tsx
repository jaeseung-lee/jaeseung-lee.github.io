import React, { useEffect, useRef, useState } from "react";
import { MAX_TIME_LAPSE, lineColor } from "./constant";
import { motion } from "framer-motion";
import {
  clearGraph,
  drawAxis,
  drawLastCirclePoint,
  drawHorizontalLine,
  drawLines,
  valueToRatio,
} from "./utils";

interface LineGraphProp {
  className?: string;
  valueList: { rowValueList: number[]; valueName: string }[];
  backgroundColor?: string;
  axisColor?: string;
  numMeasureFixedPoint?: number;
}

const LineGraph: React.FunctionComponent<LineGraphProp> = ({
  className,
  valueList,
  backgroundColor = "white",
  axisColor = "#E0E0E0",
  numMeasureFixedPoint = 0,
}) => {
  const animateStartTimeRef = useRef<number>();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scaleRef = useRef(0);
  const [animationEnd, setAnimationEnd] = useState(false);

  const minMaxValueRef = useRef(
    (() => {
      let max = -Infinity;
      let min = Infinity;

      const rowValueList = valueList.map((value) => value.rowValueList);

      for (const value of rowValueList.flat()) {
        if (value > max) {
          max = value;
        }

        if (value < min) {
          min = value;
        }
      }

      return {
        realMax: max,
        max: Math.ceil(max * 1.05),
        realMin: min,
        min: Math.floor(min * 0.95),
      };
    })()
  );

  useEffect(() => {
    const drawGraph = (scale: number) => {
      clearGraph(canvasRef, backgroundColor);

      drawAxis(canvasRef, axisColor, minMaxValueRef.current);

      drawHorizontalLine(
        canvasRef,
        axisColor,
        valueList[0].rowValueList.length
      );

      valueList.forEach((rowValueListInfo, rowIndex) => {
        drawLines(
          canvasRef,
          rowValueListInfo.rowValueList,
          scale,
          rowIndex,
          minMaxValueRef.current.min,
          minMaxValueRef.current.max
        );

        drawLastCirclePoint(
          canvasRef,
          rowValueListInfo.rowValueList[
            rowValueListInfo.rowValueList.length - 1
          ],
          minMaxValueRef.current.min,
          minMaxValueRef.current.max
        );
      });
    };

    const drawOnCanvas = () => {
      if (!canvasRef.current || !containerRef.current) {
        return;
      }

      const DPI = window.devicePixelRatio * 2;
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const containerHeight = containerWidth;
      canvasRef.current.style.width = `${containerWidth}px`;
      canvasRef.current.style.height = `${containerHeight}px`;
      canvasRef.current.width = containerWidth * DPI;
      canvasRef.current.height = containerHeight * DPI;

      if (animateStartTimeRef.current) {
        drawGraph(1);
        return;
      } else {
        animateStartTimeRef.current = Date.now();
      }

      let animateRef: number;

      const animateGraph = () => {
        if (!animateStartTimeRef.current) {
          return;
        }

        if (scaleRef.current > 0.999) {
          drawGraph(1);
          window.cancelAnimationFrame(animateRef);

          setAnimationEnd(true);
          return;
        }
        drawGraph(scaleRef.current);

        const timeLapse = Date.now() - animateStartTimeRef.current;
        scaleRef.current = timeLapse / MAX_TIME_LAPSE;

        window.requestAnimationFrame(animateGraph);
      };

      animateGraph();
    };

    drawOnCanvas();

    window.addEventListener("orientationchange", drawOnCanvas);
    window.addEventListener("resize", drawOnCanvas);

    return () => {
      window.removeEventListener("orientationchange", drawOnCanvas);
      window.removeEventListener("resize", drawOnCanvas);
    };
  }, []);

  return (
    <div className="flex w-full flex-col gap-[1em] rounded-[0.5em] p-[1em]">
      <div ref={containerRef} className={"relative " + className}>
        <canvas ref={canvasRef}></canvas>

        {animationEnd && (
          <React.Fragment>
            {Array.from(
              new Set()
                .add(minMaxValueRef.current.realMax)
                .add(minMaxValueRef.current.realMin)
            ).map((value, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute left-0 font-un-bee text-[0.8em]"
                style={{
                  bottom:
                    100 *
                      valueToRatio(
                        value as number,
                        minMaxValueRef.current.min,
                        minMaxValueRef.current.max
                      ) +
                    "%",
                }}
              >
                {(value as number).toFixed(numMeasureFixedPoint)}
              </motion.p>
            ))}
          </React.Fragment>
        )}
      </div>

      <div className="flex w-full flex-row flex-wrap items-center justify-center gap-[2em]">
        {valueList.map((rowValueList, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-center gap-[0.5em]"
          >
            <div
              className="h-[1em] w-[1em] rounded-full"
              style={{ backgroundColor: lineColor[index] }}
            ></div>
            <p>{rowValueList.valueName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineGraph;
