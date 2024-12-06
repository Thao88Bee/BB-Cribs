import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import "./PostReviewModal.css";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../store/review";
import { getSpotReviews } from "../../store/review";

function PostReviewModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [selected, setselected] = useState(0);
  const [reload, setReload] = useState(false);

  const spot = useSelector((state) => state.spot.spot);
  const spotId = spot.id;

  useEffect(() => {
    dispatch(getSpotReviews(spotId));
  }, [dispatch, reload, spotId]);

  const onSubmit = async () => {
    const newReview = {
      review,
      stars,
    };

    await dispatch(createReview(newReview, spotId));

    setReview("");
    setStars("");
    setReload((prev) => !prev)

    closeModal();
  };

  return (
    <div id="deleteModal">
      <h1 id="loginHeader">How was your stay?</h1>
      <p>Leave Your review here...</p>
      <div className="starInput">
        <div>
          {[...Array(5)].map((_, index) => {
            return (
              <span
                className={`${
                  index + 1 <= selected ? "starRating" : "starFirst"
                }`}
                key={index}
                value={stars}
                onClick={() => (setselected(index + 1), setStars(index + 1))}
              >
                {" "}
                ★{" "}
              </span>
            );
          })}
        </div>
        <br />
        Star Rating Count: {selected}
      </div>
      <br />
      <textarea
        name=""
        id="textArea"
        type="text"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <br />
      <button className="no Btn" onClick={() => (onSubmit(), setReload(true))}>
        Submit Your Review
      </button>
    </div>
  );
}

export default PostReviewModal;
