"use client";
import { useEffect, useRef } from "react";
export default function ThemeToggle() {
  const themeToggle = useRef() as React.MutableRefObject<HTMLImageElement>;

  const toggle = () => {
    if (localStorage.theme === "light") {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
      themeToggle.current.src = "../../assets/themes/mode-nuit.png";
      themeToggle.current.classList.add("invert");
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
      themeToggle.current.src = "../../assets/themes/soleil.png";
      themeToggle.current.classList.remove("invert");
    }
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      themeToggle.current.src = "../../assets/themes/mode-nuit.png";
      themeToggle.current.classList.add("invert");
    } else {
      document.documentElement.classList.remove("dark");
      themeToggle.current.src = "../../assets/themes/soleil.png";
      themeToggle.current.classList.remove("invert");
    }
  }, []);

  return (
    <img
      onClick={toggle}
      ref={themeToggle}
      aria-hidden='true'
      id='theme-toggle'
      className='invert right-8 translate-y-4 absolute  text-white cursor-pointer '
      src=''
      alt=''></img>
  );
}
