import "@/app/styles/purposeAnimation.css";
import Image from "next/image";

type element = {
  background: string;
  language: string;
};

function FrontOfCard({ background, language }: element) {
  return (
    <div
      className={`${background} absolute inset-0 w-full h-full flex justify-center items-center transition-all duration-100 delay-200 z-20 hover:opacity-0`}
    >
      <Image
        src={`/img/logos/${language}.png`}
        width={80}
        height={80}
        alt="js logo"
      />
    </div>
  );
}

function BackOfCard({ background, language }: element) {
  function getContent() {
    return (
      <div>
        <h2 className="uppercase font-bold">
          {language === "cpp" ? "C++" : language}
        </h2>
        {language === "javascript" && (
          <ul>
            <li>Strony internetowe</li>
            <li>Aplikacje serwerowe</li>
            <li>Aplikacje mobilne</li>
          </ul>
        )}
        {language === "java" && (
          <ul>
            <li>Aplikacje serwerowe</li>
            <li>Aplikacje chmurowe</li>
            <li>IoT</li>
          </ul>
        )}
        {language === "cpp" && (
          <ul>
            <li>Gry</li>
            <li>Systemy operacyjne</li>
            <li>Wysoka wydajność</li>
          </ul>
        )}
        {language === "python" && (
          <ul>
            <li>Analiza danych</li>
            <li>Sztuczna inteligencja</li>
            <li>Automatyzacja</li>
          </ul>
        )}
      </div>
    );
  }

  return (
    <div
      className={`${background} absolute inset-0 w-full h-full flex justify-center items-center bg-black transition-all z-10 card-back`}
    >
      {getContent()}
    </div>
  );
}

const Element = ({ background, language }: element) => {
  return (
    <div className="relative w-full aspect-video rounded-2xl text-white overflow-hidden cursor-pointer transition-all duration-700 card">
      <FrontOfCard background={background} language={language} />
      <BackOfCard background={background} language={language} />
    </div>
  );
};

export const PurposeAnimation = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full aspect-video gap-4">
      <Element
        background={"bg-gradient-to-br from-cyan-400 to-blue-700"}
        language="javascript"
      />
      <Element
        background={"bg-gradient-to-br from-purple-700 to-yellow-500"}
        language="java"
      />
      <Element
        background={"bg-gradient-to-br from-green-400 to-emerald-700"}
        language="cpp"
      />
      <Element
        background={"bg-gradient-to-br from-orange-700 to-yellow-300"}
        language="python"
      />
    </div>
  );
};
