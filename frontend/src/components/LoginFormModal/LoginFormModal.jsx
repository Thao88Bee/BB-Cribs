import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  useEffect(() => {
    if (credential.length <= 4 || password.length <= 6) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [credential, password]);

  const demo = (e) => {
    e.preventDefault();
    dispatch(sessionActions.demoLogin()).then(closeModal);
  };

  return (
    <>
      <h1 id="loginHeader">Log In</h1>
      <form id="loginForm" onSubmit={handleSubmit}>
        <label className="loginLabel">
          Username or Email:
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className="loginLabel">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button className="loginBtn" type="submit" disabled={disabled}>
          Log In
        </button>
        <button className="loginBtn" onClick={demo}>
          Login in as Demo User
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
