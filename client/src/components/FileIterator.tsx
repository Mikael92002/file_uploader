import type { File } from "../types/types";
import styles from "../css modules/Home.module.css";
import { useAudio } from "../context/AudioContext";
import { useLoad } from "../context/LoadContext";
import { useNavigate } from "react-router";
import { useFolder } from "../context/FolderContext";

const FileIterator = () => {
  const { clickSound } = useAudio();
  const { navLoad } = useLoad();
  const navigate = useNavigate();
  const { currentFolder } = useFolder();

  function navigateToFile(file: File) {
    clickSound();
    navLoad();
    navigate(`/file/${file.id}`);
  }

  return (
    <>
      {currentFolder?.files.map((file) => {
        return (
          <div
            className={styles.folder_files_div}
            key={file.id}
            onClick={() => {
              navigateToFile(file);
            }}
          >
            <img src={file.fileURL} alt="" height="20px" />
            <div className={styles.folder_files_name_div}>{file.fileName}</div>
          </div>
        );
      })}
    </>
  );
};

export default FileIterator;
