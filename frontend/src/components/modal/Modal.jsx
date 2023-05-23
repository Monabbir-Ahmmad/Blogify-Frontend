import { useEffect, useRef } from "react";

import { Transition } from "@headlessui/react";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Transition
      show={isOpen}
      as="div"
      className="fixed inset-0 flex items-center justify-center z-10"
      enter="ease duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-25"
        onClick={handleClickOutside}
      />
      <div role="dialog" aria-modal="true" ref={modalRef}>
        {children}
      </div>
    </Transition>
  );
};

export default Modal;
