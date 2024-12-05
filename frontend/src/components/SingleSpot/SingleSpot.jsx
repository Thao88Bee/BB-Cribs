import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSpot } from "../../store/spot";
import { getSpotReviews } from "../../store/review";
import "./SingleSpot.css";

const SingleSpot = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spot = useSelector((state) => state.spot.spot);
  const reviews = useSelector((state) => state.review.Reviews);

  useEffect(() => {
    dispatch(getSpot(id));
    dispatch(getSpotReviews(id));
  }, [dispatch, id]);

  return (
    <>
      <div id="singleSpot">
        <h1 id="singleSpotHeader">{spot?.name}</h1>
        <p>
          {spot?.city}, {spot?.state}, {spot?.country}
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
        <div className="spotinfroSection">
          <div className="inforSection">
            <p>
              Hosted by {spot?.Owner.firstName} {spot?.Owner.lastName}
            </p>
            <p>{spot?.avgRating ? spot?.avgRating: "New"}<span id="star">{!spot?.avgRating ? spot?.avgRating: "★"}</span></p>
            <p id="description">{spot?.description}</p>
          </div>
          <div className="reserveSection">
            <p>${spot?.price} / Night</p>
            <button
              id="reserveBtn"
              onClick={() => alert("Feature coming soon")}
            >
              Reserve
            </button>
          </div>
        </div>
        <div id="reviewSec">
          {reviews?.map(({ id, review, stars, createdAt, User }) => (
            <div key={id} className="reviews">
              <div className="reviewNameDate">
                <p>{User.firstName}</p>
              <p>{new Date(createdAt).toLocaleString("default", {month: "long" })}, {new Date(createdAt).getFullYear()}</p>
              </div>
              <p className="ratingStar">{stars}</p>
              <p className="reviewDescr">{review}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleSpot;
