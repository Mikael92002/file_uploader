import { useContext, useEffect } from "react";
import { AuthContext } from "../context/Context";
import { useNavigate } from "react-router";
import styles from "../css modules/Home.module.css";
import HomeSvg from "./HomeSvg";

const Home = () => {
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [navigate, currentUser]);

  const userStyle = {
    "--chars": 30 + (currentUser?.username?.length ?? 0),
  };

  if (!currentUser) {
    return null;
  }
  return (
    <div className={styles.home_container}>
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
          <button className={styles.folder}>New Folder</button>
          <button className={styles.file}>+ File</button>
        </div>
        <div className={styles.folder_files_container}></div>
      </div>
    </div>
  );
};

export default Home;
