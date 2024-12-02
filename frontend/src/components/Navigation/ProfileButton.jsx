import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHouseUser } from "react-icons/fa";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";

function ProfileButton({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate("/");
  };

  const createSpot = (e) => {
    e.preventDefault();
    closeMenu();
    navigate("/spots/create");
  };

  const manageSpot = (e) => {
    e.preventDefault();
    closeMenu();
    navigate(`/users/${user.id}/spots`);
  };

  const demo = (e) => {
    e.preventDefault();
    dispatch(sessionActions.demoLogin());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className="userBtn" onClick={toggleMenu}>
        <FaHouseUser />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>
              {user.firstName} {user.lastName}
            </li>
            <li>{user.email}</li>
            <li>
              <br />
              <button className="navBtn" onClick={manageSpot}>
                Manage Spots
              </button>
              <br />
              <button className="navBtn" onClick={createSpot}>
                Create A Spot
              </button>
              <br />
              <button className="navBtn" onClick={logout}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
            <button className="navBtn" onClick={demo}>
              Demo User
            </button>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
