"use client";

import { Header } from "../general/Header";
import { Script } from "@/types/script";
import { Highlighter } from "../general/Highlighter";
import Script1 from "../../../public/scripts/tools.json";
import Script2 from "../../../public/scripts/tools2.json";
import Script3 from "../../../public/scripts/tools3.json";
import Script4 from "../../../public/scripts/tools4.json";
import { ToolsAnimation } from "./ToolsAnimation";

type props = {
  currentTime: number;
  currnetSlide: number;
};

const scripts = [Script1, Script2, Script3, Script4];

const order: number = 3;

export const Tools = ({ currentTime, currnetSlide }: props) => {
  console.log(currentTime);
  const getScript = () => {
    if (currentTime < 26) return scripts[0];
    if (currentTime > 26 && currentTime < 55) return scripts[1];
    if (currentTime > 55 && currentTime < 89) return scripts[2];
    if (currentTime > 89) return scripts[3];
  };

  if (currnetSlide === order)
    return (
      <div className="mt-10 pb-40" id="start">
        <Header text="4. Czego programista używa w codziennej pracy?" />
        <div className="flex justify-center py-12 items-center h-96 mt-10">
          <div className="w-1/3 h-full">
            <ToolsAnimation />
          </div>
          <div className="w-1/3 px-20 space-y-10">
            <Highlighter
              script={getScript() as Script}
              currentTime={currentTime}
            />
          </div>
        </div>
      </div>
    );
};
