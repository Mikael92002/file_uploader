import type { File } from "../types/types";
import styles from "../css modules/Home.module.css";
import { useAudio } from "../context/AudioContext";
import { useLoad } from "../context/LoadContext";
import { useNavigate } from "react-router";
import { useFolder } from "../context/FolderContext";
import TrashSvg from "./TrashSvg";
import { deleteSingleFileFromDbAndCloudinaryFetch } from "../fetches/fetch";
import { recursiveFileDelete } from "../utils/functions";

const FileIterator = () => {
  const { clickSound } = useAudio();
  const { navLoad } = useLoad();
  const navigate = useNavigate();
  const { currentFolder, rootFolder, setRootFolder } = useFolder();

  function navigateToFile(file: File) {
    clickSound();
    navLoad();
    navigate(`/file/${file.id}`);
  }

  async function deleteFile(file: File) {
    if (confirm(`Are you sure you want to delete the file "${file.fileName}"?`)) {
      const deletedFile = await deleteSingleFileFromDbAndCloudinaryFetch(
        file.id,
      );
      if (deletedFile) {
        setRootFolder(recursiveFileDelete(file.id, rootFolder!));
      }
    }
  }

  return (
    <>
      {currentFolder?.files.map((file) => {
        return (
          <div className={styles.folder_files_master_container} key={file.id}>
            <div
              className={styles.folder_files_div}
              onClick={() => {
                navigateToFile(file);
              }}
            >
              <img src={file.fileURL} alt="" height="20px" />
              <div className={styles.folder_files_name_div}>
                {file.fileName}
              </div>
            </div>
            <button
              onClick={() => deleteFile(file)}
              className={styles.trash_container}
            >
              <TrashSvg />
            </button>
          </div>
        );
      })}
    </>
  );
};

export default FileIterator;
