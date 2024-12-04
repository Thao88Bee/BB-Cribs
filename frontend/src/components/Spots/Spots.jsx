import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spot";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Spots.css";

function Spots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spot.Spots);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return (
    <>
      <ul id="spots">
        {spots?.map(({ id, city, state, name, price, avgRating }) => (
          <div id="spotsBox" key={id}>
            <Link className="link" to={`/spots/${id}`}>
              <p>{name}</p>
              <li>
                <img
                  id="spotsImage"
                  key={id}
                  src="https://images6.alphacoders.com/105/1058802.jpg"
                  alt={name}
                />
              </li>
              <p>
                {city}, {state}
              </p>
              <p>${price} per night</p>
              <p>{avgRating}</p>
            </Link>
          </div>
        ))}
      </ul>
    </>
  );
}

export default Spots;
