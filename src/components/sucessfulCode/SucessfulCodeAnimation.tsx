import { useState } from "react";
import { Sorting } from "./logics/Sorting";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Network } from "./logics/Network";
import { Traffic } from "./logics/Traffic";

export const SucessfulCodeAnimation = () => {
  const [currentLogic, setCurrentLogic] = useState<number>(0);

  const renderLogic = () => {
    switch (currentLogic) {
      case 0:
        return (
          <div className="text-white">
            <h1 className="text-2xl font-bold">Algorytm sortowania</h1>
            <div className="bg-zinc-700 p-8 rounded-xl mt-3">
              <Sorting />
              <div className="w-full flex justify-end mt-5 space-x-5">
                <button
                  onClick={() => {
                    setCurrentLogic(currentLogic + 1);
                  }}
                  className="w-10 h-10 flex items-center border justify-center rounded-full hover:bg-zinc-600 duration-300"
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="text-white">
            <h1 className="text-2xl font-bold mb-3">Symulator fali</h1>
            <div className="bg-zinc-700 p-8 rounded-xl mt-3">
              <Network />

              <div className="w-full flex justify-between mt-5 space-x-5">
                <button
                  onClick={() => {
                    setCurrentLogic(currentLogic - 1);
                  }}
                  className="w-10 h-10 flex items-center border justify-center rounded-full hover:bg-zinc-600 duration-300"
                >
                  <IoIosArrowBack />
                </button>
                <button
                  onClick={() => {
                    setCurrentLogic(currentLogic + 1);
                  }}
                  className="w-10 h-10 flex items-center border justify-center rounded-full hover:bg-zinc-600 duration-300"
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="text-white">
            <h1 className="text-2xl font-bold mb-3">Labirynt</h1>
            <div className="bg-zinc-700 p-8 rounded-xl mt-3">
              <Traffic />

              <div className="w-full flex justify-start mt-5 space-x-5">
                <button
                  onClick={() => {
                    setCurrentLogic(currentLogic - 1);
                  }}
                  className="w-10 h-10 flex items-center border justify-center rounded-full hover:bg-zinc-600 duration-300"
                >
                  <IoIosArrowBack />
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderLogic();
};
