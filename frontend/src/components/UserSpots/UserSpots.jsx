import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteSpot, getUserSpots } from "../../store/spot";
import "./UserSpots.css";

function UserSpot() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spot.Spots);
  const user = useSelector((state) => state.session.user);
  
  const deleteUserSpot = (spotId) => {
    dispatch(deleteSpot(spotId));
  };

  useEffect(() => {
    dispatch(getUserSpots());
  }, [dispatch]);

  return (
    <div>
      <h1 id="userHeader">
        {user?.firstName} {user?.lastName} Spots
      </h1>
      <ul id="spots">
        {spots?.map(({ id, name, city, state, price }) => (
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
              <p>${price} per night</p>
            </Link>
            <button id="deleteBtn" onClick={() => deleteUserSpot(id)}>
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default UserSpot;
