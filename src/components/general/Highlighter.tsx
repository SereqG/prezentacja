import React from "react";
import styles from "@/app/styles/highlighters.module.css";
import { Script } from "@/types/script";

interface HighlighterProps {
  script: Script;
  currentTime: number;
}

export const Highlighter: React.FC<HighlighterProps> = ({
  script,
  currentTime,
}) => {
  return (
    <div className="text-xl max-h-96 overflow-hidden flex items-end">
      <div>
        {script.map((item, index) => (
          <span
            key={index}
            className={`${styles.text} ${
              currentTime >= item.time ? styles.fadeIn : ""
            }`}
          >
            {item.text}{" "}
          </span>
        ))}
      </div>
    </div>
  );
};
