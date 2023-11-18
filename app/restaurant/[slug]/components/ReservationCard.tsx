"use client";

import { useState } from "react";
import Link from 'next/link';
import DatePicker from "react-datepicker";
import useAvailabilities from "../../../../hooks/useAvailabilities";
import { partySize as partySizes, times } from "../../../../data";
import { CircularProgress } from "@mui/material";
import { convertToDisplayTime } from "../../../../utils/convertToDisplayTime";

const getDayFromDate = (date: Date | null): string => {
  if (date) {
    return date.toISOString().split("T")[0];
  } else {
    return "";
  }
}

export default function ReservationCard({
  openTime, 
  closeTime,
  slug,
}: {
  openTime: string,
  closeTime: string,
  slug: string,
}) {
  const { loading, data, error, fetchAvailabilities } = useAvailabilities();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<string>(openTime);
  const [partySize, setPartySize] = useState<string>("0");
  const [day, setDay ] = useState<string>(getDayFromDate(new Date()));

  const handleChangeDate = (date: Date | null) => {
    const day = getDayFromDate(date);

    setDay(day);
    setSelectedDate(date);
  }

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      partySize, 
      day, 
      time,
    });
  }

  const filterTimeByRestaurantOpenWindow = (): typeof times => {
    const timesInWindow: typeof times = [];

    let isWithinWindow = false;

    times.forEach(time => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }

      if (isWithinWindow) {
        timesInWindow.push(time)
      }

      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });

    return timesInWindow;
  }

  return (
    <div className='fixed w-[15%] bg-white rounded p-3 shadow'>
      <div className='text-center border-b pb-2 font-bold'>
        <h4 className='mr-7 text-lg'>Make a reservation</h4>
      </div>
      <div className='my-3 flex-col'>
        <label htmlFor='partySize'>Party size2</label>
        <select 
          id='partySize' 
          className='py-3 border-b font-light' 
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
        >
          {partySizes.map(size => (
            <option key={size.value} value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>
      <div className='flex justify-between'>
        <div className='flex flex-col w-[48%]'>
          <label htmlFor='reservationDate'>Date</label>
          <DatePicker 
            id="reservationDate"
            className="py-3 border-b font-light text-reg w-24"
            dateFormat={"MMMM d"}
            wrapperClassName="w-[48%]"
            selected={selectedDate} 
            onChange={handleChangeDate}
          />
        </div>
        <div className='flex flex-col w-[48%]'>
          <label htmlFor='reservationTime'>Time</label>
          <select 
            id='reservationTime' 
            className='py-3 border-b font-light'
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {filterTimeByRestaurantOpenWindow().map(time =>(
              <option key={time.time} value={time.time}>{time.displayTime}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='mt-5 '>
        <button
          className='bg-red-600 rounded w-full text-white font-bold h-16'
          onClick={handleClick}
          disabled={loading}
        >
          { loading ? <CircularProgress color="inherit" /> : "Find a Time"}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="text-reg">Select a Time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((time) => {
              return time.available ? (
                <Link 
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                  className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 mr-3"
                > 
                  <p className="text-sm font-bold">
                    {convertToDisplayTime(time.time)}
                  </p>
                </Link>
              ) : (
                <p className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3">
                </p>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
