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
    p5.createCanvas(800, 400).parent(canvasParentRef);
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
        amplitude * p5.sin(frequency * (x - p5.frameCount * speed));
      p5.vertex(x, y);
    }
    p5.endShape();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Wave Propagation Simulation
      </h1>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Frequency</label>
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
          className="w-64"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Amplitude</label>
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
          className="w-64"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Speed</label>
        <input
          type="range"
          min="1"
          max="5"
          step="0.5"
          value={waveParams.speed}
          onChange={(e) =>
            setWaveParams((prev) => ({
              ...prev,
              speed: parseInt(e.target.value),
            }))
          }
          className="w-64"
        />
      </div>

      <div className="border rounded shadow-lg">
        <Sketch setup={setup} draw={draw} />
      </div>
    </div>
  );
};
