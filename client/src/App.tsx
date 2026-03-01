import { useParams } from "react-router";
import "./App.css";
import FileUploadForm from "./components/FileUploadForm";
import { AuthContext } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { getCurrentUserFetch, getAllUserFoldersFetch } from "./fetches/fetch";
import LogIn from "./components/LogIn";
import ErrorPage from "./error pages/ErrorPage";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import type { Folder, User } from "./types/types";
import Home from "./components/Home";
import { LoadContext } from "./context/LoadContext";
import { AudioContext } from "./context/AudioContext";
import { FolderContext } from "./context/FolderContext";
import {
  findFolderFromId,
  flatFolderArrayToNestedArray,
} from "./utils/functions";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [rootFolder, setRootFolder] = useState<Folder | null>(null);
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initiateFade, setInitiateFade] = useState(false);
  const { currPage, folderId } = useParams();

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
      setLoadToTrue();
      const user = await getCurrentUserFetch();
      setCurrentUser(user);
      setLoadToFalse();
    }
    setUser();
  }, []); // need to setUser on mount (or currPage?),
  //  need to null it out when user logged out(and/or let backend handle it with req.user?)

  useEffect(() => {
    async function buildRootFolder(id: number) {
      const rootFolderFetch = await getAllUserFoldersFetch(id);
      const tree = flatFolderArrayToNestedArray(rootFolderFetch);
      setRootFolder(tree);
    }
    if (currentUser) {
      buildRootFolder(currentUser.id);
    }
  }, [currentUser]);

  useEffect(() => {
    function setCurrentFolderFromFolderIdURL() {
      if (!rootFolder) return;
      if (!folderId) {
        setCurrentFolder(rootFolder);
      }

      function setFolderFromFolderIdURL() {
        const folder = findFolderFromId(rootFolder!, Number(folderId));
        if (folder) {
          setCurrentFolder(folder);
        } else setCurrentFolder(rootFolder);
      }
      setFolderFromFolderIdURL();
    }
    setCurrentFolderFromFolderIdURL();
  }, [folderId, rootFolder]);

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
              <FolderContext
                value={{
                  currentFolder,
                  rootFolder,
                  setCurrentFolder,
                  setRootFolder,
                }}
              >
                <Header></Header>
                {currPage === "login" ? (
                  <LogIn />
                ) : currPage === "signup" ? (
                  <SignUp />
                ) : currPage === "upload" ? (
                  <FileUploadForm></FileUploadForm>
                ) : currPage === "home" ? (
                  <Home />
                ) : (
                  <ErrorPage />
                )}
                <button onClick={() => console.log(currentFolder)}>
                  click
                </button>
              </FolderContext>
            </AudioContext>
          </LoadContext>
        </AuthContext>
      </>
    );
}

export default App;
