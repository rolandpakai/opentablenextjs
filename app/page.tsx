"use client"

import { Inter } from '@next/font/google'
import NavBar from './components/NavBar';
import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className='max-w-screen-2xl m-auto bg-white'>
        <NavBar />
        <main>
          <Header />
          {/* CARDS */}
          <div className='py-3 px-36 mt-10 flex flex-wrap'>
            <RestaurantCard />
          </div>
          {/* CARDS */}
        </main>
      </main>
    </main>
  )
}
