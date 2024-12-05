import React from "react";

const Circle = ({
  percentage = 75,
  size = 50, // Default size (can be small)
  color = "blue",
  backgroundColor = "lightgray",
  showLabel = true,
  text
}) => {
  const strokeWidth = size * 0.11; // Scale stroke width based on size
  const radius = (size - strokeWidth) / 2; // Adjust radius to fit within the SVG
  const circumference = 2 * Math.PI * radius; // Calculate circumference
  const offset = circumference - (percentage / 100) * circumference; // Offset for fill percentage

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle (tire shape) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Filled percentage */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // Start from the top
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      {/* Label */}
      {showLabel && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: size * 0.4, // Scale font size proportionally
            fontWeight: "bold",
            color: "#343434",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Circle;
