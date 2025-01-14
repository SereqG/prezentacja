import React, { useState, useEffect } from "react";

export const ToolsAnimation = () => {
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [debouncedPosition, setDebouncedPosition] = useState(circlePosition);

  useEffect(() => {
    setDebouncedPosition(circlePosition);
  }, [circlePosition]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCirclePosition({ x, y });
  };

  return (
    <div
      className="w-full h-full rounded-2xl bg-[url('/img/other/space.png')] bg-cover flex relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Dark mask with shining effect */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60 pointer-events-none"
        style={{
          background: hovering
            ? `radial-gradient(circle ${48 * 2}px at ${debouncedPosition.x}px ${
                debouncedPosition.y
              }px, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.6) 100%)`
            : "rgba(0, 0, 0, 0.6)",
          transition: "background 0.3s ease",
        }}
      />

      {/* Circle following the cursor */}
      <div
        className="absolute w-36 h-36 bg-gradient-radial from-white to-transparent rounded-full pointer-events-none"
        style={{
          transition: "transform 0.7s ease",
        }}
      />

      {/* Fish image with glow effect */}
      <img
        src="/img/other/fish.png" // Replace this with your fish image path
        alt="Fish"
        className="absolute pointer-events-none"
        style={{
          width: "96px",
          transform: `translate(${debouncedPosition.x}px, ${
            debouncedPosition.y - 20
          }px)`,
          transition: "transform 0.7s ease",
          filter: hovering
            ? "drop-shadow(0 0 20px rgba(255, 183, 255, 0.8))"
            : "none",
        }}
      />
    </div>
  );
};
