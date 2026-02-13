import { useEffect, useState } from "react";
import { logInFetch } from "../fetches/fetch";
import { useNavigate, Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/Context";

const LogIn = () => {
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);

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
      <>
        <h1>Log In</h1>
        <form onSubmit={(e) => LogInSubmit(e)}>
          <div>{errorMessage}</div>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="log-in-username" />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="log-in-password" />
          <button type="submit">Log In</button>
        </form>
        Or: <Link to="/signup">sign up</Link>
      </>
    );
};

export default LogIn;
