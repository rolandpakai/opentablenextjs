"use client"

import Image from "next/image";
import errorMascot from "../../public/icons/error.png";

export default function NotFound({error}: {error: Error}) {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image src={errorMascot} alt="error" className="w-56 mb-8"/>
      <div className="bg-white px-9 py-14 shadow rounded">
        <h3 className="text-3xl fond-bold">Well, something went wrong...</h3>
        <p className="text-reg fond-bold">We could not find the restaurant</p>
        <p className="mt-6 text-sm font-light">Error Code: 404</p>
      </div>
    </div>
  )
}
