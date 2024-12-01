import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSpot } from "../../store/spot";
import "./SingleSpot.css";

const SingleSpot = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector((state) => state.spot.spot)

  useEffect(() => {
    dispatch(getSpot(id));
  }, [dispatch]);

  return (
    <>
      <div id="singleSpot">
        <h1 id="singleSpotHeader">{spot?.name}</h1>
        <p>
          {spot?.city}, {spot?.state}
        </p>
        <div id="singleSpotImages">
          <img
            className="spotImage one"
            src="https://images6.alphacoders.com/105/1058802.jpg"
            alt=""
          />
          <img
            className="spotImage"
            src="https://images6.alphacoders.com/105/1058802.jpg"
            alt=""
          />
          <img
            className="spotImage"
            src="https://images6.alphacoders.com/105/1058802.jpg"
            alt=""
          />
          <img
            className="spotImage"
            src="https://images6.alphacoders.com/105/1058802.jpg"
            alt=""
          />
          <img
            className="spotImage"
            src="https://images6.alphacoders.com/105/1058802.jpg"
            alt=""
          />
        </div>
        <p>Hosted by {spot?.Owner.firstName} {spot?.Owner.lastName}</p>
        <p>Average Rating: {spot?.avgRating}</p>
        <p>${spot?.price} per night</p>
        <button>Reserve</button>
        <p id="description">{spot?.description}</p>
      </div>
    </>
  );
};

export default SingleSpot;
