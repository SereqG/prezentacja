import { useState, useEffect } from "react";

const GRID_SIZE = 10; // 10x10 grid

type CellType = "empty" | "wall" | "start" | "finish";

type Cell = {
  x: number;
  y: number;
  type: CellType;
};

const createGrid = (): Cell[][] => {
  return Array.from({ length: GRID_SIZE }, (_, y) =>
    Array.from({ length: GRID_SIZE }, (_, x) => ({ x, y, type: "empty" }))
  );
};

export function Traffic() {
  const [grid, setGrid] = useState(createGrid);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [finish, setFinish] = useState<{ x: number; y: number } | null>(null);
  const [path, setPath] = useState<{ x: number; y: number }[]>([]);
  const [message, setMessage] = useState<string>();
  const [messageVisible, setMessageVisible] = useState(false);

  const handleCellClick = (cell: Cell) => {
    if (start === null) {
      setStart({ x: cell.x, y: cell.y });
      updateGrid(cell.x, cell.y, "start");
    } else if (finish === null) {
      setFinish({ x: cell.x, y: cell.y });
      updateGrid(cell.x, cell.y, "finish");
    } else {
      updateGrid(
        cell.x,
        cell.y,
        grid[cell.y][cell.x].type === "wall" ? "empty" : "wall"
      );
    }
  };

  const updateGrid = (x: number, y: number, type: CellType) => {
    setGrid((prev) => {
      const newGrid = prev.map((row) => row.map((cell) => ({ ...cell })));
      newGrid[y][x].type = type;
      return newGrid;
    });
  };

  const showMessage = (text: string) => {
    setMessage(text);
    setMessageVisible(true);

    // Hide the message after 5 seconds
    setTimeout(() => {
      setMessageVisible(false);
    }, 3000);
  };

  const findShortestPath = () => {
    if (!start || !finish) {
      showMessage("Ustaw punkt startowy i końcowy.");
      return;
    }

    const wallCount = grid.flat().filter((cell) => cell.type === "wall").length;
    if (wallCount < 5) {
      showMessage("Dodaj więcej ścian.");
      return;
    }

    const queue: { x: number; y: number; path: { x: number; y: number }[] }[] =
      [{ ...start, path: [start] }];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const { x, y, path } = queue.shift()!;

      if (x === finish.x && y === finish.y) {
        setPath(path);
        return;
      }

      visited.add(`${x},${y}`);

      const directions = [
        { x: 0, y: -1 }, // Up
        { x: 0, y: 1 }, // Down
        { x: -1, y: 0 }, // Left
        { x: 1, y: 0 }, // Right
      ];

      for (const { x: dx, y: dy } of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (
          nx >= 0 &&
          nx < GRID_SIZE &&
          ny >= 0 &&
          ny < GRID_SIZE &&
          !visited.has(`${nx},${ny}`) &&
          grid[ny][nx].type !== "wall"
        ) {
          queue.push({ x: nx, y: ny, path: [...path, { x: nx, y: ny }] });
        }
      }
    }

    showMessage("Nie znaleziono ścieżki.");
  };

  const resetGrid = () => {
    setGrid(createGrid);
    setStart(null);
    setFinish(null);
    setPath([]);
  };

  return (
    <div className="w-full flex justify-between items-center flex-col">
      <div className="mt-4 space-x-2 my-4 w-full justify-between flex">
        <div className="relative inline-flex group">
          <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
          <button
            onClick={findShortestPath}
            className="relative inline-flex items-center justify-center px-8 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Start
          </button>
        </div>
        <div className="relative inline-flex group">
          <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#FF675E] via-[#FF44EC] to-[#44BCFF] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
          <button
            onClick={resetGrid}
            className="relative inline-flex items-center justify-center px-8 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-xl"
          >
            Reset
          </button>
        </div>
      </div>
      <div
        className="grid gap-1 relative"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
      >
        {grid.flat().map((cell) => (
          <div
            key={`${cell.x},${cell.y}`}
            onClick={() => handleCellClick(cell)}
            className={`w-8 h-8 border cursor-pointer ${
              cell.type === "wall"
                ? "bg-gray-800"
                : cell.type === "start"
                ? "bg-green-500"
                : cell.type === "finish"
                ? "bg-red-500"
                : path.some((p) => p.x === cell.x && p.y === cell.y)
                ? "bg-blue-300"
                : "bg-white"
            }`}
          ></div>
        ))}
        {messageVisible && (
          <div
            className={`absolute w-full h-full bg-black bg-opacity-60 flex items-center justify-center text-white text-xl font-bold transition-opacity duration-500 ${
              messageVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
