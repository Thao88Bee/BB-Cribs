import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import bblogo from "../../../public/favicon2.ico"

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul id="navBar">
      <Link to="/">
      <img src={bblogo} alt="BB Cribs Logo" />
      </Link>
      <li>
        <Link className="Link" to="/">Spots</Link>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
