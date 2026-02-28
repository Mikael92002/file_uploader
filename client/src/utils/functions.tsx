import type { Folder } from "../types/types";

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

// used to setCurrentFolder:
export function findFolderFromId(rootFolder: Folder, id: number) {
  // do dfs from rootFolder:
  return folderRecursive([rootFolder], id);
}

function folderRecursive(folder: Folder[], id: number) {
  const root = folder;
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
