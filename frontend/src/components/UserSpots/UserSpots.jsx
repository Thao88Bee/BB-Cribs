import { csrfFetch } from "../../store/csrf";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserSpots } from "../../store/spot";
import "./UserSpots.css";

function UserSpot() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const spots = useSelector((state) => state.spot.Spots);
  const user = useSelector((state) => state.session.user);

  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    dispatch(getUserSpots());
  }, [dispatch, deleted]);

  const updateUserSpot = (spotId) => {
    navigate(`/spots/${spotId}/update`);
  };

  const deleteUserSpot = async (spotId) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const data = await res.json();
      console.log("deleteSpot");
      setDeleted((prev) => !prev);
      return data;
    }
  };

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
            <button id="updateBtn" onClick={() => updateUserSpot(id)}>
              Update
            </button>
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
