import { useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router";
import styles from "../css modules/Home.module.css";
import load from "../css modules/Load.module.css";
import HomeSvg from "./HomeSvg";
import { useLoad } from "../context/LoadContext";
import { useAudio } from "../context/AudioContext";
import folderImg from "../assets/folder.png";
import { useFolder } from "../context/FolderContext";
import { getPath, recursiveFolderDelete } from "../utils/functions";
import FolderCreateForm from "./FolderCreateForm";
import FileUploadForm from "./FileUploadForm";
import { deleteFolderFetch } from "../fetches/fetch";

const Home = () => {
  // setCurrFolder called whenever:
  // folder created, deleted, clicked, or back-clicked

  const { currentUser } = useAuth();
  const { navLoad } = useLoad();
  const { clickSound } = useAudio();
  const { currentFolder, rootFolder } = useFolder();

  const { folderId } = useParams();
  const directory = useMemo(() => {
    return getPath(Number(folderId), rootFolder);
  }, [rootFolder, folderId]);

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
                navigate("/home");
              }}
            />
          </div>
          <div className={styles.directory}>
            {directory.map((directoryObj) => {
              return (
                <span
                  onClick={() => {
                    clickSound();
                    navigate(`/home/${directoryObj.id}`);
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
          <FileUploadForm
            folderId={Number(folderId) || rootFolder!.id}
          ></FileUploadForm>
        </div>
        {/* only render the ones in the curr directory:  */}
        <div className={styles.folder_files_container}>
          {currentFolder?.children?.map((folder) => {
            return (
              <>
                <div
                  className={styles.folder_files_div}
                  onClick={() => {
                    clickSound();
                    navigate(`/home/${folder.id}`);
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
                <button onClick={() => {
                  //************ */ TO DELETE!!!!!!!!!!!!!!!!! setRootFolder to:
                  console.log(recursiveFolderDelete(folder.id, rootFolder!));
                }}>Del fol</button></>
            );
          })}
          {currentFolder?.files?.map((file) => {
            return (
              <div
                className={styles.folder_files_div}
                key={file.id}
                onClick={() => {
                  clickSound();
                  navLoad();
                  navigate(`/file/${file.id}`);
                }}
              >
                <img src={file.fileURL} alt="" height="20px" />
                <div className={styles.folder_files_name_div}>{file.fileName}</div>
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={() => console.log(getPath(35, rootFolder!))}>
        path
      </button>
    </div>
  );
};

export default Home;
