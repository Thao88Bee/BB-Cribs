import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spot/getAllSpots";
const GET_SPOT = "spot/getSpot";
const GET_USER_SPOTS = "spot/getUserSpots";
const CREATE_SPOT = "spot/createSpot";
const UPDATE_SPOT = "spot/updateSpot";

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

export const getUserSpotsAction = (spots) => {
  return {
    type: GET_USER_SPOTS,
    spots,
  };
};

export const createSpotAction = (spot) => {
  return {
    type: CREATE_SPOT,
    spot,
  };
};

export const updateSpotAction = (updatedSpot) => {
  return {
    type: UPDATE_SPOT,
    updatedSpot,
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

  dispatch(getSpotAction(data));
  return res;
};

export const getUserSpots = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}/spots`);
  const data = await res.json();

  dispatch(getUserSpotsAction(data));
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
    const data = await res.json();
    dispatch(createSpotAction(data));
    return res;
  }
};

export const updateSpot = (updatedSpot, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: {
      "Context-Type": "application/json",
    },
    body: JSON.stringify(updatedSpot),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updateSpotAction(data));
    return res;
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      return { ...state, Spots: action.spots.Spots };
    case GET_SPOT:
      return { ...state, spot: action.spot };
    case GET_USER_SPOTS:
      return { ...state, Spots: action.spots.Spots };
    case CREATE_SPOT:
      return { ...state, Spots: action.spots };
    case UPDATE_SPOT:
      return { ...state, spot: action.spots }
    default:
      return state;
  }
};

export default spotsReducer;
