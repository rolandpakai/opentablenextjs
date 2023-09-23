import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "../../../../utils/calculateReviewRatingAverage";
import Stars from "../../../components/Stars";
import Reviews from './Reviews';

export default function Rating({reviews}: {reviews: Review[]}) {
  return (
    <div className='flex items-end'>
      <div className='ratings mt-2 flex items-center'>
        <p><Stars reviews={reviews}/></p>
        <p className='text-req ml-3'>{calculateReviewRatingAverage(reviews).toFixed(1)}</p>
      </div>
      <div>
        <p className='text-reg ml-4'>{reviews.length} review(s)</p>
      </div>
    </div>
  )
}
