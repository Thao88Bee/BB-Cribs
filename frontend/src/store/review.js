// import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = "review/getSpotReviews";
const DELETE_REVIEW = "review/deleteReview";

export const getSpotReviewsAction = (spot) => {
  return {
    type: GET_SPOT_REVIEWS,
    spot,
  };
};

export const deleteReviewAction = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

export const getSpotReviews = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}/reviews`);
  const data = await res.json();

  dispatch(getSpotReviewsAction(data));
  return res;
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      return { ...state, Reviews: action.spot.Reviews };
    case DELETE_REVIEW:
      return { ...state, Reviews: action.reviews }
    default:
      return state;
  }
};

export default reviewsReducer;
