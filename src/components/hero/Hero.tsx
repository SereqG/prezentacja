import { HeroHeader } from "./HeroHeader";
import { Globe } from "./Globe";

export const Hero = () => {
  return (
    <div className="w-screen h-screen flex xl:items-center ml-[5%] xl:flex-row flex-col mb-36">
      <div className="mb-24">
        <HeroHeader />
      </div>
      <div className="flex flex-col justify-center  xl:items-center">
        <Globe />
      </div>
    </div>
  );
};
