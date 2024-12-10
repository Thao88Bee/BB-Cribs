import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = "review/getSpotReviews";
const CREATE_REVIEW = "review/createReview";
const UPDATE_REVIEW = "review/updateReview";
const DELETE_REVIEW = "review/deleteReview";

export const getSpotReviewsAction = (spot) => {
  return {
    type: GET_SPOT_REVIEWS,
    spot,
  };
};

export const createReviewAction = (spot) => {
  return {
    type: CREATE_REVIEW,
    spot,
  };
};

export const updateReviewAction = (reviewId) => {
  return {
    type: UPDATE_REVIEW,
    reviewId,
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

  await dispatch(getSpotReviewsAction(data));
  return data;
};

export const createReview = (newReview, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Context-Type": "application/json",
    },
    body: JSON.stringify(newReview),
  });

  if (res.ok) {
    const data = await res.json();
    await dispatch(createReviewAction(data));
    return data;
  }
};

export const updateReview = (updatedReview, reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    headers: {
      "Context-Type": "application/json",
    },
    body: JSON.stringify(updatedReview),
  });

  if (res.ok) {
    const data = await res.json();
    await dispatch(updateReviewAction(data));
    return data;
  }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      return { ...state, Reviews: action.spot.Reviews };
    case CREATE_REVIEW:
      return { ...state, Reviews: action.reviews };
    case UPDATE_REVIEW:
      return { ...state, Reviews: action.reviews }
    case DELETE_REVIEW:
      return { ...state, Reviews: action.reviews };
    default:
      return state;
  }
};

export default reviewsReducer;
