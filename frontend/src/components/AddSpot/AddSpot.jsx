import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSpot } from "../../store/spot";

function AddSpot() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const newSpot = {
      name,
      address,
      city,
      state,
      country,
      lat,
      lng,
      description,
      price,
    };

    dispatch(addSpot(newSpot));

    setName("");
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setLat("");
    setLng("");
    setDescription("");
    setPrice("");

    navigate(`/users/${user.id}/spots`);
  };

  return (
    <>
      <h1>Create A Spot</h1>
      <form action="">
        <div>
          <label htmlFor="">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Adress:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">State:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Lat:</label>
          <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Lng:</label>
          <input
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Image</label>
          <input 
          type="file" 
          accept="image/*"
          multiple
          />
        </div>
        <button onClick={onSubmit}>Create Spot</button>
      </form>
    </>
  );
}

export default AddSpot;
