import { uploadFileFetch } from "../fetches/fetch";

const FileUploadForm = () => {
  async function uploadForm(e: React.SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target);
    // in server: req.file = "file"
    await uploadFileFetch(formData);

  }

  return (
    <form onSubmit={(e) => uploadForm(e)}>
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUploadForm;
