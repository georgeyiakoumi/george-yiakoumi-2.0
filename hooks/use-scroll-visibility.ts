import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { createElement, type ReactNode } from "react";

const ScrollVisibilityContext = createContext<boolean>(true);

export function ScrollVisibilityProvider({ children, idleDelay = 150 }: { children: ReactNode; idleDelay?: number }) {
  const [visible, setVisible] = useState(true);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = useCallback(() => {
    setVisible(false);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, idleDelay);
  }, [idleDelay]);

  useEffect(() => {
    const scrollContainer = document.querySelector("main");
    if (!scrollContainer) return;

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [handleScroll]);

  return createElement(ScrollVisibilityContext.Provider, { value: visible }, children);
}

export function useScrollVisibility() {
  return useContext(ScrollVisibilityContext);
}
