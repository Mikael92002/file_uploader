import { useState } from "react";
import Modal from "react-modal";
import styles from "../css modules/Home.module.css";
import { createFolderFetch } from "../fetches/fetch";
import type { DraftFolder } from "../types/types";
import { useFolder } from "../context/FolderContext";
import { insertInRootFolder } from "../utils/functions";
import { useParams } from "react-router";

interface FolderForm {
  folderParentId: number | null;
  clickSound: () => void;
}

const FolderCreateForm = ({ folderParentId, clickSound }: FolderForm) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { setRootFolder, rootFolder } = useFolder();
  const { folderId } = useParams();

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // do stuff after modal is open
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function createFolder(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const folderName = new FormData(e.target).get("folderName")?.toString();
    const folderObject: DraftFolder = {
      folderName: folderName!,
      parentId: folderParentId,
    };

    const newFolderResponse = await createFolderFetch(folderObject);
    if (newFolderResponse && newFolderResponse.ok) {
      const newFolder = await newFolderResponse.json();
      // set rootFolder
      const newRoot = insertInRootFolder(
        newFolder,
        Number(folderId),
        rootFolder!,
      );
      setRootFolder(newRoot);
      closeModal();
    } else {
      //specify errors (name constraints)
    }
  }

  Modal.setAppElement("#root");
  return (
    <>
      <button
        className={styles.folder}
        onClick={() => {
          clickSound();
          openModal();
        }}
      >
        New Folder
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div>New Folder</div>
        <button
          className={styles.modalClose}
          onClick={() => {
            clickSound();
            closeModal();
          }}
        >
          X
        </button>
        <form onSubmit={(e) => createFolder(e)} className={styles.modalForm}>
          {/* Add size, name constraints: */}
          <label htmlFor="folderName">Folder Name:</label>
          <input type="text" id="folderName" name="folderName" required />
          <button type="submit" onClick={() => clickSound()}>
            Create Folder
          </button>
        </form>
      </Modal>
    </>
  );
};
export default FolderCreateForm;
