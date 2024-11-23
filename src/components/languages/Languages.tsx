"use client";

import { useEffect, useRef, useState } from "react";
import { Header } from "../general/Header";
import { AudioPlayer } from "../general/AudioPlayer";
import { Script } from "@/types/script";
import { Highlighter } from "../general/Highlighter";
import ScriptData from "../../../public/scripts/languages.json";

export const Languages = () => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isAudioVisible, setIsAudioVisible] = useState<boolean>(false);
  const audioRef = useRef<HTMLDivElement>(null); // Referencja do elementu audio

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAudioVisible(entry.isIntersecting); // Zaktualizuj widoczność audio
      },
      { threshold: 0.5 } // Audio uruchomi się, gdy 50% elementu jest widoczne
    );

    if (audioRef.current) {
      observer.observe(audioRef.current);
    }

    return () => {
      if (audioRef.current) {
        observer.unobserve(audioRef.current);
      }
    };
  }, []);

  return (
    <div className="mt-10" id="start" ref={audioRef}>
      <Header text="1. Najpopularniejsze języki programowania" />
      <div className="flex mt-10 justify-center py-32 items-center">
        <div className="w-1/3"></div>
        <div className="w-1/3 px-20 space-y-10">
          <Highlighter
            script={ScriptData as Script}
            currentTime={currentTime}
          />
          <AudioPlayer
            onTimeUpdate={handleTimeUpdate}
            isVisible={isAudioVisible}
          />
        </div>
      </div>
    </div>
  );
};
