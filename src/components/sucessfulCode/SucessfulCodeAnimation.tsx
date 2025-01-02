import { useState } from "react";
import { Sorting } from "./logics/Sorting";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Network } from "./logics/Network";
//sorting
//pathFinding
//Neural networks
//Fluid Simulation

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
              <div className="w-full flex justify-center mt-5 space-x-5">
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
      case 1:
        return (
          <div className="bg-white p-8 rounded-xl">
            <Network />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold">Sieci neuronowe</div>
            <div className="text-xl">
              Sieci neuronowe to algorytmy, które naśladują działanie ludzkiego
              mózgu. Są one wykorzystywane do rozpoznawania obrazów, języka
              naturalnego, czy też do gier.
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold">Symulacja płynów</div>
            <div className="text-xl">
              Symulacja płynów to operacja, która pozwala na symulowanie
              zachowań płynów w czasie rzeczywistym.
            </div>
          </div>
        );
    }
  };

  return renderLogic(currentLogic);
};
