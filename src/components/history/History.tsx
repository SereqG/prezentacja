"use client";

import { Header } from "../general/Header";
import { Script } from "@/types/script";
import { Highlighter } from "../general/Highlighter";
import Script1 from "../../../public/scripts/history.json";
import Script2 from "../../../public/scripts/history2.json";
import Script3 from "../../../public/scripts/history3.json";
import { Timeline } from "./Timeline";

type props = {
  currentTime: number;
  currnetSlide: number;
};

const scripts = [Script1, Script2, Script3];

const order: number = 1;

export const History = ({ currentTime, currnetSlide }: props) => {
  const getScript = () => {
    if (currentTime < 23) return scripts[0];
    if (currentTime > 23 && currentTime < 55) return scripts[1];
    if (currentTime > 55) return scripts[2];
  };

  if (currnetSlide === order)
    return (
      <div className="mt-10" id="start">
        <Header text="2. Jak to się wszystko zaczęło?" />
        <div className="flex justify-center py-12 ">
          <div className="w-1/3 relative overflow-hidden">
            <Timeline currentTime={currentTime} />
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
