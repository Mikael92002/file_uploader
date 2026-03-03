import { uploadFileFetch } from "../fetches/fetch";
import Modal from "react-modal";
import styles from "../css modules/Home.module.css";
import { useState } from "react";
import { useFolder } from "../context/FolderContext";
import { insertFile } from "../utils/functions";
import type { File, Folder } from "../types/types";
interface FileForm {
  folderId: number;
}

const FileUploadForm = ({ folderId }: FileForm) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { setRootFolder, rootFolder } = useFolder();

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // do stuff after modal is open
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function uploadForm(e: React.SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("folderId", String(folderId));
    console.log(formData);

    // in server: req.file = "file"
    const response = await uploadFileFetch(formData);
    if (response?.ok) {
      const json = await response.json();
      const newRoot = insertFile(rootFolder!, json.newFile, folderId) as Folder;
      setRootFolder(newRoot);
      closeModal();
    }
    console.log(response);
  }
  const tempStyle = {
    backgroundColor: "white",
  };

  Modal.setAppElement("#root");
  return (
    <>
      <button className={styles.file} onClick={() => openModal()}>
        New File
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <form onSubmit={(e) => uploadForm(e)} style={tempStyle}>
          <label htmlFor="fileName">File Name:</label>
          <input type="text" name="fileName" maxLength={25} required />
          <input type="file" name="file" required />
          <button type="submit">Upload</button>
        </form>
      </Modal>
    </>
  );
};

export default FileUploadForm;
