import { useParams } from "react-router";
import "./App.css";
import FileUploadForm from "./components/FileUploadForm";
import { AuthContext } from "./context/Context";
import { useEffect, useState } from "react";
import { getCurrentUserFetch } from "./fetches/fetch";
import LogIn from "./components/LogIn";
import ErrorPage from "./error pages/ErrorPage";
import SignUp from "./components/SignUp";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currPage } = useParams();

  useEffect(() => {
    async function setUser() {
      const user = await getCurrentUserFetch();
      setCurrentUser(user);
      setIsLoading(false);
    }
    setUser();
  }, []); // need to setUser on mount (or currPage?),
  //  need to null it out when user logged out(or let backend handle it with req.user?)

  if (isLoading) {
    return (
      <div className="load-container">
        <div className="loader-text">loading...</div>
        <div className="loader"></div>
      </div>
    );
  } else
    return (
      <>
        <AuthContext value={currentUser}>
          {currPage === "login" ? (
            <LogIn />
          ) : currPage === "signup" ? (
            <SignUp />
          ) : currPage === undefined ? (
            <>{/* Home page goes here */}</>
          ) : (
            <ErrorPage />
          )}
        </AuthContext>
      </>
    );
}

export default App;
