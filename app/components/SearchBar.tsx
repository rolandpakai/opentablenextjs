"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState('');

  const searchButtonClickHandler = () => {
    if (location === '') 
      return;

    router.push(`/search?city=${location}`);
    setLocation("");
  }
  
  return (
    <div className='text-left text-lg py-3 m-auto flex justify-center'>
    <input 
      className='rounded text-lg mr-3 p-2 w-[450px]' 
      type='text' 
      placeholder='Location, Restaurant, or Cuisine'
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
    <button 
      className='rounded bg-red-600 px-9 py-2 text-white'
      onClick={searchButtonClickHandler}
      >
        Let's go
      </button>
  </div>
  )
}
