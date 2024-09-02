"use client";

import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import Link from "next/link";
import Loading from "@/app/components/loading/loading";
import { TogglerContext } from "@/app/context/togContext";

export default function Slug() {
  const { slug } = useParams();
  const api = `https://hadithapi.com/api/${slug}/chapters?apiKey=$2y$10$WvN0O60cyNCTSxi37rFhLOiTS4fabPaMUuOGTfsGEhqRd99SowMq`;

  const [data, setData] = useState([]);
  const fetchApi = async (api) => {
    try {
      const response = await fetch(api);
      const data = await response.json();
      setData(data.chapters);
    } catch (err) {
      console.log(err, "error");
    }
  };
  useEffect(() => {
    fetchApi(api);
  }, [api]);

  return (
    <>
      <div className="flex flex-col mb-4 items-center gap-3">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 capitalize">
          <span className="text-green-800 dark:text-green-500">{slug} </span>{" "}
          book
        </h1>
        <p>list of {data.length} chpters</p>
      </div>
      {data.length > 0 ? (
        <div className="overflow-x-scroll md:overflow-hidden shadow-lg border-2 dark:border-green-500 border-green-800  rounded-md ">
          <table
            className="  block p-4 w-[800px] table-auto   md:w-full text-left bg-gray-100  dark:bg-darkGray dark:text-gray-300
    
      rounded-sm"
          >
            <thead className="block  ">
              <tr className="grid grid-cols-6 border-b pb-2 border-gray-300 dark:border-gray-700 ">
                <th className="col-span-1">#</th>
                <th className="text-left col-span-3">English </th>
                <th className="text-end col-span-2">Arabic</th>
              </tr>
            </thead>

            <tbody className="block p-1">
              {data.map((book, index) => {
                return (
                  <tr
                    key={book.id}
                    className={`${data.indexOf(book) + 1 === data.length
                      ? "pt-2"
                      : "py-2 border-b"
                      } grid grid-cols-6 items-center w-full  border-gray-300 dark:border-gray-700 `}
                  >
                    <td className="col-span-1">{index + 1} </td>

                    <td className="text-left col-span-3">
                      <p>
                        <Link
                          href={`/Sunnah/${slug}/chapter/en/${index + 1}`}
                          className="bg-gray-200 dark:bg-[#4a8b930e] py-1 px-2 rounded-md border-x border-gray-700 dark:border-gray-400"
                        >
                          {book.chapterEnglish}
                        </Link>
                      </p>
                    </td>

                    <td className="text-end col-span-2">
                      <p>
                        <Link
                          href={`/Sunnah/${slug}/chapter/ar/${index + 1}`}
                          className="bg-gray-200 dark:bg-[#4a8b930e] py-1 px-2 rounded-md border-x border-gray-700 dark:border-gray-400"
                        >
                          {book.chapterArabic}
                        </Link>
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
