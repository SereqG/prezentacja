"use client";

import { AudioPlayer } from "@/components/general/AudioPlayer";
import { Hero } from "@/components/hero/Hero";
import { Languages } from "@/components/languages/Languages";
import { useState } from "react";

export default function Home() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  console.log(currentTime);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  return (
    <div className="bg-zinc-900">
      <Hero />
      <Languages currentTime={currentTime} currnetSlide={currentSlide} />

      <AudioPlayer
        onTimeUpdate={handleTimeUpdate}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
    </div>
  );
}
