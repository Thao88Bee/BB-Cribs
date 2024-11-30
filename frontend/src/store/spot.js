import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spot/getAllSpots";
const ADD_SPOT = "spot/addSpot";

export const getAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};

export const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};

export const getSpots = () => async (dispatch) => {
  const res = await fetch("/api/spots");
  const data = await res.json();

  dispatch(getAllSpots(data));
  return res;
};

export const createSpot = (newSpot) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {
      "Context-Type": "application/json",
    },
    body: JSON.stringify(newSpot),
  });

  if (res.ok) {
    const spot = await res.json();
    dispatch(addSpot(spot));
    return spot;
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      return { ...state, allSpots: action.spots.Spots };
    default:
      return state;
  }
};

export default spotsReducer;
