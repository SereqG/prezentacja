import dynamic from "next/dynamic";
import { useState } from "react";
import type p5Types from "p5";

const Sketch = dynamic(() => import("react-p5"), { ssr: false });

export const Sorting = () => {
  const [array, setArray] = useState(generateArray());
  const [sorting, setSorting] = useState(false);

  function generateArray(size = 20) {
    return Array.from(
      { length: size },
      () => Math.floor(Math.random() * 100) + 1
    );
  }

  const bubbleSortStep = (arr: number[]) => {
    let swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
        break;
      }
    }
    return swapped;
  };

  const startSorting = () => {
    setSorting(true);
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const parentWidth = (canvasParentRef as HTMLElement).offsetWidth; // Get the container's width
    const canvasHeight = 370; // Fixed height or you can calculate dynamically
    p5.createCanvas(parentWidth, canvasHeight).parent(canvasParentRef);

    // Attach an event listener to resize the canvas when the window resizes
    p5.windowResized = () => {
      const newParentWidth = (canvasParentRef as HTMLElement).offsetWidth;
      p5.resizeCanvas(newParentWidth, canvasHeight);
    };
  };

  const draw = (p5: p5Types) => {
    p5.background(240);

    const barWidth = p5.width / array.length;
    for (let i = 0; i < array.length; i++) {
      const barHeight = array[i] * 3;
      const glow = p5.map(array[i], 0, 100, 50, 255);
      const ctx = p5.drawingContext;
      ctx.shadowBlur = glow / 10;
      ctx.shadowColor = `rgba(${glow}, 100, 255, 0.5)`;
      p5.fill(glow, 150, 255);
      p5.rect(
        i * barWidth + 4,
        p5.height - barHeight,
        barWidth - 10,
        barHeight,
        5
      );
      p5.rect(
        i * barWidth + 4,
        p5.height - barHeight,
        barWidth - 16,
        barHeight
      );
    }

    if (sorting) {
      const newArray = [...array];
      const swapped = bubbleSortStep(newArray);
      setArray(newArray);
      if (!swapped) setSorting(false);
    }
  };

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <div className="relative inline-flex  group">
          <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
          <button
            onClick={startSorting}
            className="relative inline-flex items-center justify-center px-8 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            disabled={sorting}
          >
            Sortuj
          </button>
        </div>
        <div className="relative inline-flex  group">
          <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#FF675E] via-[#FF44EC] to-[#44BCFF] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
          <button
            onClick={() => setArray(generateArray())}
            className="relative inline-flex items-center justify-center px-8 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-xl"
            disabled={sorting}
          >
            Wygeneruj nowe
          </button>
        </div>
      </div>
      <div className="border rounded shadow-lg mt-5">
        <Sketch setup={setup} draw={draw} />
      </div>
    </>
  );
};
