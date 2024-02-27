import React, { useEffect, useRef } from "react";

const MEASURE_BOUNDARY_LIST = [0.2, 0.4, 0.6, 0.8, 1.0];

interface SquareGraphProp {
  id: string;
  className?: string;
  topRatio: number;
  rightRatio: number;
  bottomRatio: number;
  leftRatio: number;
  animateSquareGraph?: boolean;
}

const SquareGraph: React.FunctionComponent<SquareGraphProp> = ({
  id,
  className,
  topRatio,
  rightRatio,
  bottomRatio,
  leftRatio,
  animateSquareGraph = true,
}) => {
  const destinationRatioRef = useRef({
    topRatio,
    rightRatio,
    bottomRatio,
    leftRatio,
  });

  const scaleRef = useRef(animateSquareGraph ? 0 : 1);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  enum StrokeType {
    DATA,
    MEASURE,
  }

  const strokeTypeToStrokeColor = (strokeType: StrokeType) => {
    switch (strokeType) {
      case StrokeType.DATA: {
        return "#FF9F5B";
      }
      case StrokeType.MEASURE: {
        return "#E0E0E0";
      }
    }
  };

  useEffect(() => {
    const drawAxis = () => {
      if (!canvasRef.current) {
        return;
      }

      const canvasWidth = canvasRef.current.width;
      const canvasContext = canvasRef.current?.getContext("2d")!;
      canvasContext.beginPath();

      canvasContext.lineWidth = canvasRef.current.width * 0.005;
      canvasContext.strokeStyle = "#616161";
      canvasContext.moveTo(canvasWidth * 0.5, 0);
      canvasContext.lineTo(canvasWidth * 0.5, canvasWidth);
      canvasContext.stroke();

      canvasContext.moveTo(0, canvasWidth * 0.5);
      canvasContext.lineTo(canvasWidth, canvasWidth * 0.5);
      canvasContext.stroke();

      MEASURE_BOUNDARY_LIST.forEach((measureBoundary) =>
        drawDiamond(
          measureBoundary,
          measureBoundary,
          measureBoundary,
          measureBoundary,
          StrokeType.MEASURE
        )
      );
    };

    const clearGraph = () => {
      if (!canvasRef.current) {
        return;
      }

      const canvasWidth = canvasRef.current.width;
      const canvasContext = canvasRef.current?.getContext("2d")!;
      canvasContext.fillRect(0, 0, canvasWidth, canvasWidth);
    };

    const drawDiamond = (
      topRatio: number,
      rightRatio: number,
      bottomRatio: number,
      leftRatio: number,
      strokeType: StrokeType
    ) => {
      if (!canvasRef.current) {
        return;
      }

      const canvasWidth = canvasRef.current.width;
      const canvasContext = canvasRef.current?.getContext("2d")!;
      canvasContext.beginPath();

      canvasContext.lineWidth = canvasRef.current.width * 0.005;
      canvasContext.strokeStyle = strokeTypeToStrokeColor(strokeType);
      canvasContext.moveTo(
        canvasWidth * 0.5,
        (canvasWidth * (1 - topRatio)) / 2
      );
      canvasContext.lineTo(
        (canvasWidth * (1 - rightRatio)) / 2,
        canvasWidth * 0.5
      );
      canvasContext.lineTo(
        canvasWidth * 0.5,
        canvasWidth * (bottomRatio / 2 + 0.5)
      );
      canvasContext.lineTo(
        canvasWidth * (leftRatio / 2 + 0.5),
        canvasWidth * 0.5
      );
      canvasContext.lineTo(
        canvasWidth * 0.5,
        (canvasWidth * (1 - topRatio)) / 2
      );
      canvasContext.closePath();
      canvasContext.stroke();
    };

    const drawOnCanvas = () => {
      if (!canvasRef.current || !containerRef.current) {
        return;
      }

      const DPI = window.devicePixelRatio;
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      canvasRef.current.style.width = `${containerWidth}px`;
      canvasRef.current.style.height = `${containerWidth}px`;
      canvasRef.current.width = containerWidth * DPI;
      canvasRef.current.height = containerWidth * DPI;

      let animateRef: number;

      const animateGraph = () => {
        clearGraph();
        drawAxis();
        drawDiamond(
          destinationRatioRef.current.topRatio * scaleRef.current,
          destinationRatioRef.current.rightRatio * scaleRef.current,
          destinationRatioRef.current.bottomRatio * scaleRef.current,
          destinationRatioRef.current.leftRatio * scaleRef.current,
          StrokeType.DATA
        );

        scaleRef.current = scaleRef.current + (1 - scaleRef.current) / 100;

        if (scaleRef.current > 0.99) {
          window.cancelAnimationFrame(animateRef);
          return;
        }

        window.requestAnimationFrame(animateGraph);
      };

      animateGraph();
    };

    drawOnCanvas();

    window.addEventListener("resize", drawOnCanvas);
    window.addEventListener("orientationchange", drawOnCanvas);

    return () => {
      window.removeEventListener("resize", drawOnCanvas);
      window.removeEventListener("orientationchange", drawOnCanvas);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <canvas id={id} ref={canvasRef}></canvas>
    </div>
  );
};

export default SquareGraph;
