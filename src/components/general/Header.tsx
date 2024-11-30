import React, { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
};

export const Header = ({ text }: Props) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={headerRef}
      className={`w-full text-center my-3 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <h2 className="font-bold text-5xl text-white">{text}</h2>
    </div>
  );
};
