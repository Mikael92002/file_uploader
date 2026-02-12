import { useState } from "react";
import { logIn } from "../fetches/fetch";
import { useNavigate } from "react-router";
import { useContext } from "react";

const LogIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  async function LogInSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const formDataAsObj = Object.fromEntries(new FormData(e.target));
    const logInResponse = await logIn(formDataAsObj);
    console.log(logInResponse);
    if (logInResponse?.url.endsWith("/success")) {
      setErrorMessage("");
      navigate("/");
    } else if (logInResponse?.url.endsWith("/failure")) {
      setErrorMessage("Incorrect username or password");
    }
  }
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
    </>
  );
};

export default LogIn;
