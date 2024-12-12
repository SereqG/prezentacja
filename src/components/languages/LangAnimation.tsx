"use client";

import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { SlideJavascript } from "./slides/SlideJavascript";
import { SlidePython } from "./slides/SlidePython";
import { SlideCPP } from "./slides/SlideCPP";
import { SlideJava } from "./slides/SlideJava";
import { SlidePhp } from "./slides/SlidePhp";
import { SlideRust } from "./slides/SlideRust";
import { ModalComponent } from "./Modal";

export const LangAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isModalOpened, setIsModalOpened] = useState(false);

  const onCloseModal = () => {
    setIsModalOpened(false);
  };

  const items = [
    <SlideJavascript setIsModalOpened={setIsModalOpened} />,
    <SlidePython setIsModalOpened={setIsModalOpened} />,
    <div className="h-full bg-green-500 flex items-center justify-center text-white">
      <SlideCPP setIsModalOpened={setIsModalOpened} />
    </div>,
    <SlideJava setIsModalOpened={setIsModalOpened} />,
    <SlidePhp setIsModalOpened={setIsModalOpened} />,
    <SlideRust setIsModalOpened={setIsModalOpened} />,
  ];
  // Function to go to the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  // Function to go to the previous slide
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  // Automatically change slides every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000); // 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <>
      <div className="relative w-full overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 h-80"
              style={{ width: "100%" }}
            >
              {item}
            </div>
          ))}
        </div>
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 border border-white text-white p-2 rounded-full hover:bg-white hover:bg-opacity-35 focus:outline-none duration-300"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 border border-white text-white p-2 rounded-full hover:bg-white hover:bg-opacity-35 focus:outline-none duration-300"
        >
          <FaArrowRight />
        </button>
      </div>
      <ModalComponent
        onCloseModal={onCloseModal}
        isOpen={isModalOpened}
        currentIndex={currentIndex}
      />
    </>
  );
};
