import { useAudio } from "../context/AudioContext";
import { useNavigate } from "react-router";
import { useFolder } from "../context/FolderContext";
import styles from "../css modules/Home.module.css";
import folderImg from "../assets/folder.png";
import { deleteFolderFetch, deleteManyFilesFetch } from "../fetches/fetch";
import type { Folder } from "../types/types";
import { recursiveFileGet, recursiveFolderDelete } from "../utils/functions";
import TrashSvg from "./TrashSvg";

const FolderIterator = () => {
  const { clickSound } = useAudio();
  const navigate = useNavigate();
  const { currentFolder, rootFolder, setRootFolder } = useFolder();

  async function deleteFolder(folder: Folder) {
    clickSound();
    if (
      confirm(
        `Are you sure you want to delete the folder "${folder.folderName}"?`,
      )
    ) {
      try {
        const fileArr = recursiveFileGet(folder);
        await deleteManyFilesFetch(fileArr);
        const deletedFolder = await deleteFolderFetch(folder.id);
        if (deletedFolder) {
          const currFolder = recursiveFolderDelete(folder.id, rootFolder!);
          setRootFolder(currFolder);
        }
      } catch (e) {
        console.error("Error deleting folder: ", e);
      }
    }
  }

  return (
    <>
      {currentFolder?.children.map((folder) => {
        return (
          <div className={styles.folder_files_master_container} key={folder.id}>
            <div
              className={styles.folder_files_div}
              onClick={() => {
                clickSound();
                navigate(`/home/${folder.id}`);
              }}
            >
              <img
                src={folderImg}
                alt="folder image"
                width="40px"
                height="40px"
              />
              <div className={styles.folder_files_name_div}>
                {folder.folderName}
              </div>
            </div>
            <button
              onClick={() => deleteFolder(folder)}
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
export default FolderIterator;
