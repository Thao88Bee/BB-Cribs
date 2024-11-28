const GET_ALL_SPOTS = "spots/getAllSpots";

const getAllSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};

export const getSpots = () => async (dispatch) => {
    const res = await fetch("/api/spots");
    const data = await res.json();

    dispatch(getAllSpots(data));
    return res;
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
            return { ...state, allSpots: action.spots.Spots }
        default:
            return state;
    }
}

export default spotsReducer;