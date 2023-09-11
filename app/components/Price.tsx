import { PRICE } from '@prisma/client'
import React from 'react'

interface Props {
  price: PRICE
}

const repeatChar = (n: number) => {
  if (n <= 0) {
    return '????';
  }
  
  return '$'.repeat(n);
}

const renderPriceIndicator = (value: number) => {
  return (
    <>
      <span>repeatChar(value)</span>
      {
        (4 - value) > 0 &&  
        <span className='text-gray-400'>repeatChar(4 - value)</span>
      }
      
    </>
  )
}

export default function Price({price}: Props) {
  
  const renderPrice = () => {
    switch (price) {
      case PRICE.CHEAP :      
        return (
          <>
            <span>$$</span>
            <span className='text-gray-400'>$$</span>
          </>
        )

      case PRICE.REGULAR: 
        return (
          <>
            <span>$$$</span>
            <span className='text-gray-400'>$</span>
          </>
        )

      case PRICE.EXPENSIVE:
        return (
          <span>$$$$</span>
        )

      default:  return (
        <span>????</span>
      ) 
    }
  }
  
  return (
    <p className='flex mr-3'>
      {
        renderPrice()
      }
    </p>
  )
}
