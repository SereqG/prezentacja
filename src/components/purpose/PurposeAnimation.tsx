import "@/app/styles/purposeAnimation.css";

type element = {
  background: string;
};

export const PurposeAnimation = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full aspect-video gap-4">
      <Element background={"bg-gradient-to-br from-cyan-400 to-blue-700"} />
      <Element background={"bg-gradient-to-br from-purple-700 to-yellow-500"} />
      <Element background={"bg-gradient-to-br from-green-400 to-emerald-700"} />
      <Element background={"bg-gradient-to-br from-orange-700 to-yellow-300"} />
    </div>
  );
};

const Element = ({ background }: element) => {
  return (
    <div className="relative w-full aspect-video rounded-2xl text-white overflow-hidden cursor-pointer transition-all duration-700 card">
      <FrontOfCard background={background} />
      <BackOfCard background={background} />
    </div>
  );
};

function FrontOfCard({ background }: element) {
  return (
    <div
      className={`${background} absolute inset-0 w-full h-full flex justify-center items-center transition-all duration-100 delay-200 z-20 hover:opacity-0`}
    >
      FRONT OF CARD
    </div>
  );
}

function BackOfCard({ background }: element) {
  return (
    <div
      className={`${background} absolute inset-0 w-full h-full flex justify-center items-center bg-black transition-all z-10 card-back`}
    >
      BACK OF CARD
    </div>
  );
}
