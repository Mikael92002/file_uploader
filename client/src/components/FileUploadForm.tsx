import { uploadFileFetch } from "../fetches/fetch";
import Modal from "react-modal";
import styles from "../css modules/Modal.module.css";
import { useState } from "react";
import { useFolder } from "../context/FolderContext";
import { insertFile } from "../utils/functions";
import type { Folder } from "../types/types";
import { useAudio } from "../context/AudioContext";
interface FileForm {
  folderId: number;
}

const FileUploadForm = ({ folderId }: FileForm) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { setRootFolder, rootFolder } = useFolder();
  const { clickSound } = useAudio();

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
    closeModal();
    const formData = new FormData(e.target);
    formData.append("folderId", String(folderId));

    // in server: req.file = "file"
    const response = await uploadFileFetch(formData);
    if (response?.ok) {
      const json = await response.json();
      const newRoot = insertFile(rootFolder!, json.newFile, folderId) as Folder;
      setRootFolder(newRoot);
    }
  }

  Modal.setAppElement("#root");
  return (
    <>
      <button
        className={styles.file}
        onClick={() => {
          clickSound();
          openModal();
        }}
      >
        New File
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div>New File</div>
        <button
          className={styles.modalClose}
          onClick={() => {
            clickSound();
            closeModal();
          }}
        >
          X
        </button>
        <form onSubmit={(e) => uploadForm(e)}>
          <div className={styles.fileName_input_label_container}>
            <label htmlFor="file_name">File Name:</label>
            <input
              type="text"
              name="fileName"
              maxLength={25}
              required
              id="file_name"
            />
          </div>
          <div className={styles.fileUpload_input_label_container}>
            <label htmlFor="file_upload">File:</label>
            <input type="file" name="file" required id="file_upload" />
          </div>
          <button type="submit" onClick={() => clickSound()}>
            Upload
          </button>
        </form>
      </Modal>
    </>
  );
};

export default FileUploadForm;
