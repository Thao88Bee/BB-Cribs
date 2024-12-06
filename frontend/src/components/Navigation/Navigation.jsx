import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import bblogo from "/favicon.ico";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

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
