import { HeroHeader } from "./HeroHeader";
import { Globe } from "./Globe";

export const Hero = () => {
  return (
    <div className="w-screen h-screen flex items-center ml-[5%]">
      <div>
        <HeroHeader />
      </div>
      <div className="flex flex-col justify-center items-center">
        <Globe />
        <p className="text-gray-600 font-bold tracking-widest">Obróć ziemię</p>
      </div>
    </div>
  );
};
