import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import styles from "../css modules/Home.module.css";
import load from "../css modules/Load.module.css";
import HomeSvg from "./HomeSvg";
import { useLoad } from "../context/LoadContext";
import { useAudio } from "../context/AudioContext";
import folderImg from "../assets/folder.png";
import { useFolder } from "../context/FolderContext";
import { findFolderFromId } from "../utils/functions";
import type { Directory } from "../types/types";
import FolderCreateForm from "./FolderCreateForm";

const Home = () => {
  // setCurrFolder called whenever:
  // folder created, deleted, clicked, or back-clicked

  const { currentUser } = useAuth();
  const { navLoad } = useLoad();
  const { clickSound } = useAudio();
  const { setCurrentFolder, currentFolder, rootFolder } = useFolder();
  const [directory, setDirectory] = useState<Array<Directory>>([]);

  function pushToDirectory(newFolder: { id: number; folderName: string }) {
    setDirectory((prevDirectory) => {
      return [...prevDirectory, newFolder];
    });
  }

  function setDirectoryToRoot() {
    setDirectory([]);
    setCurrentFolder(rootFolder);
  }

  function removeFromDirectoryAfterFolder(folder: Directory) {
    const index = directory.findIndex(
      (folderInDirectory) =>
        folder.id === folderInDirectory.id &&
        folder.folderName === folderInDirectory.folderName,
    );
    const newArr = directory.slice(0, index + 1);
    setDirectory(newArr);
    const foundFolder = findFolderFromId(
      rootFolder!,
      newArr[newArr.length - 1].id,
    );
    console.log(foundFolder);
    setCurrentFolder(foundFolder);
  }

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
          <div className={styles.svg_container}>
            <HomeSvg
              homeClick={() => {
                clickSound();
                setDirectoryToRoot();
              }}
            />
          </div>
          <div className={styles.directory}>
            <span
              onClick={() => {
                clickSound();
                setDirectoryToRoot();
              }}
            >
              home
            </span>
            /
            {directory.map((directoryObj) => {
              return (
                <span
                  onClick={() => {
                    clickSound();
                    removeFromDirectoryAfterFolder(directoryObj);
                  }}
                  key={directoryObj.id}
                >
                  {directoryObj.folderName}/
                </span>
              );
            })}
          </div>
          <FolderCreateForm
            folderParentId={currentFolder?.id ?? null}
            clickSound={clickSound}
          ></FolderCreateForm>
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
        {/* only render the ones in the curr directory:  */}
        <div className={styles.folder_files_container}>
          {currentFolder?.children?.map((folder) => {
            return (
              <div
                className={styles.folder_files_div}
                onClick={() => {
                  pushToDirectory({
                    id: folder.id,
                    folderName: folder.folderName,
                  });
                  clickSound();
                  setCurrentFolder(folder);
                }}
                key={folder.id}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
