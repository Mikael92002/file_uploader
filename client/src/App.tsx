import { useParams } from "react-router";
import "./App.css";
import FileUploadForm from "./components/FileUploadForm";
import { AuthContext } from "./context/Context";
import { useEffect, useState, useRef } from "react";
import { getCurrentUser } from "./fetches/fetch";
import LogIn from "./components/LogIn";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currPage } = useParams();

  useEffect(() => {
    async function setUser() {
      const user = await getCurrentUser();
      setCurrentUser(user);
      setIsLoading(false);
    }
    setUser();
  }, []); // need to setUser on mount, need to log them out when cookie expires...

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
          {currPage === "login" ? <LogIn /> : null}
        </AuthContext>
      </>
    );
}

export default App;
