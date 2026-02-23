export interface User {
  id: number;
  username: string;
}

export interface LogInProps {
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export type FolderObject = {
  folderId: number;
  parentId: number | null;
} & {
  [k: string]: FormDataEntryValue | number | null;
};

export type FullFolderObject = {
  setCurrFolder: React.Dispatch<React.SetStateAction<null>>;
  currFolder: {
    children: Array<{
      folderName: string;
      id: number;
      parentId: number;
      userId: number;
    }>;
    folderName: string;
    id: number;
    parentId: null | number;
    userId: number;
  };
};
