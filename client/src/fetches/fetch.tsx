export async function uploadFileFetch(formContents: FormData) {
  const uploadFile = await fetch(`api/file/upload`, {
    method: "POST",
    body: formContents,
  });

  const response = await uploadFile.json();

  console.log(response);
}
