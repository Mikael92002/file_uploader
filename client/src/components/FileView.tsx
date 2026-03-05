import { Link, useNavigate, useParams } from "react-router";
import styles from "../css modules/FileView.module.css";
import { useMemo } from "react";
import { useFolder } from "../context/FolderContext";
import { getFile } from "../utils/functions";
import ErrorPage from "../error pages/ErrorPage";
import { useAudio } from "../context/AudioContext";
import load from "../css modules/Load.module.css";

// ends in: /:file/:folderId

const FileView = () => {
  const { folderId } = useParams();
  const { rootFolder } = useFolder();
  const navigate = useNavigate();
  const { clickSound } = useAudio();

  const file = useMemo(() => {
    return getFile(Number(folderId), rootFolder);
  }, [folderId, rootFolder]);
  if (!file || !rootFolder) {
    return <ErrorPage />;
  } else
    return (
      <div className={`${styles.container} ${load.load_container}`}>
        <div className={styles.leftContainer}>
          <h2 className={styles.fileName}>{file.fileName}</h2>
          <div className={styles.img_container}>
            <img src={file.fileURL} alt="file image" />
          </div>
        </div>
        <div className={styles.rightContainer}>
          <h2>File info</h2>
          <div className={styles.info}>
            <div>Size: {file.size} Bytes</div>
            <div>Uploaded on: {new Date(file.uploadTime).toLocaleString()}</div>
            <button
              onClick={() => {
                clickSound();
                navigate(-1);
              }}
            >
              Back To Folder
            </button>
          </div>
        </div>
      </div>
    );
};

export default FileView;
