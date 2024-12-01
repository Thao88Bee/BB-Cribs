import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spot/getAllSpots";
const GET_SPOT = "spot/getSpot";
const ADD_SPOT = "spot/addSpot";
const DELETE_SPOT = "spot/deleteSpot";

export const getAllSpotsAction = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};

export const getSpotAction = (spot) => {
  return {
    type: GET_SPOT,
    spot,
  };
};

export const addSpotAction = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};

export const deleteSpotAction = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId,
  };
};

export const getAllSpots = () => async (dispatch) => {
  const res = await fetch("/api/spots");
  const data = await res.json();

  dispatch(getAllSpotsAction(data));
  return res;
};

export const getSpot = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`);
  const data = await res.json();

  console.log(data);

  dispatch(getSpotAction(data));
  return res;
};

export const addSpot = (newSpot) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {
      "Context-Type": "application/json",
    },
    body: JSON.stringify(newSpot),
  });

  if (res.ok) {
    const spot = await res.json();
    dispatch(addSpotAction(spot));
    return spot;
  }
};

export const deleteSpot = (spot) => async (dispatch) => {
  const spotId = spot.id;
  const res = await csrfFetch(`/api/spots/:${spotId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteSpotAction(data));
    return data;
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      return { ...state, Spots: action.spots.Spots };
    case GET_SPOT:
      return { ...state, spot: action.spot }
    case ADD_SPOT:
      return { ...state, Spots: action.spots };
    case DELETE_SPOT:
      return { ...state, Spots: action.spots };
    default:
      return state;
  }
};

export default spotsReducer;
