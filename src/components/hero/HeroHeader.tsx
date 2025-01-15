"use client";

import "@/app/styles/heroHeader.css";

import { useEffect, useState } from "react";

//variables
const targetText = "HELLO_WORLD";

export const HeroHeader = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (currentIndex < targetText.length) {
      const randomChar = () =>
        String.fromCharCode(33 + Math.floor(Math.random() * 94));

      const glitchEffect = () => {
        setDisplayText(
          (prev) =>
            prev.slice(0, currentIndex) +
            randomChar() +
            prev.slice(currentIndex + 1)
        );
      };

      const interval = setInterval(glitchEffect, 50);

      timeout = setTimeout(() => {
        clearInterval(interval);
        setDisplayText(
          (prev) =>
            prev.slice(0, currentIndex) +
            targetText[currentIndex] +
            prev.slice(currentIndex + 1)
        );
        setCurrentIndex((prev) => prev + 1);
      }, 300);
    }
    return () => clearTimeout(timeout);
  }, [currentIndex, targetText]);

  return (
    <div className="hello-world">
      <span>{displayText}</span>
      <p className="paragraph">
        Języki programowania i środowisko programistyczne
      </p>
      <a className="startBtn" href="#start">
        Rozpocznij prezentację
      </a>
    </div>
  );
};
