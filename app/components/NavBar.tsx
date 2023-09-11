"use client"

import Link from 'next/link';

export default function NavBar() {

  return (
    <nav className='bg-white p-2 flex justify-between'>
    <Link href="/" className="font-bold text-gray-700 text-2xl">
      OpenTable{" "}
    </Link>
    <div>
      <div className='flex'>
        <button className='bg-blue-400 text-white border p-1 px-4 mr-3 rounded'>Sign in</button>
        <button className='text-gray-700 border p-1 px-4 rounded'>Sign up</button>
      </div>
    </div>
  </nav>
  )
}