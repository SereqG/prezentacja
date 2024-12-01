import { Header } from "../general/Header";
import { Script } from "@/types/script";
import ScriptData from "../../../public/scripts/languages.json";
import { Highlighter } from "../general/Highlighter";
import { LangAnimation } from "../languages/LangAnimation";

type props = {
  currentTime: number;
  currnetSlide: number;
};

const order: number = 1;

export const Slide2 = ({ currentTime, currnetSlide }: props) => {
  if (currnetSlide === order)
    return (
      <div className="mt-10">
        <Header text="2. Co niesie za sobą programowanie?" />
        <div className="flex justify-center py-12 items-center">
          <div className="w-1/3 px-20 space-y-10">
            {currentTime > 0 && (
              <Highlighter
                script={ScriptData as Script}
                currentTime={currentTime}
              />
            )}
          </div>
          <div className="w-1/3">
            <LangAnimation />
          </div>
        </div>
      </div>
    );
};
