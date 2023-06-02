import { useEffect, useRef, useState } from "react";

import { twMerge } from "tailwind-merge";

const getPopoverOrigin = (top, right) => {
  if (top > 0) {
    if (right > 0) {
      return "origin-top-right";
    }
    return "origin-top-left";
  } else {
    if (right > 0) {
      return "origin-bottom-right";
    }
    return "origin-bottom-left";
  }
};

const Popover = ({ target, open = false, onClose, children, className }) => {
  const [position, setPosition] = useState({
    right: 0,
    top: 0,
  });
  const popoverRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.addEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (open) {
      calculatePopoverPosition();
    }
  }, [open]);

  const calculatePopoverPosition = () => {
    if (!target.current || !popoverRef.current) return;

    const targetRect = target.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    let right;
    let top;

    // Calculate the right position
    if (targetRect.left - popoverRef.current.offsetWidth > 0) {
      right = targetRect.width / 2;
    } else {
      right = -(popoverRef.current.offsetWidth - targetRect.width);
    }

    // Calculate the top position
    if (targetRect.bottom + popoverRef.current.offsetHeight > viewportHeight) {
      top = -(popoverRef.current.offsetHeight + 5);
    } else {
      top = targetRect.height + 5;
    }

    setPosition({ right, top });
  };

  const handleOutsideClick = (e) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(e.target) &&
      target.current &&
      !target.current.contains(e.target)
    ) {
      onClose();
    }
  };

  return (
    <menu
      ref={popoverRef}
      className={twMerge(
        "absolute overflow-hidden transition-transform",
        className,
        getPopoverOrigin(position.top, position.right),
        open ? "scale-100" : "scale-0"
      )}
      style={{
        top: position.top,
        right: position.right,
      }}
    >
      {children}
    </menu>
  );
};

export default Popover;
