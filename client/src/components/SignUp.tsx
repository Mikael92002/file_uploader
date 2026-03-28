import { getCurrentUserFetch, logInFetch, signUpFetch } from "../fetches/fetch";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "../css modules/Auth.module.css";
import { Link } from "react-router";
import type { User } from "../types/types";
import { useLoad } from "../context/LoadContext";
import load from "../css modules/Load.module.css";
import { useAudio } from "../context/AudioContext";

const SignUp = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const { navLoad } = useLoad();
  const { clickSound } = useAudio();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
      navLoad();
    }
  }, [navigate, currentUser, navLoad]);

  const [errorsArray, setErrorsArray] = useState([]);

  async function handleSignUp(
    e: React.SubmitEvent,
    setCurrentUser: (value: React.SetStateAction<User | null>) => void,
  ) {
    e.preventDefault();

    const dataAsObjects = Object.fromEntries(new FormData(e.target));

    const signUpResponse = await signUpFetch(dataAsObjects);
    if (signUpResponse?.ok) {
      await logInFetch(dataAsObjects);
      setErrorsArray([]);
      setCurrentUser(await getCurrentUserFetch());
      navLoad();
      navigate("/home");
    } else if (signUpResponse?.status === 400) {
      const signUpObj = await signUpResponse.json();
      setErrorsArray(signUpObj.errors);
    }
  }

  if (currentUser) {
    return null;
  } else
    return (
      <div className={`${styles.container} ${load.load_container}`}>
        {errorsArray.map((error) => {
          return (
            <div key={error["msg"]} className={styles.error_container}>
              {error["msg"]}
            </div>
          );
        })}
        <h1 className={styles.title}>Sign Up</h1>
        <form
          onSubmit={(e) => handleSignUp(e, setCurrentUser)}
          className={styles.form_container}
        >
          <label htmlFor="sign-up-username">Username:</label>
          <input
            type="text"
            name="username"
            id="sign-up-username"
            maxLength={20}
            required
          />
          <label htmlFor="sign-up-password">Password:</label>
          <input
            type="password"
            name="password"
            id="sign-up-password"
            minLength={8}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            minLength={8}
            required
          />
          <button
            onClick={clickSound}
            type="submit"
            className={styles.log_in_button}
          >
            Sign Up
          </button>
        </form>
        Or:{" "}
        <Link to="/login" onClick={navLoad}>
          Log In
        </Link>
      </div>
    );
};

export default SignUp;
