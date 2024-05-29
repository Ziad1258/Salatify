"use client"

import React, { useContext } from 'react'
import Link from 'next/link'
import { FaHeart } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";
import { TogglerContext } from '../../context/togContext';
import { socialMediaIcons } from '@/app/constants/constants';


export default function Footer() {
    const {showNav }= useContext(TogglerContext);


  return (

    !showNav ?
    <footer className=' px-3 md:px-0 border-t border-gray-300 dark:border-gray-600 flex flex-col items-center gap-6 py-6'>
        <p className='flex flex-wrap justify-center items-center gap-2 capitalize dark:text-gray-300'>
            Created with <FaHeart className='text-red-500' /> by <Link target='_blank' href="https://www.facebook.com/Hb9Li/" className='text-green-800 dark:text-green-500 font-medium'>Ferdjani Ziad</Link> <FaRegCopyright /> 2024
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
            {socialMediaIcons.map((icon, index) => {
                return (
                    <Link href={icon.link} target="_blank" key={index} className='text-2xl'>
                        {icon.icon}
                        
                    </Link>
                )
            })}
        </div>
    </footer>
     : ""
    
  )
}
