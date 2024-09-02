"use client";
import Link from "next/link";
import { sunnahLinks } from "@/app/constants/constants";
export default function Sunnah() {
  return (
    <>
      <div className="">
        <h1 className="text-center text-xl my-6">The teachings of Prophet <span className="text-green-800 dark:text-green-500">Muhammad</span> (peace be upon him) are easily accessible to you</h1>
        <div className="grid grid-cols-1 gap-6 place-items-center">
          {sunnahLinks.map((link, index) => {
            return (
              <Link className=" p-2 w-96 rounded-md text-center capitalize bg-gray-100 border border-green-800 dark:bg-darkGray dark:text-gray-300 hover:scale-105 transition-all duration-500" key={index} href={link.link}> {link.name} </Link>
            )
          })}
        </div>
      </div>
    </>
  );
}
