import type { DraftFolder } from "../types/types";

export async function uploadFileFetch(formContents: FormData) {
  try {
    const uploadFile = await fetch(`/api/file/upload`, {
      method: "POST",
      body: formContents,
    });

    console.log(uploadFile);
  } catch (e) {
    console.error(e);
    return null;
  }
}

// notice returning null is best practice
// for error handling:
export async function getCurrentUserFetch() {
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

export async function logInFetch(data: { [k: string]: FormDataEntryValue }) {
  try {
    const response = await fetch("/api/auth/login", {
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

export async function signUpFetch(data: { [k: string]: FormDataEntryValue }) {
  try {
    const response = await fetch("/api/auth/signup", {
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

export async function signOutFetch() {
  try {
    const response = await fetch("/api/auth/signout");
    return response;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// returns response, await json in component
// and setCurrentUser(null)
// if response is 401
export async function createFolderFetch(data: DraftFolder) {
  try {
    const response = await fetch("/api/folder/", {
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

export async function getAllUserFoldersFetch(id: number) {
  try {
    const response = await fetch(`/api/folder/${id}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Response not ok: ${response.status}`);
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}
