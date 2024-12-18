import { csrfFetch } from "../../store/csrf";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSpot } from "../../store/spot";
import { getSpotReviews } from "../../store/review";
import { getAllSpots } from "../../store/spot";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import PostReviewModal from "../PostReviewModal/PostReviewModal";
import UpdateReviewModal from "../UpdateReviewModal/UpdateReviewModal";
import "./SingleSpot.css";

const SingleSpot = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const spot = useSelector((state) => state.spot.spot);
  const reviews = useSelector((state) => state.review.Reviews);
  const user = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spot.Spots);

  const sorted = reviews?.sort((a, b) => (a.id > b.id ? -1 : 0));

  const spotid = spot?.id;
  const singlespot = spots?.find((spot) => spot.id === spotid);

  const ownReview = reviews?.some((review) => review?.userId === user?.id);

  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    dispatch(getAllSpots());
    dispatch(getSpot(id));
    dispatch(getSpotReviews(id));
  }, [dispatch, id, deleted, showMenu, reviews?.length]);

  const deleteReview = async (reviewId) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const data = await res.json();
      setDeleted((prev) => !prev);
      return data;
    }
  };

  return (
    <>
      <div id="singleSpot">
        <h1 id="singleSpotHeader">{spot?.name}</h1>
        <p className="location">
          <span>{spot?.city}, {spot?.state},</span>
          <span> {spot?.country}</span>
        </p>
        <div id="singleSpotImages">
          <img
            className="spotImage one"
            src="https://i.pinimg.com/originals/a9/10/5c/a9105cdbeb639c2b2ffa3efcb273cb41.jpg"
            alt=""
          />
          <img
            className="spotImage"
            src="https://e1.pxfuel.com/desktop-wallpaper/1013/109/desktop-wallpaper-artstation-anime-house-bedroom.jpg"
            alt=""
          />
          <img
            className="spotImage"
            src="https://thumb.ac-illust.com/c5/c5a8e6710f4da6c6c77efa016ab7d0f9_t.jpeg"
            alt=""
          />
          <img
            className="spotImage"
            src="https://img.freepik.com/free-photo/cozy-home-interior-anime-style_23-2151176357.jpg"
            alt=""
          />
          <img
            className="spotImage"
            src="https://wallpapercave.com/wp/wp6084696.jpg"
            alt=""
          />
        </div>
        <div className="spotinfroSection">
          <div className="inforSection">
            <p>
              Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}
            </p>
            <p id="description">{spot?.description}</p>
          </div>
          <div className="reserveSection">
            <p className="reviewRate">
              <span>
                {spot?.review || spot?.avgStarRating
                  ? singlespot?.avgRating
                  : ""}
              </span>
              <span id="star">{!spot?.avgStarRating ? " ★ " : " ★ "}</span>
              <span>{reviews?.length ? " · " : ""}</span>
              <span>{reviews?.length ? reviews?.length : " New"}</span>
              <span>
                {reviews?.length <= 0
                  ? ""
                  : reviews?.length === 1
                  ? " Review"
                  : " Reviews"}
              </span>
            </p>
            <p>${spot?.price} / Night</p>
            <button
              id="reserveBtn"
              onClick={() => alert("Feature coming soon")}
            >
              Reserve
            </button>
          </div>
        </div>
        {reviews?.length ? (
          <>
            <div>
              <p>
                <span>{reviews?.length ? reviews?.length : "New"}</span>{" "}
                <span>{reviews?.length === 1 ? "Review" : "Reviews"}</span>
                <span id="reviewsStar">
                  {spot?.avgStarRating ? singlespot?.avgRating : "New"}
                </span>{" "}
                <span id="star">
                  {!spot?.avgStarRating ? spot?.avgStarRating : "★"}
                </span>
              </p>
            </div>
            <div id="reviewSec">
              {sorted?.map(({ id, review, stars, createdAt, User }) => (
                <div key={id} className="reviews">
                  <div className="reviewNameDate">
                    <p>{User?.firstName}</p>
                    <p>
                      {new Date(createdAt).toLocaleString("default", {
                        month: "long",
                      })}
                      , {new Date(createdAt).getFullYear()}
                    </p>
                  </div>
                  <p className="ratingStar">
                    {stars}
                    <span id="star">{!stars ? stars : "★"}</span>
                  </p>
                  <p className="reviewDescr">{review}</p>
                  <div className="deleteReviewBtnSec">
                    {user?.id === User?.id ? (
                      <>
                        <div id="reviewBtn">
                          <div id="updatedReviewBtn">
                            <OpenModalButton
                              buttonText="Update Your Review"
                              onButtonClick={closeMenu}
                              modalComponent={
                                <UpdateReviewModal reviewId={id} />
                              }
                            />
                          </div>
                          <OpenModalButton
                            buttonText="Delete"
                            onButtonClick={closeMenu}
                            modalComponent={
                              <DeleteReviewModal
                                deleting={() => deleteReview(id)}
                                reviewId={id}
                              />
                            }
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
              {user?.id !== spot?.Owner?.id && !ownReview && user ? (
                <>
                  <div className="reviewDeleteBtn">
                    <OpenModalButton
                      buttonText="Post Your Review"
                      onButtonClick={closeMenu}
                      modalComponent={<PostReviewModal />}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="firstPostSec">
              {user?.id !== spot?.Owner?.id && !ownReview && user ? (
                <>
                  <h2>Be the first to post a review!</h2>
                  <div className="reviewDeleteBtn">
                    <OpenModalButton
                      buttonText="Post Your Review"
                      onButtonClick={closeMenu}
                      modalComponent={<PostReviewModal />}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleSpot;
