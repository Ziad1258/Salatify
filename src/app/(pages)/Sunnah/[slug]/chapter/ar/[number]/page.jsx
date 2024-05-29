"use client";

import { useParams  } from "next/navigation";
import React, {  useEffect, useState } from "react";
import Loading from "@/app/components/loading/loading";

export default function Page() {

 const p = useParams();

  const {slug , number } = useParams();

 
  const [data ,setData] = useState([]);
  const api = `https://hadithapi.com/public/api/hadiths?apiKey=$2y$10$WvN0O60cyNCTSxi37rFhLOiTS4fabPaMUuOGTfsGEhqRd99SowMq&bookSlug=${slug}&chapterEnglish=${number}`;
  const fetchApi = async (api) => {
    const result = await fetch(api);
    const data = await result.json();
    console.log(data.hadiths.data
    );
    setData(data.hadiths.data);
  }
  

  useEffect(() => {
      fetchApi(api);
      
  },[])


  
  return <div className="flex flex-col gap-4  items-center min-h-screen">
    <h1 className="text-center text-xl ">some of <span className="text-green-800 dark:text-green-500">{slug}</span> Hadiths </h1>
    <p className="text-center text-gray-800 dark:text-gray-400">list of 10 Hadiths</p>

    {data.length > 0 ? 
      <div className="flex flex-col items-center gap-3">
       {data.map((item ) => {
        if(item.id <= 10) {
          return (
            <div key={item.id} className=" p-4 w-full flex flex-col gap-4 rounded-md   capitalize bg-gray-50 border border-green-800 dark:bg-darkGray dark:text-gray-300 " >
               <h1 className="text-right text-gray-800 dark:text-gray-400 ">الحديث رقم : {item.id}</h1>
               <p className="text-right">{item.hadithArabic}</p>
               <p className="text-start text-gray-800 dark:text-gray-400 ">{item.englishNarrator}</p>
            </div>
          )
        }
       })}
      </div>
     : 
  
    <Loading />
    }

  </div>;
}
