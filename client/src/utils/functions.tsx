import type { Folder } from "../types/types";

export function flatFolderArrayToNestedArray(arr: Folder[]) {
  const map = new Map<number | null, Array<Folder>>();
  for (const folder of arr) {
    if (map.get(folder.parentId)) {
      map.get(folder.parentId)?.push(folder);
    } else {
      map.set(folder.parentId, [folder]);
    }
  }
  let q = map.get(null) || [];
  const currArray = map.get(null);
  while (q.length > 0) {
    let nextLevel: Folder[] = [];
    for (let i = 0; i < q.length; i++) {
      const parentId = q[i].id;
      const childrenFromParentId = map.get(parentId);
      console.log(`parentId: ${parentId}, children:`, childrenFromParentId);
      q[i].children = childrenFromParentId ? childrenFromParentId : [];
      nextLevel = [...nextLevel, ...q[i].children];
    }
    q = nextLevel;
  }
  return currArray![0];
}
