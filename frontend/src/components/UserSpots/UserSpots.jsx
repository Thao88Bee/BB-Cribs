import { csrfFetch } from "../../store/csrf";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserSpots } from "../../store/spot";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import "./UserSpots.css";

function UserSpot() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const spots = useSelector((state) => state.spot.Spots);

  const [deleted, setDeleted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(getUserSpots());
  }, [dispatch, deleted, showMenu]);

  const updateUserSpot = (spotId) => {
    navigate(`/spots/${spotId}/update`);
  };

  const closeMenu = () => setShowMenu(false);

  const deleteUserSpot = async (spotId) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const data = await res.json();
      setDeleted((prev) => !prev);
      return data;
    }
  };

  return (
    <div>
      <h1 id="userHeader">Manage Spots</h1>
      <ul id="spots">
        {spots?.map(({ id, name, city, state, avgRating, price }) => (
          <div id="spotsBox" key={id}>
            <Link className="link" to={`/spots/${id}`}>
              <p>{name}</p>
              <li>
                <img
                  id="spotsImage"
                  src="https://images6.alphacoders.com/105/1058802.jpg"
                  alt=""
                />
              </li>
              <p>
                {city}, {state}
              </p>
              <div className="priceRatingSec">
                <p>
                  {avgRating ? avgRating : "New"}{" "}
                  <span id="star">{!avgRating ? avgRating : "★"}</span>
                </p>
                <p>${price} / Night</p>
              </div>
            </Link>
            <button id="updateBtn" onClick={() => updateUserSpot(id)}>
              Update
            </button>
            <>
              {
                <>
                  <OpenModalButton
                    buttonText="Delete"
                    onButtonClick={closeMenu}
                    modalComponent={
                      <DeleteReviewModal
                        deleting={() => deleteUserSpot(id)}
                        spotId={id}
                      />
                    }
                  />
                </>
              }
            </>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default UserSpot;
