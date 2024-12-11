import Image from "next/image";

export const SlideJava = () => {
  return (
    <div className="bg-red-400 w-full h-full flex flex-col items-center relative justify-between p-5">
      <div className="w-full flex justify-center items-center">
        <Image
          src={"/img/logos/python.png"}
          width={80}
          height={80}
          alt="js logo"
        />
      </div>
      <div className="w-3/4 text-white font-semibold text-center">
        Java to uniwersalny język programowania, znany z przenośności. Używany
        do tworzenia aplikacji mobilnych, webowych, serwerowych oraz
        oprogramowania korporacyjnego.
      </div>
      <button
        type="button"
        className=" text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Zobacz więcej
      </button>
    </div>
  );
};
