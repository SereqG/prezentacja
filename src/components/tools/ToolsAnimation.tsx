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
        className="absolute w-24 h-24 bg-white rounded-full pointer-events-none opacity-50"
        style={{
          transform: `translate(${debouncedPosition.x - 48}px, ${
            debouncedPosition.y - 48
          }px)`,
          transition: "transform 0.7s ease",
        }}
      />
    </div>
  );
};
