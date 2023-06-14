import { createContext, useContext, useState } from "react";

import Modal from "../components/common/modal/Modal";

const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setIsOpen(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setIsOpen(false);
    //setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal isOpen={isOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
