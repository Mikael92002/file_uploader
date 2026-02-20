import { Folder } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";

// levels comes from front end:
function recurseFolders(levels: number): any {
  if (levels === 0) {
    return undefined;
  }
  return {
    includes: {
      children: recurseFolders(levels - 1),
    },
  };
}

// front end will pass in deeply nested folderID
// recurse all folders to find that folderID
async function uploadURL(username: string, URL: string, folderID: number) {
    // folderID = deeply nested folder's id
  const query = await prisma.folder.update({
    where: {
      id: folderID,
      parentId: null,
    },
    data: {
        // return the folder which contains the id to update:

    },
  });
}
