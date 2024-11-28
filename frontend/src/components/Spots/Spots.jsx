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
        {spots?.map(({ id, name }) => (
          <li key={id}>
            <Link to={`${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Spots;
