'use client'
import React from 'react'
import Link from 'next/link';
import { FaMosque } from "react-icons/fa6";

import { TogglerContext } from '../../context/togContext';

import { useContext } from 'react';

import { sunnahLinks , navLinks } from '@/app/constants/constants';



export default function NavMobile() {

    const {showNav ,setShowNav}= useContext(TogglerContext);

    
      const handleClick = () => {
        setShowNav(false)
      }
  return (
   <div

   className="md:hidden p-5 absolute top-0 bottom-0  transition-all  duration-500 ease-in-out  right-0 left-0 bg-white dark:bg-dark z-[1000]"
   style={{ transform: showNav ? "translateX(0)" : "translateX(-100%)" , minHeight : '100%' }}
 >
  <div className="container mx-auto">
  <button
     className=" bg-green-500 hover:bg-green-700 transition-all duration-300 text-white dark:text-darkGray w-8 h-8 rounded-full cursor-pointer  font-bold absolute right-4"
     onClick={() => setShowNav(false)}
   >
    X
   </button>
   <div className="flex items-center gap-2 mt-5">
     <Link href="/" className="">
       <FaMosque size={24}className='text-green-500' />
     </Link>
     <h1 className="text-xl font-bold text-green-500">Salitify</h1>
   </div>
   <nav>
     <ul className="flex flex-col ">
       {navLinks.map((link) => {
         return (
           <li
             className="py-3 ml-8 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
             key={link.name}
           >
             <Link onClick={handleClick} href={link.href}>{link.name}</Link>
           </li>
         );
       })}
     </ul>
   </nav>

   <hr className="my-5" />

   <div className="flex items-center gap-2 py-3">
     <h1 className="text-xl font-bold ml-8  text-green-500 ">Sunnah</h1>
   </div>
   <nav>
     <ul className="flex flex-col ">
       {sunnahLinks.map((link) => {
         return (
           <li
             className="py-3 ml-8 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
             key={link.name}
           >
             <Link onClick={handleClick} href={link.link}>{link.name}</Link>
           </li>
         );
       })}
     </ul>
   </nav>
  </div>
 </div>
  )
}
