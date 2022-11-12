"use client";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [currpage, setCurrentPage] = useState("/");
  const hamburgerRef = useRef() as MutableRefObject<HTMLButtonElement>;
  const menu = useRef() as MutableRefObject<HTMLDivElement>;
  const toggleMenu = () => {
    if (menu.current.classList.contains("hidden")) {
      menu.current.classList.remove("hidden");
    } else {
      menu.current.classList.add("hidden");
    }
  };

  useEffect(() => {
    setCurrentPage(window.location.href.replace(window.location.origin, ""));
  }, []);

  const currpageStyle =
    "block py-2 pr-4 pl-3 font-bold  bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 text-white";

  const otherpageStyle =
    " block py-2 pr-4 pl-3  rounded md:border-0 md:hover:text-blue-700 md:p-0 text-black dark:text-gray-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent";

  return (
    <nav className='px-2 sm:px-4 py-2.5  dark:bg-gray-900 border-b-2 border-gray-800'>
      <div className='container flex flex-wrap justify-between items-center mx-auto'>
        <Link
          href='../'
          onClick={() =>
            setTimeout(() => {
              setCurrentPage(
                window.location.href.replace(window.location.origin, "")
              );
            }, 100)
          }
          className='flex items-center'>
          <span className='self-center text-xl font-semibold whitespace-nowrap text-black dark:text-white'>
            Sami
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          ref={hamburgerRef}
          data-collapse-toggle='navbar-default'
          type='button'
          className='inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden  focus:outline-none focus:ring-2  text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='navbar-default'
          aria-expanded='false'>
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-6 h-6 fill-black dark:fill-gray-400'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'></path>
          </svg>
        </button>
        <div
          ref={menu}
          className='hidden w-full md:block md:w-auto'
          id='navbar-default'>
          <ul className='flex flex-col p-4 mt-4  rounded-lg border  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-900 border-gray-200 dark:border-gray-700'>
            <li>
              <Link
                href='./'
                onClick={() =>
                  setTimeout(() => {
                    setCurrentPage(
                      window.location.href.replace(window.location.origin, "")
                    );
                  }, 100)
                }
                className={currpage === "/" ? currpageStyle : otherpageStyle}
                aria-current='page'>
                Home
              </Link>
            </li>
            <li>
              <Link
                href='about/'
                onClick={() =>
                  setTimeout(() => {
                    setCurrentPage(
                      window.location.href.replace(window.location.origin, "")
                    );
                  }, 100)
                }
                className={
                  currpage === "/about" ? currpageStyle : otherpageStyle
                }>
                About
              </Link>
            </li>
            <li>
              <Link
                href='services/'
                onClick={() =>
                  setTimeout(() => {
                    setCurrentPage(
                      window.location.href.replace(window.location.origin, "")
                    );
                  }, 100)
                }
                className={
                  currpage === "/services" ? currpageStyle : otherpageStyle
                }>
                Services
              </Link>
            </li>
            <li>
              <Link
                href='projects/'
                onClick={() =>
                  setTimeout(() => {
                    setCurrentPage(
                      window.location.href.replace(window.location.origin, "")
                    );
                  }, 100)
                }
                className={
                  currpage === "/projects" ? currpageStyle : otherpageStyle
                }>
                Projects
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
