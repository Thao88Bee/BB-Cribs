import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSpots } from "../../store/spot";
import "./SingleSpot.css";

const SingleSpot = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const singleSpot = useSelector((state) =>
    state.spot.allSpots?.find((spot) => spot.id === Number(id))
  );

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <>
    <div id="singleSpot">
      <h1 id="singleSpotHeader">{singleSpot?.name}</h1>
      <p>
        {singleSpot?.city}, {singleSpot?.state}
      </p>
      <div id="singleSpotImages">
          <img className="spotImage one" src="https://images6.alphacoders.com/105/1058802.jpg" alt="" />
          <img className="spotImage" src="https://images6.alphacoders.com/105/1058802.jpg" alt="" />
          <img className="spotImage" src="https://images6.alphacoders.com/105/1058802.jpg" alt="" />
          <img className="spotImage" src="https://images6.alphacoders.com/105/1058802.jpg" alt="" />
          <img className="spotImage" src="https://images6.alphacoders.com/105/1058802.jpg" alt="" />
      </div>
        <p>${singleSpot?.price} per night</p>
        <p>Average Rating: {singleSpot?.avgRating}</p>
        <button>Reserve</button>
        <p id="description">{singleSpot?.description}</p>
      </div>
    </>
  );
};

export default SingleSpot;
