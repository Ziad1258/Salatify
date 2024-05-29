"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function ThemeSwitch() {
  const [dark, setDark] = useState(false);
  const [mood , setMood] = useState(false);
  const moods = [{
    name : 'light',
    value : false
  } , {
    name : "dark",
    value : true
  },
  {
    name : 'systeme',
    value : false
  }
]
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    theme === "dark" ? setDark(true) : setDark(false);
  }, []);

  useEffect(() => {
    if (dark) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const toggleMood = (mood) => {
    setMood(false);
   setDark(mood);

  }
  return (

    
    <div className=" relative dark:text-gray-200 cursor-pointer transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md text-md">
      {dark && <FiMoon onClick={() => setMood(!mood)} />}
      {!dark && <FiSun onClick={() => setMood(!mood)} />}
      <div className="bg-white dark:bg-dark transition-all duration-300 absolute top-[100%] right-0 w-[120px] p-2 border border-gray-300 dark:border-gray-600 rounded-md mt-1"  style={{scale : mood ? "1" : "0"}}>
        <ul>
          {moods.map((Mood , index) => {
            return (
              <li key={index} className=" hover:bg-gray-100 dark:hover:bg-gray-800 capitalize p-1 cursor-pointer rounded-md " onClick={() => toggleMood(Mood.value)} >
                {Mood.name}
              </li>
            )
          })}
        </ul>


      </div>
    </div>
  );
}
