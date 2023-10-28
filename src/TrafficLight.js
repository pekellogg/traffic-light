import { useState, useEffect } from "react";

function Light({ backgroundColor }) {
  return (
    <div
      aria-hidden={true}
      className="light"
      style={{ backgroundColor }}
    />
  );
}

export default function TrafficLight({
  config,
  defaultColor = "red",
  layout = "vertical",
}) {
  const [activeColor, setActiveColor] = useState(defaultColor);

  useEffect(() => {
    const { duration, next } = config[activeColor];

    const timerId = setTimeout(() => {
      setActiveColor(next);
    }, duration);

    return () => {
      clearTimeout(timerId);
    };
  }, [activeColor, config]);

  return (
    <div
      aria-live="polite"
      aria-label={`Current light: ${activeColor}`}
      className={[
        "light-container",
        layout === "vertical" && "light-container--vertical",
      ]
        .filter(Boolean)
        .join(" ")}>
      {Object.keys(config).map((color) => (
        <Light
          key={color}
          backgroundColor={
            color === activeColor ? config[color].backgroundColor : undefined
          }
        />
      ))}
    </div>
  );
}
