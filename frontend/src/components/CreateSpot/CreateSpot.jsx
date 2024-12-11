import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createSpot } from "../../store/spot";
import "./CreateSpot.css";

function CreateSpot() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] =useState("");
  const [validationErrors, setValidationErrors] = useState();
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    const errors = {};

    if (!name.length) {
      errors.name = "Please enter your Name";
    }
    if (!address.length) {
      errors.address = "Please enter your Address";
    }
    if (!city.length) {
      errors.city = "Please enter your City";
    }
    if (!state.length) {
      errors.state = "Please enter your State";
    }
    if (!lat.length) {
      errors.lat = "Please enter the Latitude";
    }
    if (!lng.length) {
      errors.lng = "Please enter the Longitude";
    }
    if (!country.length) {
      errors.country = "Please enter your Country";
    }
    if (description.length <= 30) {
      errors.description = "Description needs 30 or more characters";
    }
    if (!price.length) {
      errors.price = "Price per night is required";
    }
    if (!previewImage.length) {
      errors.previewImage = "Preview Image is Required"
    }

    setValidationErrors(errors);
  }, [name, address, city, state, country, lat, lng, description, price, previewImage]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true)

    if (Object.keys(validationErrors).length) {
      return
    }

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
      previewImage,
    };

    const getSpot = await dispatch(createSpot(newSpot));

    setName("");
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setLat("");
    setLng("");
    setDescription("");
    setPrice("");
    setPreviewImage("");
    setHasSubmitted(false);

    navigate(`/spots/${getSpot.id}`);
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
          <div className="error">{hasSubmitted && validationErrors.country && `* ${validationErrors.country}`}</div>
          <br />
          <div id="labelSec">
            <label htmlFor="">Street Address: </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="error">{hasSubmitted && validationErrors.address && `* ${validationErrors.address}`}</div>
          <br />
          <div id="labelSec">
            <label htmlFor="">City: </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="error">{hasSubmitted && validationErrors.city && `* ${validationErrors.city}`}</div>
          <br />
          <div id="labelSec">
            <label htmlFor="">State: </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="error">{hasSubmitted && validationErrors.state && `* ${validationErrors.state}`}</div>
          <br />
          <div id="labelSec">
            <label htmlFor="">Lat: </label>
            <input
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </div>
          <div className="error">{hasSubmitted && validationErrors.lat && `* ${validationErrors.lat}`}</div>
          <br />
          <div id="labelSec">
            <label htmlFor="">Lng: </label>
            <input
              type="text"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
            />
          </div>
          <div className="error">{hasSubmitted && validationErrors.lng && `* ${validationErrors.lng}`}</div>
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
            ></textarea>
          </div>
          <div className="error">{hasSubmitted && validationErrors.description && `* ${validationErrors.description}`}</div>
        </div>
        <div id="createForm">
          <h3>Create a title for you spot</h3>
          <p>
            Catch guests&apos; attention with a spot title that highlights what
            makes your place special.
          </p>
          <div id="labelSec">
            <label htmlFor="">Name of your spot: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="error">{hasSubmitted && validationErrors.name && `* ${validationErrors.name}`}</div>
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
          <div className="error">{hasSubmitted && validationErrors.price && `* ${validationErrors.price}`}</div>
        </div>
        <div id="createForm">
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <p>Preview Image URL</p>
          <div id="createForm">
            <input 
            className="uploadImage" 
            type="file" accept="image/*" 
            value={previewImage} 
            onChange={(e) => setPreviewImage(e.target.value)}/>
            <div className="error">
              {hasSubmitted && validationErrors.previewImage && `* ${validationErrors.previewImage}`}
              </div>
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
          <button id="createSpotBtn" onClick={onSubmit}>
            Create Spot
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateSpot;
