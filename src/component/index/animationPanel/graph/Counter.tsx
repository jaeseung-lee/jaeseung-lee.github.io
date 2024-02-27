import React, { useEffect, useRef } from 'react';

interface CounterProp {
  className?: string;
  value: number;
  fixed?: number;
  unit?: string;
}

const Counter: React.FunctionComponent<CounterProp> = ({
  className,
  value,
  fixed = 1,
  unit = '',
}) => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!paragraphRef.current) {
      return;
    }

    let currentValue = 0;
    const interval = setInterval(() => {
      currentValue = currentValue + (value - currentValue) * 0.06;
      if (paragraphRef.current) {
        paragraphRef.current.innerText = currentValue.toFixed(fixed) + unit;
      }

      if (value - currentValue < 0.001) {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <p ref={paragraphRef} className={className}>
      0{unit}
    </p>
  );
};

export default Counter;
