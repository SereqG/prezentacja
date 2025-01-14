"use client";

import { Header } from "../general/Header";
import { Script } from "@/types/script";
import { Highlighter } from "../general/Highlighter";
import Script1 from "../../../public/scripts/sucessfulCode.json";
import Script2 from "../../../public/scripts/sucessfulCode2.json";
import Script3 from "../../../public/scripts/sucessfulCode3.json";
import Script4 from "../../../public/scripts/sucessfulCode4.json";
import Script5 from "../../../public/scripts/sucessfulCode5.json";
import { SucessfulCodeAnimation } from "./SucessfulCodeAnimation";

type props = {
  currentTime: number;
  currnetSlide: number;
};

const scripts = [Script1, Script2, Script3, Script4, Script5];

const order: number = 4;

export const SucessfulCode = ({ currentTime, currnetSlide }: props) => {
  const getScript = () => {
    if (currentTime < 16.5) return scripts[0];
    if (currentTime > 16.5 && currentTime < 31.5) return scripts[1];
    if (currentTime > 31.5 && currentTime < 57.5) return scripts[2];
    if (currentTime > 57.5 && currentTime < 75.8) return scripts[3];
    if (currentTime > 75.8) return scripts[4];
  };

  if (currnetSlide === order)
    return (
      <div className="mt-10 pb-40" id="start">
        <Header text="5. Jak pisać skuteczny kod? Czyli wujek google zawsze pomoże" />
        <div className="flex justify-center py-12 items-center mt-10">
          <div className="w-1/3">
            <SucessfulCodeAnimation />
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
