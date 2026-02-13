import { useParams } from "react-router";
import "./App.css";
import FileUploadForm from "./components/FileUploadForm";
import { AuthContext } from "./context/Context";
import { useEffect, useState } from "react";
import { getCurrentUserFetch } from "./fetches/fetch";
import LogIn from "./components/LogIn";
import ErrorPage from "./error pages/ErrorPage";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import type { User } from "./types/types";
import Home from "./components/Home";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initiateFade, setInitiateFade] = useState(false);
  const { currPage } = useParams();

  useEffect(() => {
    async function setUser() {
      const user = await getCurrentUserFetch();
      setCurrentUser(user);
      setInitiateFade(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 250);
    }
    setUser();
  }, [currPage]); // need to setUser on mount (or currPage?),
  //  need to null it out when user logged out(and/or let backend handle it with req.user?)

  if (isLoading) {
    return (
      <>
        <Header></Header>
        <div className={`load-container ${initiateFade === true && "fade"}`}>
          <div className="loader-text">LOADING...</div>
          <div className="loader"></div>
        </div>
      </>
    );
  } else
    return (
      <>
        <AuthContext value={currentUser}>
          <Header></Header>
          {currPage === "login" ? (
            <LogIn />
          ) : currPage === "signup" ? (
            <SignUp />
          ) : currPage === undefined ? (
            <Home />
          ) : (
            <ErrorPage />
          )}
        </AuthContext>
      </>
    );
}

export default App;
