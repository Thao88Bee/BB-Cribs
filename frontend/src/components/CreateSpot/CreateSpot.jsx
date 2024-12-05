import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSpot } from "../../store/spot";
import "./CreateSpot.css";

function CreateSpot() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const onSubmit = async (e) => {
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

    await dispatch(createSpot(newSpot));

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
      <h1 id="createHeader">Create A New Spot</h1>
      <form id="form" action="">
        <div id="createForm">
          <h3>Where&apos;s your place located?</h3>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>
          <div id="labelSec">
            <label htmlFor="">Country: </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <br />
          <div id="labelSec">
            <label htmlFor="">Street Address: </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <br />
          <div id="labelSec">
            <label htmlFor="">City: </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <br />
          <div id="labelSec">
            <label htmlFor="">State: </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <br />
          <div id="labelSec">
            <label htmlFor="">Lat: </label>
            <input
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </div>
          <br />
          <div id="labelSec">
            <label htmlFor="">Lng: </label>
            <input
              type="text"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
            />
          </div>
        </div>
        <div id="createForm">
          <h3>Describe your place to guests</h3>
          <p>
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <p>Please write at least 30 characters.</p>
          <div id="labelSec">
            <label htmlFor="">Description: </label>
            <textarea 
            name="desciption" 
            id="textArea"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            >
            </textarea>
          </div>
        </div>
        <div id="createForm">
          <h3>Create a title for you spot</h3>
          <p>
            Catch guests&apos; attention with a spot title that highlights what makes
            your place special.
          </p>
          <div id="labelSec">
            <label htmlFor="">Name of your spot: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div id="createForm">
          <h3>Set a base price for your spot</h3>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <div id="labelSec">
            <label htmlFor="">Price per night (USD): </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div id="createForm">
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <p>Preview Image URL</p>
          <div id="createForm">
            <input className="uploadImage" type="file" accept="image/*" />
            <p>Image URL</p>
            <input className="uploadImage" type="file" accept="image/*" />
            <br />
            <input className="uploadImage" type="file" accept="image/*" />
            <br />
            <input className="uploadImage" type="file" accept="image/*" />
            <br />
            <input className="uploadImage" type="file" accept="image/*" />
          </div>
          <br />
          <button id="createSpotBtn" onClick={onSubmit}>Create Spot</button>
        </div>
      </form>
    </>
  );
}

export default CreateSpot;
