import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import styles from "../css modules/Home.module.css";
import load from "../css modules/Load.module.css";
import HomeSvg from "./HomeSvg";
import { useLoad } from "../context/LoadContext";
import { useAudio } from "../context/AudioContext";

const Home = () => {
  const { currentUser } = useAuth();
  const { navLoad } = useLoad();
  const { clickSound } = useAudio();

  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navLoad();
      navigate("/login");
    }
  }, [navigate, currentUser, navLoad]);

  const userStyle = {
    "--chars": 30 + (currentUser?.username?.length ?? 0),
  };

  if (!currentUser) {
    return null;
  }
  return (
    <div className={`${styles.home_container} ${load.load_container}`}>
      <div className={styles.greeting_container}>
        <div
          className={styles.greeting}
          style={userStyle as React.CSSProperties}
        >
          HELLO {currentUser?.username}...
        </div>
      </div>
      <div className={styles.main_container}>
        <div className={styles.action_container}>
          {/* MUST get below from req.params?
        Makes more sense to get from ui */}
          <HomeSvg />
          <span className={styles.directory}>/</span>
          <button
            className={styles.folder}
            onClick={() => {
              clickSound();
              navigate("/createFolder")
            }}
          >
            New Folder
          </button>
          <button
            className={styles.file}
            onClick={() => {
              clickSound();
              navigate("/upload");
            }}
          >
            + File
          </button>
        </div>
        <div className={styles.folder_files_container}></div>
      </div>
    </div>
  );
};

export default Home;
