import { useEffect, useRef, useState } from "react";

import { twMerge } from "tailwind-merge";

const Popover = ({ target, open = false, onClose, children }) => {
  const [popoverStyle, setPopoverStyle] = useState({});
  const popoverRef = useRef(null);

  useEffect(() => {
    const updatePopoverPosition = () => {
      const targetRect = target.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      let right;
      let top;

      // Calculate the right position
      if (targetRect.left - popoverRect.width > 0) {
        right = 0;
      } else {
        right = -(popoverRect.width - targetRect.width);
      }

      // Calculate the top position
      if (targetRect.bottom + popoverRect.height > viewportHeight) {
        top = -(popoverRect.height + 5);
      } else {
        top = targetRect.height + 5;
      }

      setPopoverStyle({ right, top });
    };

    window.addEventListener("resize", updatePopoverPosition);
    document.addEventListener("click", onClose);
    updatePopoverPosition();

    return () => {
      window.removeEventListener("resize", updatePopoverPosition);
      document.addEventListener("click", onClose);
    };
  }, [target, open]);

  return (
    <div
      ref={popoverRef}
      className={twMerge(
        "absolute w-48 h-48 bg-white rounded-2xl shadow-md",
        open ? "block" : "hidden"
      )}
      style={{ ...popoverStyle }}
    >
      {children}
    </div>
  );
};

export default Popover;
