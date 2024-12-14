"use client";

import { Header } from "../general/Header";
import { Script } from "@/types/script";
import { Highlighter } from "../general/Highlighter";
import ScriptData from "../../../public/scripts/languages.json";
import { Timeline } from "./Timeline";

type props = {
  currentTime: number;
  currnetSlide: number;
};

const order: number = 1;

export const History = ({ currentTime, currnetSlide }: props) => {
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
              script={ScriptData as Script}
              currentTime={currentTime}
            />
          </div>
        </div>
      </div>
    );
};
