import { createFolderFetch } from "../fetches/fetch";
import type { FolderFormObject } from "../types/types";
import { useNavigate } from "react-router";

const FolderCreateForm = ({setCurrFolder}) => {
  // const navigate = useNavigate();

  async function createFolder(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const dataAsObjects: FolderFormObject = {
      ...Object.fromEntries(new FormData(e.target)),
      folderId: 1,
      parentId: 1,
    };

    const newFolder = await createFolderFetch(dataAsObjects);
    console.log(newFolder);
    // place in a folder state:
  }

  return (
    <>
      <form onSubmit={(e) => createFolder(e)}>
        <label htmlFor="folderName">Folder Name:</label>
        <input type="text" required id="folderName" name="folderName" />
        <button type="submit">Create New Folder</button>
      </form>
    </>
  );
};

export default FolderCreateForm;
