import { useEffect, useRef, useState } from "react";

import { twMerge } from "tailwind-merge";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const [isChildVisible, setIsChildVisible] = useState(false);

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

  useEffect(() => {
    if (isOpen) {
      setIsChildVisible(true);
    } else {
      setTimeout(() => {
        setIsChildVisible(false);
      }, 200);
    }
  }, [isOpen]);

  return createPortal(
    <div
      className={twMerge(
        "fixed inset-0 flex items-center justify-center z-[999] transition-opacity bg-black bg-opacity-25",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={handleClickOutside}
    >
      <div
        role="dialog"
        aria-modal="true"
        ref={modalRef}
        className={twMerge(
          "transition-transform",
          isOpen ? "scale-100" : "scale-0"
        )}
      >
        {isChildVisible && children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
