"use client";

import { Modal } from "rsuite";

type props = {
  text: string;
  title: string;
  code: string;
  isOpen: boolean;
  onCloseModal: () => void;
};

export const ModalComponent = ({
  text,
  title,
  code,
  isOpen,
  onCloseModal,
}: props) => {
  return (
    <Modal open={isOpen} onClose={onCloseModal}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{text}</p>
      </Modal.Body>
    </Modal>
  );
};
