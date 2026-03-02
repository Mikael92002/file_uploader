import { useEffect, useState } from "react";
import { getCurrentUserFetch, logInFetch } from "../fetches/fetch";
import { useNavigate, Link } from "react-router";
import styles from "../css modules/Auth.module.css";
import load from "../css modules/Load.module.css";
import type { User } from "../types/types";
import { useAuth } from "../context/AuthContext";
import { useLoad } from "../context/LoadContext";
import { useAudio } from "../context/AudioContext";

const LogIn = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const { navLoad } = useLoad();
  const {clickSound} = useAudio();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navLoad();
      navigate("/home");
    }
  }, [navigate, currentUser, navLoad]);

  const [errorMessage, setErrorMessage] = useState("");

  async function LogInSubmit(
    e: React.SubmitEvent,
    setCurrentUser: (value: React.SetStateAction<User | null>) => void,
  ) {
    e.preventDefault();

    const formDataAsObj = Object.fromEntries(new FormData(e.target));
    const logInResponse = await logInFetch(formDataAsObj);
    // console.log(logInResponse);
    if (logInResponse?.url.endsWith("/success")) {
      setErrorMessage("");
      setCurrentUser(await getCurrentUserFetch());
      navLoad();
      navigate("/home"); // call navLoad() here...
    } else if (logInResponse?.url.endsWith("/failure")) {
      setErrorMessage("Incorrect username or password");
    }
  }

  if (currentUser) {
    return null;
  } else
    return (
      <div className={`${styles.container} ${load.load_container}`}>
        <h1 className={styles.title}>Log In</h1>
        <form
          onSubmit={(e) => LogInSubmit(e, setCurrentUser)}
          className={styles.form_container}
        >
          <div className={styles.error_container}>{errorMessage}</div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="log-in-username"
            maxLength={255}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="log-in-password"
            required
          />
          <button type="submit" onClick={clickSound} className={styles.log_in_button}>
            Log In
          </button>
        </form>
        Or:{" "}
        <Link to="/signup" onClick={navLoad}>
          Sign Up
        </Link>
      </div>
    );
};

export default LogIn;
