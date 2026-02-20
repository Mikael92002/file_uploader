import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";
import { signOutFetch } from "../fetches/fetch";
import { useNavigate } from "react-router";
import { useAudio } from "../context/AudioContext";

const Header = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const { clickSound } = useAudio();
  const navigate = useNavigate();

  async function signOut() {
    const signOutResponse = await signOutFetch();
    if (signOutResponse?.ok) {
      setCurrentUser(null);
      navigate("/login");
    }
  }

  return (
    <div className="title">
      {currentUser && <button className="pseudo sign-out">Sign out</button>}
      {!currentUser && (
        <div className="pseudo register">
          <button>Log In</button>
          <button>Sign Up</button>
        </div>
      )}
      <h1>FILE UPLOADER</h1>
      {currentUser && (
        <button
          onClick={() => {
            clickSound();
            signOut();
          }}
          className="sign-out"
        >
          Sign out
        </button>
      )}
      {!currentUser && (
        <div className="register">
          <div className="pseudo register">
            <button>
              <Link to="/login">Log In</Link>
            </button>
            <button>
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
