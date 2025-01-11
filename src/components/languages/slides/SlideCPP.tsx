import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type props = {
  setIsModalOpened: Dispatch<SetStateAction<boolean>>;
};

export const SlideCPP = ({ setIsModalOpened }: props) => {
  return (
    <div className="bg-purple-400 w-full h-full flex flex-col items-center relative justify-between p-5">
      <div className="w-full flex justify-center items-center">
        <Image
          src={"/img/logos/cpp.png"}
          width={80}
          height={80}
          alt="js logo"
        />
      </div>
      <div className="w-3/4 text-white font-semibold text-center text-md">
        C++ to szybki i wydajny język programowania używany do tworzenia gier,
        systemów operacyjnych, aplikacji oraz oprogramowania wymagającego
        wysokiej wydajności.
      </div>
      <button
        onClick={() => setIsModalOpened(true)}
        type="button"
        className=" text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Zobacz więcej
      </button>
    </div>
  );
};
