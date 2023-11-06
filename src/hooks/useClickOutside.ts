import { RefObject, useEffect, useRef } from "react";

export const useClickOutside = (ref: RefObject<HTMLElement>, handler: () => void) => {
  const callbackRef = useRef(handler);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callbackRef.current();
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, handler]);
};
