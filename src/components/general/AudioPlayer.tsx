import { Howl } from "howler";
import React, { useEffect, useState } from "react";

interface AudioPlayerProps {
  onTimeUpdate: (time: number) => void;
  isVisible: boolean; // Nowy props do sterowania widocznością
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  onTimeUpdate,
  isVisible,
}) => {
  const [audio, setAudio] = useState<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const sound = new Howl({
      src: ["audio/languages.mp3"],
      html5: true,
    });
    setAudio(sound);

    return () => sound.unload();
  }, []);

  useEffect(() => {
    if (audio) {
      const interval = setInterval(() => {
        const currentTime = audio.seek() as number;
        onTimeUpdate(currentTime);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [audio, onTimeUpdate]);

  // Automatyczne odtwarzanie na podstawie widoczności
  useEffect(() => {
    if (audio) {
      if (isVisible && !isPlaying) {
        audio.play();
        setIsPlaying(true);
      } else if (!isVisible && isPlaying) {
        audio.pause();
        setIsPlaying(false);
      }
    }
  }, [isVisible, audio, isPlaying]);

  return (
    <div>
      <button onClick={() => (isPlaying ? audio?.pause() : audio?.play())}>
        {isPlaying ? "Pauza" : "Odtwórz"}
      </button>
    </div>
  );
};
