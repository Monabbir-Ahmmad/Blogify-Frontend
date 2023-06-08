import { useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

const getPopoverOrigin = (targetPosition, popoverPosition, anchor) => {
  if (!targetPosition || !popoverPosition) return;

  if (anchor?.horizontal === "center" && anchor?.vertical === "center") {
    return "origin-center";
  }

  const x = targetPosition.left - popoverPosition.left;
  const y = targetPosition.top - popoverPosition.top;

  if (anchor?.horizontal === "center") {
    if (y >= 0) {
      return "origin-bottom";
    } else {
      return "origin-top";
    }
  }

  if (anchor?.vertical === "center") {
    if (x >= 0) {
      return "origin-right";
    } else {
      return "origin-left";
    }
  }

  if (x >= 0) {
    if (y >= 0) {
      return "origin-bottom-right";
    } else {
      return "origin-top-right";
    }
  } else {
    if (y >= 0) {
      return "origin-bottom-left";
    } else {
      return "origin-top-left";
    }
  }
};

const Popover = ({ target, open, onClose, children, anchor, className }) => {
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
  });
  const popoverRef = useRef();

  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("resize", onClose);
    window.addEventListener("scroll", onClose);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("resize", onClose);
      window.removeEventListener("scroll", onClose);
    };
  }, []);

  useEffect(() => {
    calculatePopoverPosition();
  }, [open]);

  const calculatePopoverPosition = () => {
    if (!open || !target.current || !popoverRef.current) return;

    const targetRect = target.current.getBoundingClientRect();

    let left = targetRect.left;
    let top = targetRect.bottom + 5;

    if (targetRect.left - popoverRef.current.offsetWidth > 0) {
      left -= popoverRef.current.offsetWidth - targetRect.width;
    }

    if (
      targetRect.bottom + popoverRef.current.offsetHeight >
      window.innerHeight
    ) {
      top -= popoverRef.current.offsetHeight + targetRect.height + 10;
    }

    if (anchor?.horizontal === "center") {
      left =
        targetRect.left +
        targetRect.width / 2 -
        popoverRef.current.offsetWidth / 2;
    }

    if (anchor?.vertical === "center") {
      top =
        targetRect.top +
        targetRect.height / 2 -
        popoverRef.current.offsetHeight / 2;
    }

    setPosition({ left, top });
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

  return createPortal(
    <menu
      ref={popoverRef}
      className={twMerge(
        "fixed z-[900] overflow-hidden transition-transform cursor-pointer",
        className,
        getPopoverOrigin(
          target?.current?.getBoundingClientRect(),
          position,
          anchor
        ),
        open ? "scale-100" : "scale-0"
      )}
      style={{ ...position }}
    >
      {children}
    </menu>,
    document.body
  );
};

export default Popover;
