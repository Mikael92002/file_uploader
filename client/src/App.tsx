import { useParams } from "react-router";
import "./App.css";
import FileUploadForm from "./components/FileUploadForm";
import { AuthContext } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { getCurrentUserFetch } from "./fetches/fetch";
import LogIn from "./components/LogIn";
import ErrorPage from "./error pages/ErrorPage";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import type { User } from "./types/types";
import Home from "./components/Home";
import { useNavigation } from "react-router";
import { LoadContext } from "./context/LoadContext";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initiateFade, setInitiateFade] = useState(false);
  const { currPage } = useParams();
  const navigation = useNavigation();

  // called whenever we are navigating (and initial data fetch),
  // so attach to useNavigate(?):
  function setLoadToTrue() {
    setIsLoading(true);
    setInitiateFade(false);
  }

  // should be called with useEffect when component is first mounted?:
  function setLoadToFalse() {
    setTimeout(()=>{
      setInitiateFade(true)
    }, 500)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  function navLoad(){
    setLoadToTrue();
    setLoadToFalse();
  }

  useEffect(() => {
    async function setUser() {
      const user = await getCurrentUserFetch();
      setCurrentUser(user);
      setLoadToFalse();
    }
    setUser();
  }, []); // need to setUser on mount (or currPage?),
  //  need to null it out when user logged out(and/or let backend handle it with req.user?)

  if (isLoading || navigation.state === "loading") {
    return (
      <>
        <AuthContext value={{ currentUser, setCurrentUser }}>
          <Header></Header>
        </AuthContext>
        <div className={`load-container ${initiateFade === true && "fade"}`}>
          <div className="loader-text">LOADING...</div>
          <div className="loader"></div>
        </div>
      </>
    );
  } else
    return (
      <>
        <AuthContext value={{ currentUser, setCurrentUser }}>
          <LoadContext value={{ isLoading, setLoadToFalse, setLoadToTrue, navLoad }}>
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
          </LoadContext>
        </AuthContext>
      </>
    );
}

export default App;
