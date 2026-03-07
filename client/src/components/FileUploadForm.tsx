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
  const [isWaiting, setIsWaiting] = useState(false);
  const [error, setErrors] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // do stuff after modal is open
  }

  function closeModal() {
    setErrors("");
    setIsOpen(false);
  }

  async function uploadForm(e: React.SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set("fileName", String(formData.get("fileName"))!.trim());
    formData.append("folderId", String(folderId));

    // in server: req.file = "file"
    setIsWaiting(true);
    const response = await uploadFileFetch(formData);
    const json = await response?.json();
    setIsWaiting(false);
    if (response?.ok) {
      const newRoot = insertFile(rootFolder!, json.newFile, folderId) as Folder;
      setRootFolder(newRoot);
      closeModal();
    } else if (response?.status === 400) {
      setErrors(json.error[0].msg);
    } else if (response?.status === 415) {
      setErrors(json.message);
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
          <div className={styles.error}>{error}</div>
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
          {isWaiting ? (
            <button disabled>Please wait...</button>
          ) : (
            <button type="submit" onClick={() => clickSound()}>
              Upload File
            </button>
          )}
          <div className={styles.info}>
            File types supported: jpeg/jpg/png/gif
          </div>
        </form>
      </Modal>
    </>
  );
};

export default FileUploadForm;
