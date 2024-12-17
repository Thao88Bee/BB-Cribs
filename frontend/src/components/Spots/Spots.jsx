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
      <ul className="spots">
        {spots?.map(({ id, city, state, name, price, avgRating }) => (
          <div className="spotsBox" data-social={name} key={id}>
            <Link className="link" to={`/spots/${id}`}>
              <li className="previewImageSec">
                <img
                  id="spotsImage"
                  key={id}
                  src="https://i.pinimg.com/originals/a9/10/5c/a9105cdbeb639c2b2ffa3efcb273cb41.jpg"
                  alt={name}
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
          </div>
        ))}
      </ul>
    </>
  );
}

export default Spots;
