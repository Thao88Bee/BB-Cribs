import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Spots.css";

function Spots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <>
      <ul id="spots">
        {spots?.map(({ id, city, state, name, price }) => (
          <li key={id}>
            <Link to={`/spots/${id}`}>
            {name}
            <br />
            <img id="spotImage" key={id} src="https://images6.alphacoders.com/105/1058802.jpg" alt="" />
            <p>{city}, {state}</p>
            <p>${price} per night</p>
            <button>reserve</button>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Spots;
