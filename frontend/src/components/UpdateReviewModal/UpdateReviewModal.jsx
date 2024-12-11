import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateReview } from "../../store/review";
import { getSpotReviews } from "../../store/review";

function UpdateReviewModal({reviewId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [error, setError] = useState(null)
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [selected, setselected] = useState(0);
  const [reload, setReload] = useState(false);
  const [disabled, setDisabled] =useState(true);

  const spot = useSelector((state) => state.spot.spot);
  const spotId = spot.id;

  useEffect(() => {
    if (review.length <= 10 || stars <= 0) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }

    dispatch(getSpotReviews(spotId));
  }, [dispatch, reload, spotId, error, review, stars ]);

  const onSubmit = async () => {

    try {
      const updatedReview = {
        review,
        stars,
      };
      
      await dispatch(updateReview(updatedReview, reviewId));
  
      setReview("");
      setStars("");

    } catch (err) {
      setError("Fail")
      setTimeout(() => setError(null), 5000)
    }

    closeModal();
  };

  return (
    <div id="deleteModal">
      <h1 id="loginHeader">Update your review</h1>
      <p>Update your review here...</p>
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
      <button className="no Btn" disabled={disabled} onClick={() => (onSubmit(), setReload(true))}>
        Update Your Review
      </button>
    </div>
  );
}

export default UpdateReviewModal;
