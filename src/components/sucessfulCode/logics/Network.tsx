// Install react-p5 if not already installed:
// npm install react-p5

import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import react-p5 to avoid SSR issues
const Sketch = dynamic(() => import("react-p5"), { ssr: false });

export const Network = () => {
  const [waveParams, setWaveParams] = useState({
    frequency: 0.02,
    amplitude: 100,
    speed: 2,
  });

  const setup = (p5, canvasParentRef) => {
    const parentWidth = canvasParentRef.offsetWidth; // Get the container's width
    const canvasHeight = 360; // Fixed height or you can calculate dynamically
    p5.createCanvas(parentWidth, canvasHeight).parent(canvasParentRef);

    // Attach an event listener to resize the canvas when the window resizes
    p5.windowResized = () => {
      const newParentWidth = canvasParentRef.offsetWidth;
      p5.resizeCanvas(newParentWidth, canvasHeight);
    };
  };

  const draw = (p5) => {
    p5.background(30);
    p5.stroke(255);
    p5.noFill();

    const { frequency, amplitude, speed } = waveParams;

    p5.beginShape();
    for (let x = 0; x < p5.width; x++) {
      const y =
        p5.height / 2 +
        (amplitude / 3) *
          p5.sin(frequency * (x - p5.frameCount * (speed / 10)));
      p5.vertex(x, y);
    }
    p5.endShape();
  };

  return (
    <div className="w-full flex flex-col justify-between items-center text-white">
      <div className="flex justify-between w-full">
        <div className="mb-4">
          <label className="block text-white mb-2">Częstotliwość</label>
          <input
            type="range"
            min="0.01"
            max="0.1"
            step="0.001"
            value={waveParams.frequency}
            onChange={(e) =>
              setWaveParams((prev) => ({
                ...prev,
                frequency: parseFloat(e.target.value),
              }))
            }
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Amplituda</label>
          <input
            type="range"
            min="10"
            max="200"
            step="0.01"
            value={waveParams.amplitude}
            onChange={(e) =>
              setWaveParams((prev) => ({
                ...prev,
                amplitude: parseInt(e.target.value),
              }))
            }
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Prędkość</label>
          <input
            type="range"
            min="10"
            max="200"
            step="0.1"
            value={waveParams.speed}
            onChange={(e) =>
              setWaveParams((prev) => ({
                ...prev,
                speed: parseInt(e.target.value),
              }))
            }
            className="w-full"
          />
        </div>
      </div>

      <div className="border rounded shadow-lg w-full">
        <Sketch setup={setup} draw={draw} />
      </div>
    </div>
  );
};
