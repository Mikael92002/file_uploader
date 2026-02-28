import { useAuth } from "../context/AuthContext";
import { useFolder } from "../context/FolderContext";
import { useLoad } from "../context/LoadContext";
import { createFolderFetch } from "../fetches/fetch";
import type { DraftFolder } from "../types/types";
import { useNavigate } from "react-router";

const FolderCreateForm = () => {
  const { navLoad } = useLoad();
  const { currentUser, setCurrentUser } = useAuth();
  const { currentFolder, setCurrentFolder, rootFolder, setRootFolder } =
    useFolder();
  const navigate = useNavigate();

  async function createFolder(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const folderName = new FormData(e.target).get("folderName")!.toString();

    if (currentUser) {
      const dataAsObjects: DraftFolder = {
        folderName: folderName,
        userId: currentUser.id,
        files: [],
        parentId: currentFolder!.id,
        children: [],
      };

      const newFolderResponse = await createFolderFetch(dataAsObjects);
      if (newFolderResponse && newFolderResponse.status === 401) {
        // no user, setCurrUser to null, go to home
        setCurrentUser(null);
        navLoad();
        navigate("/");
      }
      if (newFolderResponse && newFolderResponse.ok) {
        const newFolder = await newFolderResponse.json();
        console.log("This is the new folder: ", newFolder);
        // should also setRootFolder...
        setCurrentFolder((prevFolder) => {
          if (!prevFolder) return null;
          return {
            ...prevFolder,
            children: [...prevFolder.children, newFolder],
          };
        });
        navLoad();
        navigate("/");
      }
    }

    // place in a folder state:
  }

  const cssStyle = {
    height: "100%",
  };

  return (
    <>
      <form onSubmit={(e) => createFolder(e)} style={cssStyle}>
        <label htmlFor="folderName">Folder Name:</label>
        <input type="text" required id="folderName" name="folderName" />
        <button type="submit">Create New Folder</button>
      </form>
    </>
  );
};

export default FolderCreateForm;
