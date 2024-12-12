import { csrfFetch } from "../../store/csrf";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserSpots } from "../../store/spot";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal/DeleteSpotModal";
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
      <ul className="spots userSpots">
        {spots?.map(({ id, name, city, state, avgRating, price }) => (
          <div className="spotsBox" data-social={name} key={id}>
            <Link className="link" to={`/spots/${id}`}>
              <li>
                <img
                  id="spotsImage"
                  src="https://i.pinimg.com/originals/a9/10/5c/a9105cdbeb639c2b2ffa3efcb273cb41.jpg"
                  alt={name}
                  title={name}
                />
              </li>
              <p>{name}</p>
              <p>
                {city}, {state}
              </p>
              <div className="priceRatingSec">
                <p>${price} / Night</p>
                <p>
                  {avgRating ? avgRating : "New"}{" "}
                  <span id="star">{!avgRating ? avgRating : "★"}</span>
                </p>
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
                      <DeleteSpotModal
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
