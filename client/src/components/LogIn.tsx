import { useEffect, useState } from "react";
import { logInFetch } from "../fetches/fetch";
import { useNavigate, Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/Context";
import styles from "../css modules/Auth.module.css";

const LogIn = () => {
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser]);

  const [errorMessage, setErrorMessage] = useState("");

  async function LogInSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const formDataAsObj = Object.fromEntries(new FormData(e.target));
    const logInResponse = await logInFetch(formDataAsObj);
    console.log(logInResponse);
    if (logInResponse?.url.endsWith("/success")) {
      setErrorMessage("");
      navigate("/");
    } else if (logInResponse?.url.endsWith("/failure")) {
      setErrorMessage("Incorrect username or password");
    }
  }

  if (currentUser) {
    return null;
  } else
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Log In</h1>
        <form onSubmit={(e) => LogInSubmit(e)} className={styles.form_container}>
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
          <input type="password" name="password" id="log-in-password" required/>
          <button type="submit" className={styles.log_in_button}>
            Log In
          </button>
        </form>
        Or: <Link to="/signup">Sign Up</Link>
      </div>
    );
};

export default LogIn;
