import { logInFetch, signUpFetch } from "../fetches/fetch";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Context";
import styles from "../css modules/Auth.module.css";
import { Link } from "react-router";

const SignUp = () => {
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const [errorsArray, setErrorsArray] = useState([]);

  async function handleSignUp(e: React.SubmitEvent) {
    e.preventDefault();

    const dataAsObjects = Object.fromEntries(new FormData(e.target));

    const signUpResponse = await signUpFetch(dataAsObjects);
    console.log(signUpResponse);
    if (signUpResponse?.ok) {
      await logInFetch(dataAsObjects);
      setErrorsArray([]);
      navigate("/");
    } else if (signUpResponse?.status === 400) {
      const signUpObj = await signUpResponse.json();
      setErrorsArray(signUpObj.errors);
    }
  }

  if (currentUser) {
    return null;
  } else
    return (
      <div className={styles.container}>
        {errorsArray.map((error) => {
          return (
            <div key={error["msg"]} className={styles.error_container}>
              {error["msg"]}
            </div>
          );
        })}
        <h1 className={styles.title}>Sign Up</h1>
        <form onSubmit={(e) => handleSignUp(e)}>
          <label htmlFor="sign-up-username">Username:</label>
          <input
            type="text"
            name="username"
            id="sign-up-username"
            maxLength={255}
          />
          <label htmlFor="sign-up-password">Password:</label>
          <input
            type="password"
            name="password"
            id="sign-up-password"
            minLength={8}
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            minLength={8}
          />
          <button type="submit" className={styles.log_in_button}>
            Sign Up
          </button>
        </form>
        Or: <Link to="/login">Log In</Link>
      </div>
    );
};

export default SignUp;
