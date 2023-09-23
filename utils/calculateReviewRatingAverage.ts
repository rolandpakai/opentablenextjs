import { Review } from "@prisma/client";

export const calculateReviewRatingAverage = (reviews: Review[]) => {
  let avg = 0;
  
  if (reviews.length) {
    avg = reviews.reduce((sum, review) => {
      return sum + review.rating
    }, 0) / reviews.length;
  }

  return avg;
};