import { signUpFetch } from "../fetches/fetch";
import { useNavigate } from "react-router";
import { useState } from "react";

const SignUp = () => {
  const [errorsArray, setErrorsArray] = useState([]);

  const navigate = useNavigate();
  async function handleSignUp(e: React.SubmitEvent) {
    e.preventDefault();

    const dataAsObjects = Object.fromEntries(new FormData(e.target));

    const signUpResponse = await signUpFetch(dataAsObjects);
    console.log(signUpResponse);
    if (signUpResponse?.ok) {
      setErrorsArray([]);
      navigate("/");
    } else if (signUpResponse?.status === 400) {
      const signUpObj = await signUpResponse.json();
      console.log(signUpObj);
      setErrorsArray(signUpObj.errors);
    }
  }

  return (
    <>
      {errorsArray.map((error) => {
        return <div key={error["msg"]}>{error["msg"]}</div>;
      })}
      <form onSubmit={(e) => handleSignUp(e)}>
        <label htmlFor="sign-up-username">Username:</label>
        <input type="text" name="username" id="sign-up-username" />
        <label htmlFor="sign-up-password">Password:</label>
        <input type="password" name="password" id="sign-up-password" />
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUp;
