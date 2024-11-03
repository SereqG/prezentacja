import { HeroHeader } from "./HeroHeader";
import { Globe } from "./Globe";

export const Hero = () => {
  return (
    <div className="w-screen h-screen flex items-center">
      <div>
        <HeroHeader />
      </div>
      <div>
        <Globe />
      </div>
    </div>
  );
};
