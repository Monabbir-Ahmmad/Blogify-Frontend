import { useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

const getPopoverOrigin = (targetPosition, popoverPosition, anchor) => {
  if (!targetPosition || !popoverPosition) return;

  const { horizontal, vertical } = anchor ?? {};

  if (horizontal === "center" && vertical === "center") {
    return "center";
  }

  const x = targetPosition.left - popoverPosition.left;
  const y = targetPosition.top - popoverPosition.top;

  let originX = x >= 0 ? "right" : "left";
  let originY = y >= 0 ? "bottom" : "top";

  if (horizontal === "center") return originY;

  if (vertical === "center") return originX;

  return `${originY} ${originX}`;
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

        open ? "scale-100" : "scale-0"
      )}
      style={{
        ...position,
        transformOrigin: getPopoverOrigin(
          target?.current?.getBoundingClientRect(),
          position,
          anchor
        ),
      }}
    >
      {children}
    </menu>,
    document.body
  );
};

export default Popover;
