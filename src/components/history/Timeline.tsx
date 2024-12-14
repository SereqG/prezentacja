import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type props = {
  currentTime: number;
};

const dates = ["XIX w.", "1945", "2137"];
const timestamps = [6, 12];

const imgHrefList = [
  "/img/photos/history/AdyLovelace.jpg",
  "/img/photos/history/maszynaLiczaca.jpg",
];

export const Timeline = ({ currentTime }: props) => {
  const [date, setDate] = useState<string>();
  const [animation, setAnimation] = useState<string>("appear");
  const [nearestTimestamp, setNearestTimestamp] = useState<number>(0);

  const headerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const getDate = () => {
    if (currentTime < timestamps[0]) return dates[0];
    if (currentTime >= timestamps[0] && currentTime < timestamps[1])
      return dates[1];
    if (currentTime >= timestamps[1]) return dates[2];
  };

  useEffect(() => {
    setDate(getDate());

    if (currentTime + 1 >= timestamps[nearestTimestamp]) {
      setAnimation("disappear");
    }
    if (currentTime > timestamps[nearestTimestamp]) {
      setNearestTimestamp(nearestTimestamp + 1);
      setAnimation("appear");
    }
  }, [currentTime]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, 1000); // Opóźnienie 1 sekundy
          }
        });
      },
      { threshold: 0.1 } // Aktywacja, gdy 10% elementu jest widoczne
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    setNearestTimestamp(0);

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={headerRef}
      className={`h-full left-10 w-full absolute transition-all duration-1000  ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="h-full flex  items-center w-full">
        <div
          className="w-1 h-full left-[30px] bg-white absolute z-10"
          id="line"
        ></div>
        <div
          className={`z-20 transition-transform flex items-center w-full ${animation}`}
          id="point"
        >
          <div className="w-16 h-16 rounded-full bg-zinc-900 border-4 flex justify-center items-center text-white font-bold">
            {date}
          </div>
          <div className="w-[90%] h-full relative flex flex-col pl-7">
            <div className="w-64 h-40 bg-red-200 relative top-7 hover:scale-110 duration-300 hover:z-10 overflow-hidden">
              <Image alt="img" src={imgHrefList[0]} width={300} height={200} />
            </div>
            <div className="w-64 h-40 bg-red-500 relative left-20 bottom-7 hover:scale-110 duration-300 hover:z-10 overflow-hidden">
              <Image
                alt="img"
                src={imgHrefList[1]}
                width={500}
                height={400}
                className="w-72 h-44"
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        #point {
          position: absolute;
          top: -100%
          opacity: 1
        }
        .appear {
          animation: slide-in 1s ease forwards;
        }
        .disappear {
          animation: slide-out 1s ease forwards;
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-250%);
          }
          to {
          opacity: 1;
            transform: translateY(0%);
          }
        }
        @keyframes slide-out {
          from {
            transform: translateY(0%);
            opacity: 1
          }
          to {
            transform: translateY(300%);
            opacity: 0
          }
        }
      `}</style>
    </div>
  );
};
