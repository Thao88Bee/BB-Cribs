import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import bblogo from "/favicon.ico";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);

  const createSpot = (e) => {
    e.preventDefault();

    navigate("/spots/create");
  };

  return (
    <ul id="navBar">
      <Link to="/">
        <img src={bblogo} alt="BB Cribs Logo" />
      </Link>
      {isLoaded && (
        <>
          {sessionUser ? (
            <>
              <div id="navBarBtn">
                <button className="createBtn" onClick={createSpot}>
                  Create A Spot
                </button>
                <li>
                  <ProfileButton user={sessionUser} />
                </li>
              </div>
            </>
          ) : (
            <>
              <li>
                <ProfileButton user={sessionUser} />
              </li>
            </>
          )}
        </>
      )}
    </ul>
  );
}

export default Navigation;
