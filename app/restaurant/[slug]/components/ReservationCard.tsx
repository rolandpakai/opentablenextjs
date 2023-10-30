"use client";

import { useState } from "react";
import { partySize, times } from "../../../../data";
import DatePicker from "react-datepicker";

export default function ReservationCard({
  openTime, 
  closeTime
}: {
  openTime: string,
  closeTime: string,
}) {

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleChangeDate = (date: Date | null) => {
    return setSelectedDate(date);
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
        <select id='partySize' className='py-3 border-b font-light' >
          {partySize.map(size => (
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
          <select id='reservationTime' className='py-3 border-b font-light'>
            {filterTimeByRestaurantOpenWindow().map(time =>(
              <option key={time.time} value={time.time}>{time.displayTime}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='mt-5 '>
        <button className='bg-red-600 rounded w-full text-white font-bold h-16'>Find a Time</button>
      </div>
    </div>
  )
}
function useSate(arg0: Date): [any, any] {
  throw new Error("Function not implemented.");
}

