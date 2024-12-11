import Image from "next/image";

export const SlidePhp = () => {
  return (
    <div className="bg-cyan-400 w-full h-full flex flex-col items-center relative justify-between p-5">
      <div className="w-full flex justify-center items-center">
        <Image src={"/img/logos/js.png"} width={80} height={80} alt="js logo" />
      </div>
      <div className="w-3/4 text-white font-semibold text-center">
        PHP to język programowania używany głównie do tworzenia dynamicznych
        stron internetowych. Obsługuje serwery, bazy danych i generowanie treści
        na stronach WWW.
      </div>
      <button
        type="button"
        className=" text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Zobacz więcej
      </button>
    </div>
  );
};
