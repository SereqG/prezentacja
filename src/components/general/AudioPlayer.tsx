import "@/app/styles/audioPlayer.css";

import { Howl } from "howler";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";

const tracks: string[] = [
  "audio/languages.mp3",
  "audio/history.mp3",
  "audio/usecases.mp3",
  "audio/tools.mp3",
  "audio/sucessfulCode.mp3",
];

interface AudioPlayerProps {
  onTimeUpdate: (time: number) => void;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
  currentSlide: number;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  onTimeUpdate,
  setCurrentSlide,
  currentSlide,
}) => {
  const [audio, setAudio] = useState<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Aktualizacja audio przy zmianie currentAudio
  useEffect(() => {
    if (audio) {
      audio.stop(); // Zatrzymanie aktualnej ścieżki
      audio.unload(); // Zwolnienie zasobów
    }

    const newSound = new Howl({
      src: [tracks[currentSlide]],
      html5: true,
    });
    setAudio(newSound);

    return () => {
      newSound.unload();
      setIsPlaying(false); // Czyszczenie audio po zmianie
    };
  }, [currentSlide]);

  // Aktualizacja czasu odtwarzania
  useEffect(() => {
    if (audio) {
      const interval = setInterval(() => {
        const currentTime = audio.seek() as number;
        onTimeUpdate(currentTime);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [audio, onTimeUpdate]);

  // Obsługa odtwarzania i pauzowania
  const handlePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 items-center right-8 flex px-6 py-1 border-green-400 border text-white font-bold rounded-full overflow-hidden focus:outline-none">
      <button
        onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
        disabled={currentSlide === 0}
        className={`${
          currentSlide === 0 && "opacity-20"
        } p-3 rounded-full hover:bg-green-400 flex justify-center items-center hover:bg-opacity-5`}
      >
        <FaStepBackward />
      </button>
      <button
        onClick={handlePlayPause}
        className="p-3 rounded-full hover:bg-green-400 flex justify-center items-center hover:bg-opacity-5"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <button
        onClick={() =>
          setCurrentSlide(Math.min(tracks.length - 1, currentSlide + 1))
        }
        disabled={currentSlide === tracks.length - 1}
        className={`${
          currentSlide === tracks.length - 1 && "opacity-20"
        } p-3 rounded-full hover:bg-green-400 flex justify-center items-center hover:bg-opacity-5`}
      >
        <FaStepForward />
      </button>
    </div>
  );
};
