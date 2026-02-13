import { useContext, useEffect } from "react";
import { AuthContext } from "../context/Context";
import { Link } from "react-router";
import { signOutFetch } from "../fetches/fetch";
import { useNavigate } from "react-router";

const Header = () => {
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  async function signOut() {
    const signOutResponse = await signOutFetch();
    if (signOutResponse?.ok) {
      navigate("/login");
    }
  }

  return (
    <div className="title">
      {user && <button className="pseudo sign-out">Sign out</button>}
      {!user && (
        <div className="pseudo register">
          <button>Log In</button>
          <button>Sign Up</button>
        </div>
      )}
      <h1>FILE UPLOADER</h1>
      {user && (
        <button onClick={() => signOut()} className="sign-out">
          Sign out
        </button>
      )}
      {!user && (
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
