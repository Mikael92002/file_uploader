import { useParams } from "react-router";
import "./App.css";
import FileUploadForm from "./components/FileUploadForm";
import { AuthContext } from "./context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getCurrentUser } from "./fetches/fetch";
import LogIn from "./components/LogIn";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const { currPage } = useParams();

  useEffect(() => {
    async function setUser() {
      const user = await getCurrentUser();
      setCurrentUser(user);
    }
    setUser();
  }, [currPage]); // need to get user whenever currPage is changed

  return <>{currPage === "login" ? <LogIn /> : null}</>;
}

export default App;
