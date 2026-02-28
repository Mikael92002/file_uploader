import { useState } from "react";
import Modal from "react-modal";
import styles from "../css modules/Home.module.css";
import { createFolderFetch } from "../fetches/fetch";
import type { DraftFolder, Folder } from "../types/types";
import { useFolder } from "../context/FolderContext";

interface FolderForm {
  folderParentId: number | null;
  clickSound: () => void;
}

const FolderCreateForm = ({ folderParentId, clickSound }: FolderForm) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const {setCurrentFolder} = useFolder();

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
    if(newFolderResponse && newFolderResponse.ok){
      const newFolder = await newFolderResponse.json()
      // set currentFolder
      setCurrentFolder((prevFolder)=>{
        if(!prevFolder) return null;
        return {...prevFolder, children: [...prevFolder.children, newFolder]}
      })
      closeModal();
    }
    else{
      //specify errors
    }
    console.log(newFolderResponse);
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
        <button className={styles.modalClose} onClick={() => closeModal()}>
          X
        </button>
        <form onSubmit={(e) => createFolder(e)} className={styles.modalForm}>
          {/* Add size, name constraints: */}
          <label htmlFor="folderName">Folder Name:</label>
          <input type="text" id="folderName" name="folderName" required />
          <button>Create Folder</button>
        </form>
      </Modal>
    </>
  );
};
export default FolderCreateForm;
