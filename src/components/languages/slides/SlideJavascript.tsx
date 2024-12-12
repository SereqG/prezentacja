import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type props = {
  setIsModalOpened: Dispatch<SetStateAction<boolean>>;
};

export const SlideJavascript = ({ setIsModalOpened }: props) => {
  return (
    <div className="bg-yellow-400 w-full h-full flex flex-col items-center relative justify-between p-5">
      <div className="w-full flex justify-center items-center">
        <Image src={"/img/logos/js.png"} width={80} height={80} alt="js logo" />
      </div>
      <div className="w-3/4 text-white font-semibold text-center">
        JavaScript to język programowania stron internetowych, który dodaje
        interaktywność, animacje, zmienia treści i obsługuje działania
        użytkownika.
      </div>
      <button
        onClick={() => setIsModalOpened(true)}
        type="button"
        className=" text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Zobacz więcej
      </button>
    </div>
  );
};
