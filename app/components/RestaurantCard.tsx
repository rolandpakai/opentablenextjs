import Link from 'next/link';
import { calculateReviewRatingAverage } from '../../utils/calculateReviewRatingAverage';
import { RestaurantCardType } from '../page';
import Price from './Price';
import Stars from './Stars';

interface Props {
  restaurant: RestaurantCardType
}

export default function RestaurantCard({restaurant} : Props) {

  return (
    <div className='w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer'>
    <Link href={`/restaurant/${restaurant.slug}`}>
      <img src={restaurant.main_image} alt='' className='w-full h-36' />
      <div className='p-1'>
        <h3 className='font-bold text-2xl mb-2 text-ellipsis whitespace-nowrap overflow-hidden'>
          {restaurant.name}
        </h3>
        <div className='flex items-start'>
          <div className='flex mb-2'>
            <Stars reviews={restaurant.reviews}/>
          </div>
          <p className='text-req ml-3'>{calculateReviewRatingAverage(restaurant.reviews).toFixed(1)}</p>
          <p className='ml-2'>{restaurant.reviews.length} review(s)</p>
        </div>
        <div className='flex text-reg font-light capitalize'>
          <p className='mr-3'>{restaurant.cuisine.name}</p>
          <Price price={restaurant.price}/>
          <p>{restaurant.location.name}</p>
        </div>
        <p className='text-sm mt-1 font-bold'>Booked 3 times today</p>
      </div>
    </Link>
  </div>
  )
}