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
