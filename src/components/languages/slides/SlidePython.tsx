import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type props = {
  setIsModalOpened: Dispatch<SetStateAction<boolean>>;
};

export const SlidePython = ({ setIsModalOpened }: props) => {
  return (
    <div className="bg-blue-400 w-full h-full flex flex-col items-center relative justify-between p-5">
      <div className="w-full flex justify-center items-center">
        <Image
          src={"/img/logos/python.png"}
          width={80}
          height={80}
          alt="js logo"
        />
      </div>
      <div className="w-3/4 text-white font-semibold text-center">
        Python to prosty i wszechstronny język programowania. Używany jest do
        analizy danych, aplikacji, sztucznej inteligencji i automatyzacji.
      </div>
      <button
        onClick={() => setIsModalOpened(true)}
        type="button"
        className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Zobacz więcej
      </button>
    </div>
  );
};
