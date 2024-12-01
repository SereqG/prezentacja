"use client";

import { Header } from "../general/Header";
import { Script } from "@/types/script";
import { Highlighter } from "../general/Highlighter";
import ScriptData from "../../../public/scripts/languages.json";
import { LangAnimation } from "./LangAnimation";

type props = {
  currentTime: number;
  currnetSlide: number;
};

const order: number = 0;

export const Languages = ({ currentTime, currnetSlide }: props) => {
  if (currnetSlide === order)
    return (
      <div className="mt-10" id="start">
        <Header text="1. Najpopularniejsze języki programowania" />
        <div className="flex justify-center py-12 items-center">
          <div className="w-1/3">
            <LangAnimation />
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
