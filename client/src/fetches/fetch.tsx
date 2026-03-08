import type { DraftFolder } from "../types/types";

const apiUrl = import.meta.env.VITE_API_URL || "";

export async function uploadFileFetch(formContents: FormData) {
  try {
    const uploadFile = await fetch(`${apiUrl}/api/file/upload`, {
      method: "POST",
      body: formContents,
      credentials: "include",
    });

    return uploadFile;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// notice returning null is best practice
// for error handling:
export async function getCurrentUserFetch() {
  try {
    const response = await fetch(`${apiUrl}/api/user`, {
      credentials: "include",
    });

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
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      credentials: "include",
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
    const response = await fetch(`${apiUrl}/api/auth/signup`, {
      method: "POST",
      credentials: "include",
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
    const response = await fetch(`${apiUrl}/api/auth/signout`, {
      credentials: "include",
    });
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
    const response = await fetch(`${apiUrl}/api/folder/`, {
      method: "POST",
      credentials: "include",
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
    const response = await fetch(`${apiUrl}/api/folder/${id}`, {
      credentials: "include",
    });
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

export async function deleteFolderFetch(id: number) {
  try {
    const response = await fetch(`${apiUrl}/api/folder/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      throw new Error(`Response not ok: ${response.status}`);
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function deleteSingleFileFromDbAndCloudinaryFetch(fileId: number) {
  try {
    const deleteFileResponse = await fetch(`${apiUrl}/api/file/${fileId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!deleteFileResponse.ok) {
      throw new Error(`Response not ok: ${deleteFileResponse.status}`);
    }
    return await deleteFileResponse.json();
  } catch (e) {
    console.error(e);
  }
}

export async function deleteManyFilesFetch(data: Array<{ fileURL: string }>) {
  try {
    const deleteManyFilesResponse = await fetch(`${apiUrl}/api/file/delete`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!deleteManyFilesResponse.ok) {
      throw new Error("Response not ok: " + deleteManyFilesResponse.status);
    }
    return await deleteManyFilesResponse.json();
  } catch (e) {
    console.error(e);
  }
}

export async function validateFile(fileAndFolder: {
  fileName: string;
  folderId: number;
}) {
  try {
    const validationResponse = await fetch(`${apiUrl}/api/file/validate`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fileAndFolder),
      credentials: "include",
    });
    return validationResponse;
  } catch (e) {
    console.error(e);
    return null;
  }
}
