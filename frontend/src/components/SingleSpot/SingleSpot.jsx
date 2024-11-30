import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SingleSpot.css";

const SingleSpot = () => {
  const { id } = useParams();
  const singleSpot = useSelector((state) =>
    state.spot.allSpots.find((spot) => spot.id === Number(id))
  );

  console.log(singleSpot);

  return (
    <div>
        <h1>{singleSpot?.name}</h1>
        <p>{singleSpot?.city}, {singleSpot?.state}</p>
        <div>
        <img id="spotImage" src="https://images6.alphacoders.com/105/1058802.jpg" alt="" />
        </div>
        <p>{singleSpot?.description}</p>
        <div>
            <p>${singleSpot?.price} per night</p>
            <button>reserve</button>
        </div>
    </div>
  );
};

export default SingleSpot;
