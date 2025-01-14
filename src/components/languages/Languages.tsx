"use client";

import { Header } from "../general/Header";
import { Script } from "@/types/script";
import { Highlighter } from "../general/Highlighter";
import Script1 from "../../../public/scripts/languages.json";
import Script2 from "../../../public/scripts/languages2.json";
import Script3 from "../../../public/scripts/languages3.json";
import { LangAnimation } from "./LangAnimation";

type props = {
  currentTime: number;
  currnetSlide: number;
};

const scripts = [Script1, Script2, Script3];

const order: number = 0;

export const Languages = ({ currentTime, currnetSlide }: props) => {
  const getScript = () => {
    if (currentTime < 26) return scripts[0];
    if (currentTime > 26 && currentTime < 41) return scripts[1];
    if (currentTime > 41) return scripts[2];
  };

  if (currnetSlide === order)
    return (
      <div className="mt-10 pb-40" id="start">
        <Header text="1. Krótki wstęp, czyli o czym będziemy mówić?" />
        <div className="flex justify-center py-12 items-center mt-10">
          <div className="w-1/3">
            <LangAnimation />
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
