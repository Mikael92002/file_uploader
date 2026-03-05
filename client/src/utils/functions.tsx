import type { Directory, Folder } from "../types/types";

//used to set array on app mount or user log in:
export function flatFolderArrayToNestedArray(arr: Folder[]) {
  const map = createFolderMap(arr);
  const root = map.get(null);
  let q = root || [];
  while (q.length > 0) {
    const nextLevel: Folder[] = [];
    for (let i = 0; i < q.length; i++) {
      const parentId = q[i].id;
      const childrenFromParentId = map.get(parentId);
      q[i].children = childrenFromParentId ? childrenFromParentId : [];
      nextLevel.push(...q[i].children);
    }
    q = nextLevel;
  }
  return root![0];
}

function createFolderMap(arr: Folder[]) {
  const map = new Map<number | null, Folder[]>();
  for (const folder of arr) {
    const existingArr = map.get(folder.parentId);
    if (existingArr) {
      existingArr.push(folder);
    } else {
      map.set(folder.parentId, [folder]);
    }
  }
  return map;
}

// used to setCurrentFolder:
export function findFolderFromId(rootFolder: Folder, id: number) {
  // do bfs from rootFolder:
  if (id === rootFolder.id) {
    return rootFolder;
  }
  const root = [rootFolder];
  let q = root || [];
  while (q.length > 0) {
    const nextLevel: Folder[] = [];
    for (let i = 0; i < q.length; i++) {
      for (let j = 0; j < q[i].children.length; j++) {
        if (q[i].children[j].id === id) {
          return q[i].children[j];
        }
      }
      nextLevel.push(...q[i].children);
    }
    q = nextLevel;
  }
  return null;
}

export function insertInRootFolder(
  newFolder: Folder,
  targetId: number,
  root: Folder,
) {
  // If in root:
  if (!targetId) {
    return { ...root, children: [...root.children, newFolder] };
  }
  // else search:
  const updatedTree = recursiveInsert(root, targetId, newFolder);
  // if updatedTree null (shouldn't happen), return old root:
  return updatedTree ?? root;
}

function recursiveInsert(
  folder: Folder,
  targetId: number,
  newFolder: Folder,
): Folder | null {
  if (folder.id === targetId) {
    return { ...folder, children: [...folder.children, newFolder] };
  }
  if (folder.children.length === 0) {
    return null;
  }
  for (let i = 0; i < folder.children.length; i++) {
    const child: Folder | null = recursiveInsert(
      folder.children[i],
      targetId,
      newFolder,
    );
    if (child !== null) {
      const newChildArr = folder.children.map((childObj) => {
        if (childObj === folder.children[i]) {
          return child;
        } else return childObj;
      });
      return { ...folder, children: newChildArr };
    }
  }
  return null;
}

export function getPath(folderId: number | undefined, root: Folder | null) {
  if (!folderId || !root) return [{ id: root?.id, folderName: "root" }];
  const path = recursiveFolderPath(root, folderId);
  return path ?? null;
}

function recursiveFolderPath(
  folder: Folder,
  folderId: number,
): Directory[] | null {
  if (folderId === folder.id) {
    return [{ id: folder.id, folderName: folder.folderName }];
  }
  if (folder.children.length === 0) {
    return null;
  }
  for (let i = 0; i < folder.children.length; i++) {
    const child: Directory[] | null = recursiveFolderPath(
      folder.children[i],
      folderId,
    );
    if (child !== null) {
      return [{ id: folder.id, folderName: folder.folderName }, ...child];
    }
  }
  return null;
}

export function getFile(fileId: number, root: Folder | null) {
  if (!root) return null;

  let q = [root];

  while (q.length > 0) {
    const nextLevel: Folder[] = [];

    for (let i = 0; i < q.length; i++) {
      for (let j = 0; j < q[i].files.length; j++) {
        if (q[i].files[j].id === fileId) {
          return q[i].files[j];
        }
      }
      for (let j = 0; j < q[i].children.length; j++) {
        nextLevel.push(...q[i].children);
      }
      q = nextLevel;
    }
  }
  return null;
}

export function insertFile(root: Folder, file: File, targetId: number) {
  if (!targetId) {
    return { ...root, files: [...root.files, file] };
  }
  return recursiveFileInsert(file, targetId, root);
}

function recursiveFileInsert(file: File, targetId: number, folder: Folder) {
  if (targetId === folder.id) {
    return { ...folder, files: [...folder.files, file] };
  }
  if (folder.children.length === 0) {
    return null;
  }
  for (let i = 0; i < folder.children.length; i++) {
    const child = recursiveFileInsert(file, targetId, folder.children[i]);
    if (child) {
      folder.children[i] = child as Folder;
      return { ...folder };
    }
  }

  return null;
}

export function recursiveFolderDelete(id: number, folder: Folder) {
  // id can never be root id
  if (id === folder.id) {
    return folder;
  }
  if (folder.children.length === 0) {
    return null;
  }
  for (let i = 0; i < folder.children.length; i++) {
    const child = recursiveFolderDelete(id, folder.children[i]);
    if (child) {
      const newChildArr = folder.children.filter((childObj) => {
        if (childObj !== folder.children[i]) {
          return childObj;
        }
      });
      return { ...folder, children: newChildArr };
    }
  }
  return null;
}

export function recursiveFileGet(folder: Folder) {
  let q = [folder];
  const fileURLArr: Array<{ fileURL: string }> = [];
  while (q.length > 0) {
    const nextLevel: Folder[] = [];
    for (let i = 0; i < q.length; i++) {
      for (let j = 0; j < q[i].files.length; j++) {
        fileURLArr.push({ fileURL: q[i].files[j].fileURL });
      }
      nextLevel.push(...q[i].children);
    }
    q = nextLevel;
  }
  return fileURLArr;
}

export function recursiveFileDelete(targetId: number, folder: Folder) {
  for (let i = 0; i < folder.files.length; i++) {
    if (folder.files[i].id === targetId) {
      return folder;
    }
  }
  if (folder.children.length === 0) {
    return null;
  }
  for (let i = 0; i < folder.children.length; i++) {
    const child: Folder | null = recursiveFileDelete(
      targetId,
      folder.children[i],
    );
    if (child) {
      const newFileArr = folder.children[i].files.filter((fileChild) => {
        return fileChild.id !== targetId;
      });
      folder.children[i] = { ...folder.children[i], files: newFileArr };
      return { ...folder };
    }
  }
  return null;
}
