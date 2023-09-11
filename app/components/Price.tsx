import { PRICE } from '@prisma/client'
import React from 'react'

interface Props {
  price: PRICE
}

const PriceValue = {
  CHEAP: 1,
  REGULAR: 2,
  EXPENSIVE: 4,
}

const PRICE_SIGN_COUNT = PriceValue.EXPENSIVE;

const repeatChar = (n: number) => {
  return '$'.repeat(n);
}

const renderPrice = (value: number) => {
  return (
    <>
      <span>{repeatChar(value)}</span>
      {
        (PRICE_SIGN_COUNT - value) > 0 
        &&  
        <span className='text-gray-400'>
          {repeatChar(PRICE_SIGN_COUNT - value)}
        </span>
      }
    </>
  )
}

const capitalizeFirstLetter = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export default function Price({price}: Props) {

  return (
    <p className='flex mr-3' title={capitalizeFirstLetter(price)}>
      {renderPrice(PriceValue[price])}
    </p>
  )
}
