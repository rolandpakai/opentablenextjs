import { PRICE } from '@prisma/client'
import React from 'react'

const PRICE_SIGN_COUNT = 4;

interface Props {
  price: PRICE
}

const repeatChar = (n: number) => {
  if (n <= 0) {
    return '?'.repeat(n - PRICE_SIGN_COUNT);
  }
  
  return '$'.repeat(n);
}

const renderPriceIndicator = (value: number) => {
  return (
    <>
      <span>{repeatChar(value)}</span>
      {
        (PRICE_SIGN_COUNT - value) > 0 
        &&  
        <span className='text-gray-400'>
          {repeatChar(4 - value)}
        </span>
      }
    </>
  )
}

export default function Price({price}: Props) {
  const renderPrice = () => {
    switch (price) {
      case PRICE.CHEAP:      
        return renderPriceIndicator(1)

      case PRICE.REGULAR: 
        return renderPriceIndicator(2)

      case PRICE.EXPENSIVE:
        return renderPriceIndicator(4)

      default:  
        return renderPriceIndicator(0)
    }
  }

  const capitalizeFirstLetter = (word: string): string => {
    if (!word) {
      return '?';
    }
  
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };
  
  return (
    <p className='flex mr-3' title={capitalizeFirstLetter(price)}>
      {renderPrice()}
    </p>
  )
}
