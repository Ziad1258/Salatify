"use client";
import React, { useEffect, useState } from "react";

export default function AllahNames() {
  const api = "https://api.aladhan.com/v1/asmaAlHusna";
  const [data, setData] = useState([]);
  const fetchApi = async (api) => {
    try {
      const response = await fetch(api);
      const data = await response.json();
      setData(data.data);
      console.log(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchApi(api);
  }, []);
  return (
  <>
 <div className="flex flex-col mb-4 items-center gap-3">
  <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 capitalize">
    <span className="text-green-800 dark:text-green-500">Allah</span> Names
  </h1>
  <p>list of 99 names</p>
  </div>
    <div className="overflow-x-scroll md:overflow-hidden shadow-lg border-2 dark:border-green-500 border-green-800  rounded-md ">
      <table
        className="  block p-4 w-[700px] table-auto   md:w-full text-left bg-gray-100  dark:bg-darkGray dark:text-gray-300
      
        rounded-sm"
      >
        <thead className="block  ">
          <tr className="grid grid-cols-4  ">
            <th>#</th>
            <th className="text-left">English Name</th>
            <th className="text-center">Explication</th>
            <th className="text-end">Arabic Name</th>
          </tr>
        </thead>

        <tbody className="block p-1">
          {data.map((object) => {
            return (
              <tr key={object.number} className={`${object.number === 99 ? "pt-2" : "py-2 border-b"} grid grid-cols-4 items-center   border-gray-300 dark:border-gray-700 `}>
                <td>{object.number} </td>
                <td className="text-left">{object.transliteration}</td>
                <td className="text-center">{object.en.meaning}</td>
                <td className="text-end">{object.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
  );
}
