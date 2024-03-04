import {
  PADDING_RATIO,
  THICK_LINE_WIDTH_RATIO,
  THIN_WIDTH_RATIO,
  lineColor,
} from './constant';

export const valueToRatio = (
  value: number,
  minValue: number,
  maxValue: number,
) => {
  return (value - minValue) / (maxValue - minValue);
};

export const clearGraph = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  graphBackgroundColor: string,
) => {
  if (!canvasRef.current) {
    return;
  }

  const canvasWidth = canvasRef.current.width;
  const canvasHeight = canvasWidth;
  const canvasContext = canvasRef.current?.getContext('2d')!;
  canvasContext.fillStyle = graphBackgroundColor;
  canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
};

export const drawAxis = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  axisColor: string,
  minMaxValue: {
    realMax: number;
    max: number;
    realMin: number;
    min: number;
  },
) => {
  if (!canvasRef.current) {
    return;
  }
  const canvasWidth = canvasRef.current.width;
  const canvasHeight = canvasWidth;

  const canvasContext = canvasRef.current.getContext('2d')!;

  canvasContext.beginPath();
  canvasContext.strokeStyle = axisColor;
  canvasContext.lineCap = 'round';

  canvasContext.moveTo(
    0,
    canvasHeight *
      (1 - valueToRatio(minMaxValue.realMax, minMaxValue.min, minMaxValue.max)),
  );
  canvasContext.lineTo(
    canvasWidth,
    canvasHeight *
      (1 - valueToRatio(minMaxValue.realMax, minMaxValue.min, minMaxValue.max)),
  );

  canvasContext.moveTo(
    0,
    canvasHeight *
      (1 - valueToRatio(minMaxValue.realMin, minMaxValue.min, minMaxValue.max)),
  );
  canvasContext.lineTo(
    canvasWidth,
    canvasHeight *
      (1 - valueToRatio(minMaxValue.realMin, minMaxValue.min, minMaxValue.max)),
  );

  canvasContext.stroke();
};

export const drawLines = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  valueList: number[],
  scale: number,
  rowIndex: number,
  minValue: number,
  maxValue: number,
) => {
  if (!canvasRef.current) {
    return;
  }

  const canvasContext = canvasRef.current.getContext('2d')!;

  const canvasWidth = canvasRef.current.width;
  const canvasHeight = canvasWidth;

  canvasContext.beginPath();
  canvasContext.strokeStyle = lineColor[rowIndex % lineColor.length];

  valueList.forEach((value, index) => {
    if (!canvasRef.current) {
      return;
    }

    const ratio = valueToRatio(value, minValue, maxValue);

    const padding = canvasWidth * PADDING_RATIO;

    if (index == 0) {
      canvasContext.lineCap = 'round';
      canvasContext.lineJoin = 'round';

      canvasContext.lineWidth = canvasWidth * THICK_LINE_WIDTH_RATIO * scale;

      canvasContext.moveTo(
        padding +
          ((canvasWidth - padding * 2) * index) / (valueList.length - 1),
        canvasHeight * (1 - ratio),
      );
    } else {
      canvasContext.lineTo(
        padding +
          ((canvasWidth - padding * 2) * index) / (valueList.length - 1),
        canvasHeight * (1 - ratio),
      );
    }
  });

  canvasContext.stroke();
};

export const drawLastCirclePoint = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  lastValue: number,
  minValue: number,
  maxValue: number,
) => {
  if (!canvasRef.current) {
    return;
  }

  const canvasContext = canvasRef.current.getContext('2d')!;

  canvasContext.beginPath();

  const padding = canvasRef.current.width * PADDING_RATIO;

  const canvasWidth = canvasRef.current.width;
  const canvasHeight = canvasWidth;

  canvasContext.arc(
    /* x=*/ canvasWidth - padding,
    /* y=*/ canvasHeight * (1 - valueToRatio(lastValue, minValue, maxValue)),
    /* radius=*/ canvasWidth * THICK_LINE_WIDTH_RATIO,
    /* startAngle=*/ 0,
    /* endAngle=*/ Math.PI * 2,
  );

  canvasContext.stroke();
};

export const drawHorizontalLine = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  axisColor: string,
  numHorizontalLine: number,
) => {
  if (!canvasRef.current) {
    return;
  }

  const canvasWidth = canvasRef.current.width;
  const padding = canvasWidth * PADDING_RATIO;

  const canvasHeight = canvasWidth;

  const canvasContext = canvasRef.current.getContext('2d')!;

  for (let index = 0; index < numHorizontalLine; index++) {
    canvasContext.beginPath();
    canvasContext.moveTo(
      padding + ((canvasWidth - padding * 2) * index) / (numHorizontalLine - 1),
      0,
    );

    canvasContext.strokeStyle = axisColor;
    canvasContext.lineWidth = canvasWidth * THIN_WIDTH_RATIO;

    canvasContext.lineTo(
      padding + ((canvasWidth - padding * 2) * index) / (numHorizontalLine - 1),
      canvasHeight,
    );
    canvasContext.stroke();
  }
};
