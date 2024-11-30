import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spot";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Spots.css";

function Spots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spot.Spots);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <>
      <ul id="spots">
        {spots?.map(({ id, city, state, name, price }) => (
          <div key={id}>
            <li>
              <Link to={`/spots/${id}`}>
                {name}
                <br />
                <img
                  id="spotsImage"
                  key={id}
                  src="https://images6.alphacoders.com/105/1058802.jpg"
                  alt=""
                />
              </Link>
            </li>
            <p>
              {city}, {state}
            </p>
            <p>${price} per night</p>
          </div>
        ))}
      </ul>
    </>
  );
}

export default Spots;
