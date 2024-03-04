import React, { useEffect, useRef } from "react";
import { MAX_TIME_LAPSE } from "./constant";

interface BarGraphProp {
  className?: string;
  maxValue: number;
  minValue?: number;
  value: number;
  barColor?: string;
}

const BarGraph: React.FunctionComponent<BarGraphProp> = ({
  className,
  maxValue,
  minValue = 0,
  value,
  barColor = "white",
}) => {
  const animateStartTimeRef = useRef<number>();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scaleRef = useRef(0);

  useEffect(() => {
    const clearGraph = () => {
      if (!canvasRef.current) {
        return;
      }

      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;
      const canvasContext = canvasRef.current?.getContext("2d")!;
      canvasContext.fillStyle = "black";
      canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
    };

    const drawBar = (ratio: number) => {
      if (!canvasRef.current) {
        return;
      }

      if (isNaN(ratio)) {
        ratio = 0;
      }

      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;
      const canvasContext = canvasRef.current?.getContext("2d")!;

      canvasContext.fillStyle = barColor;
      canvasContext.fillRect(0, 0, canvasWidth * ratio, canvasHeight);
    };

    const drawOnCanvas = () => {
      if (!canvasRef.current || !containerRef.current) {
        return;
      }

      const DPI = window.devicePixelRatio;
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const containerHeight =
        containerRef.current.getBoundingClientRect().height;
      canvasRef.current.style.width = `${containerWidth}px`;
      canvasRef.current.style.height = `${containerHeight}px`;
      canvasRef.current.width = containerWidth * DPI;
      canvasRef.current.height = containerHeight * DPI;

      if (animateStartTimeRef.current) {
        clearGraph();
        drawBar((value - minValue) / maxValue);
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
          clearGraph();
          drawBar((value - minValue) / maxValue);
          window.cancelAnimationFrame(animateRef);
          return;
        }

        clearGraph();
        drawBar(((value - minValue) / maxValue) * scaleRef.current);

        const timeLapse = Date.now() - animateStartTimeRef.current;
        scaleRef.current = Math.pow(timeLapse / MAX_TIME_LAPSE, 0.2);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default BarGraph;
