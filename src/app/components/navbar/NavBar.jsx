"use client";

import ThemeSwitch from "../../ThemeSwitch";
import { FaMosque } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";

import Link from "next/link";
import { useContext, useState } from "react";
import { TogglerContext } from "@/app/context/togContext";
import { navLinks } from "@/app/constants/constants";

export default function NavBar() {

const {showNav , setShowNav} = useContext(TogglerContext);
const [active , setActive] = useState("Prayer times");


const handleClick = () => {
  setShowNav(!showNav);
  window.scrollTo(0,0)
}
  return (
    <header className="transtion-all duration-300 border-b border-gray-300 dark:border-gray-600   py-4 fixed top-0 left-0 right-0 backdrop-blur z-10"
    style={{transform : showNav ? 'translateX(-100%)': 'translateX(0)'}}
    >
      <div className="container mx-auto px-3 sm:px-0 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="hidden md:block">
            <FaMosque size={24} />
          </Link>
          <h1 className="text-xl font-bold hidden md:block">Salitify</h1>
          <FaBookOpen
            size={24}
            className="cursor-pointer md:hidden"
            onClick={handleClick}
          />
        </div>

        <nav className="hidden md:block">
          <ul className="flex items-center">
            {navLinks.map((link) => {
              return (
                <li
                  className={`${active === link.name ? 'text-black dark:text-white' : "text-gray-600 dark:text-gray-300"} px-4 mx-4  hover:text-black  dark:hover:text-white`}
                  key={link.name}
                  onClick={() => setActive(link.name)}
                >
                  <Link href={link.href}>{link.name}</Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <ThemeSwitch />
      </div>
    </header>
  );
}
