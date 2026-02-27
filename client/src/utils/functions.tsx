import type { Folder } from "../types/types";

export function flatFolderArrayToNestedArray(arr: Folder[]) {
  const map = new Map<number | null, Folder[]>();
  for (const folder of arr) {
    const existingArr = map.get(folder.parentId);
    if (existingArr) {
      existingArr.push(folder);
    } else {
      map.set(folder.parentId, [folder]);
    }
  }
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
