"use client";

import { Modal } from "rsuite";
import langages from "../../../public/JSON/languageModalTexts.json";
import { useMemo } from "react";
import { CodeSnippet } from "../codeSnippets/CodeSnippet";

type props = {
  currentIndex: number;
  isOpen: boolean;
  onCloseModal: () => void;
};

export const ModalComponent = ({
  isOpen,
  onCloseModal,
  currentIndex,
}: props) => {
  const index = useMemo(() => currentIndex, [isOpen]);
  const language = langages.languages[index];

  return (
    <Modal open={isOpen} onClose={onCloseModal}>
      <Modal.Header>
        <Modal.Title>
          <p className="font-bold">{language.title}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{language.text}</p>
        <CodeSnippet index={index} />
      </Modal.Body>
    </Modal>
  );
};
