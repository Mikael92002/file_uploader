import { useParams } from "react-router";
import "./App.css";
import FileUploadForm from "./components/FileUploadForm";
import { AuthContext } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { getCurrentUserFetch, getRootFolderFetch } from "./fetches/fetch";
import LogIn from "./components/LogIn";
import ErrorPage from "./error pages/ErrorPage";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import type { User } from "./types/types";
import Home from "./components/Home";
import { LoadContext } from "./context/LoadContext";
import { AudioContext } from "./context/AudioContext";
import FolderCreateForm from "./components/FolderCreateForm";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [rootFolder, setRootFolder] = useState(null);
  const [currFolder, setCurrFolder] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initiateFade, setInitiateFade] = useState(false);
  const { currPage } = useParams();

  // called whenever we are navigating (and initial data fetch),
  // so attach to useNavigate(?):
  function setLoadToTrue() {
    setIsLoading(true);
    setInitiateFade(false);
  }

  // should be called with useEffect when component is first mounted?:
  function setLoadToFalse() {
    setTimeout(() => {
      setInitiateFade(true);
    }, 500);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  function navLoad() {
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

  useEffect(() => {
    async function setUserFolders() {
      const rootFolder = await getRootFolderFetch();
      setRootFolder(rootFolder);
      setCurrFolder(rootFolder);
    }
    if (currentUser) {
      setUserFolders();
    }
  }, [currentUser]);

  const audio = new Audio("/click.mp3");
  function clickSound() {
    audio.play();
  }

  if (isLoading) {
    return (
      <>
        <AuthContext value={{ currentUser, setCurrentUser }}>
          <AudioContext value={{ clickSound }}>
            <Header></Header>
          </AudioContext>
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
          <LoadContext
            value={{ isLoading, setLoadToFalse, setLoadToTrue, navLoad }}
          >
            <AudioContext value={{ clickSound }}>
              <Header></Header>
              {currPage === "login" ? (
                <LogIn />
              ) : currPage === "signup" ? (
                <SignUp />
              ) : currPage === "upload" ? (
                <FileUploadForm></FileUploadForm>
              ) : currPage === "createFolder" ? (
                <FolderCreateForm
                  setCurrFolder={setCurrFolder}
                ></FolderCreateForm>
              ) : currPage === undefined ? (
                <Home setCurrFolder={setCurrFolder} currFolder={currFolder} />
              ) : (
                <ErrorPage />
              )}
            </AudioContext>
          </LoadContext>
        </AuthContext>
      </>
    );
}

export default App;
