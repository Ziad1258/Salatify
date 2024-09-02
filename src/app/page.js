"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { TogglerContext } from "./context/togContext";
import { IoMdMoon } from "react-icons/io";
import { IoIosSunny } from "react-icons/io";
import { LuSun } from "react-icons/lu";
import { BsSunriseFill } from "react-icons/bs";
import { BsSunsetFill } from "react-icons/bs";
import { IoPartlySunnySharp } from "react-icons/io5";

import moment, { duration } from "moment";
import Loading from "./components/loading/loading";

import axios from "axios";
import next from "next";

export default function Home() {
  const {showNav }= useContext(TogglerContext);
  const today = moment().format("DD MMMM YYYY");
  const [leftTime, setLeftTime] = useState("08:14:22");
  const [nextPrayer, setNextPray] = useState("Fajr");

  const [times, setTimes] = useState({
    Fajr: "05:22",
    Sunrise: "06:14",
    Dhuhr: "12:45",
    Asr: "16:20",
    Maghrib: "19:10",
    Isha: "21:00",
  });
  const prayers = [
    {
      name: "Fajr",
      time: times.Fajr,
      icon: <IoPartlySunnySharp />,
    },
    {
      name: "Sunrise",
      time: times.Sunrise,
      icon: <BsSunriseFill />,
    },
    {
      name: "Dhuhr",
      time: times.Dhuhr,
      icon: <IoIosSunny />,
    },
    {
      name: "Asr",
      time: times.Asr,
      icon: <LuSun />,
    },
    {
      name: "Maghrib",
      time: times.Maghrib,
      icon: <BsSunsetFill />,
    },
    {
      name: "Isha",
      time: times.Isha,
      icon: <IoMdMoon />,
    },
  ];

  const [selectedCity, setSelectedCity] = useState("Biskra");
  const [data, setData] = useState({});
  const [theCity , setTheCity] = useState("");
  const [loading, setLoading] = useState(false);
  const key = '5a4efd762100442ba018c54fa4c345f7';
    const api = "https://api.opencagedata.com/geocode/v1/json";
    const adhanApi = "https://api.aladhan.com/v1/timings";
    // const [cityInfo, setCityInfo] = useState({});
    const getCityInfo = async () => {

        try {
            const response = await axios.get(api, {
                params: {
                    q: selectedCity,
                    key,
                    limit: 1
                }
            }

            );
            const { lat, lng } = response.data.results[0].geometry;
            // setCityInfo({ lat, lng });
            if(lat && lng) getPrayerTimes(lat , lng);
            console.log(response.data);
            
        } catch (err) {
            console.log(err);
            setSelectedCity("Biskra");
            
            
        }

    }

    const getPrayerTimes = async (lat,lng) => {
      if(loading) return;
      setLoading(true);
     try {
        const response = await axios.get(adhanApi , {
            params : {
                latitude : lat,
                longitude : lng,
            }            
        });
        setTimes(response.data.data.timings);
        // console.log(response.data);
        // setData(response.data)
        setTheCity(response.data.data.meta.timezone);
        setLoading(false);
        

        
     } catch(err) {
        console.log(err.response);
       setLoading(false);
        
     }
    }


    useEffect(() => {
        getCityInfo(selectedCity);
    }, [selectedCity])
 
  const inputRef = useRef();


  const handleClick = () => {
    const city = inputRef.current.value;
    const validValue = city.match(/[a-zA-Z]/gi);
    if (validValue) {
      setSelectedCity(city);
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  

  useEffect(() => {
    const interval = setInterval(() => {
      handDiffFunc();

    }, 1000);
    return () => clearInterval(interval);
  }, [times]);

  const handDiffFunc = () => {
    const currentTime = moment();

    const momentFajrTime = moment(times.Fajr, "HH:mm:ss");
    const momentDhuhrTime = moment(times.Dhuhr, "HH:mm:ss");
    const momentAsrTime = moment(times.Asr, "HH:mm:ss");
    const momentMaghribTime = moment(times.Maghrib, "HH:mm:ss");
    const momentIshaaTime = moment(times.Isha, "HH:mm:ss");
    let nextPray = "";
    if (
      currentTime.isAfter(momentFajrTime) &&
      currentTime.isBefore(momentDhuhrTime)
    ) {
      nextPray = "Dhuhr";
    } else if (
      currentTime.isAfter(momentDhuhrTime) &&
      currentTime.isBefore(momentAsrTime)
    ) {
      nextPray = "Asr";
    } else if (
      currentTime.isAfter(momentAsrTime) &&
      currentTime.isBefore(momentMaghribTime)
    ) {
      nextPray = "Maghrib";
    } else if (
      currentTime.isAfter(momentMaghribTime) &&
      currentTime.isBefore(momentIshaaTime)
    ) {
      nextPray = "Isha";
    } else {
      nextPray = "Fajr";
    }


    setNextPray(nextPray)
    let diff;
    if (nextPray === "Fajr")  {
      const duration1 = moment("23:59:59" , "HH:mm:ss").diff(currentTime);
      const duration2 = moment(times["Fajr"] , "HH:mm:ss").diff(moment("00:00:00" , "HH:mm:ss"));
      const totalDuration = moment.duration(duration1 + duration2);
      diff = totalDuration;
    } else {
      diff = moment.duration(
        moment(times[nextPray], "HH:mm:ss").diff(currentTime)
      );
    }


    
    

    const formattedHours = diff.hours() < 10 ? "0" + diff.hours() : diff.hours();
    const formattedMinutes =
      diff.minutes() < 10 ? "0" + diff.minutes() : diff.minutes();
    const formattedSeconds =
      diff.seconds() < 10 ? "0" + diff.seconds() : diff.seconds();
    const duration =` ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    setLeftTime(duration);
   };

  return (
      <div
      className="transtion-all duration-500 "
      style={{ transform: showNav ? "translateX(-200%)" : "translateX(0)" , opacity : showNav ? "0" : "1"  , position : showNav ? "absolute" : ""  }}
    >
      <div className="flex flex-col  gap-6 text-center md:px-5 md:w-[70%]   md:mx-auto mb-6">
        <h1 className="text-2xl   font-bold">
          Empowering You with Resources for Islamic Living
        </h1>
        <p className="dark:text-gray-300 text-gray-700">
          Get accurate prayer times customized to your location so you never
          miss salah. Check the Islamic calendar for important dates.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 w-100 ">
          <input
            ref={inputRef}
            type="text"
            className="border flex-grow border-gray-300 px-2 dark:bg-darkGray dark:text-gray-300 rounded-md outline-none focus:border-green-700   py-2 transition-all duration-300"
          />
          <button
            className="bg-green-500 hover:bg-green-700 transition-all duration-300 text-white dark:text-darkGray capitalize py-2 px-4 rounded-md"
            onClick={handleClick}
          >
            search
          </button>
        </div>
        <p className="dark:text-gray-300 text-gray-700">
          Bringing you authentic resources for your Islamic lifestyle needs and
          worship.
        </p>
      </div>

      

      {
  !loading ? (
    <>
      <div className="rounded-md border border-gray-300 dark:border-gray-700 dark:bg-darkGray">
        <div className="px-4 py-8 flex flex-col md:flex-row gap-2 justify-between items-center">
          <h1 className="text-2xl capitalize">{selectedCity} Prayer times.</h1>
          <p className="dark:text-gray-300 text-gray-700">{today}</p>
        </div>
        <span className="w-full h-[1px] bg-gray-300 dark:bg-gray-700 block"></span>
        <div className="px-4 py-8 flex flex-col gap-8">
          <div className="flex flex-col gap-3 sm:flex-row justify-between items-center">
            <p>
              TimeZone:
              <span className="dark:text-gray-300 text-gray-700"> {theCity} </span>
            </p>
            <p>
              Location:
              <span className="dark:text-gray-300 text-gray-700"> {selectedCity} </span>
            </p>
          </div>
          <div className="flex sm:flex-row  gap-3 md:flex-row justify-between items-center">
          <p className="text-md text-center ">
           Next Prayer : <span className="text-green-700 dark:text-green-500"> {nextPrayer} </span>
          </p>
          <p className="text-md text-center ">
           left time : <span className="text-green-700 dark:text-green-500"> {leftTime} </span>
          </p>
         
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-5">
        {prayers.map((pray, index) => (
          <div
            key={index}
            className={`bg-white dark:bg-darkGray border-gray-300 dark:border-gray-700 p-4 border rounded-md ${
              pray.name === nextPrayer ? "border-green-500 border-2 transform shadow-xl" : ""
            }`}
          >
            <p
              className={`capitalize font-bold text-xl text-center text-green-500 ${
                nextPrayer === pray.name ? "my-3" : ""
              }`}
            >
              {pray.name === nextPrayer ? "next pray" : ""}
            </p>
            <h1 className="capitalize text-2xl font-bold">{pray.name}</h1>
            <p className="mt-3 dark:text-gray-300 text-gray-700">{pray.time}</p>
            <div className="flex justify-center p-5 text-green-500 text-3xl">
              {pray.icon}
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  )
}

      
    </div>
  );
}