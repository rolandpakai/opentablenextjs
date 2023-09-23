import Link from 'next/link';
import Price from '../../components/Price';
import { RestaurantCardType } from '../page';
import { calculateReviewRatingAverage } from '../../../utils/calculateReviewRatingAverage';
import { Review } from '@prisma/client';

const renderRatingText = (reviews: Review[]) => {
  const rating = calculateReviewRatingAverage(reviews);
  
  if (rating > 4) return "Awesome";
  else if (rating <= 4 && rating > 3) return "Good";
  else if (rating <= 3 && rating > 2) return "Average";
  else return "";
}

export default function RestaurantCard({restaurant}: {restaurant: RestaurantCardType}) {

  return (
    <div className="border-b flex pb-5">
      <img
        src={restaurant.main_image}
        alt=""
        className="w-44 h-24 rounded"
      />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">*****</div>
          <p className="ml-2 text-sm">{renderRatingText(restaurant.reviews)}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href="">View more information</Link>
        </div>
      </div>
    </div>
  )
}