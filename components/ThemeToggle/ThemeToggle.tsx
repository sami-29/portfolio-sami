"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
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
    <Image
      onClick={toggle}
      ref={themeToggle}
      aria-hidden='true'
      id='theme-toggle'
      className='absolute text-white translate-y-4 cursor-pointer invert right-8 '
      src=''
      alt=''></Image>
  );
}
