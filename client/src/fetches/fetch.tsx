export async function uploadFileFetch(formContents: FormData) {
  const uploadFile = await fetch(`api/file/upload`, {
    method: "POST",
    body: formContents,
  });

  const response = await uploadFile.json();

  console.log(response);
}

// notice returning null is best practice
// for error handling:
export async function getCurrentUser() {
  try {
    const response = await fetch("/api/user");
    if (!response.ok) {
      const errorObj = await response.json();
      console.error(errorObj.message);
      return null;
    }

    const userObj = await response.json();
    return userObj.user;
  } catch (e) {
    console.error("Network error: ", e);
    return null;
  }
}

export async function logIn(data: { [k: string]: FormDataEntryValue; }) {
  try {
    const response = await fetch("api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (e) {
    console.error(e);
    return null;
  }
}
