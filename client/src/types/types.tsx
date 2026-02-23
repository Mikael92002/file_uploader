export interface User {
  id: number;
  username: string;
}

export interface LogInProps {
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export type File = {
  id: number;
  fileName: string;
  fileURL: string;
  size: number;
  uploadTime: Date;
  folderId: number;
};

export type Folder = {
  id: number;
  folderName: string;
  userId: number;
  files: Array<File>;
  parentId: number | null;
  children: Array<Folder>;
};

// The following needs to be FolderObject:
export type FolderFormObject = {
  children: Array<{
    folderName: string;
    id: number;
    parentId: number;
    userId: number;
  }>;
  // REMEMBER TO ADD FILES !!!
  folderName: string;
  id: number;
  parentId: null | number;
  userId: number;
} & {
  [k: string]: FormDataEntryValue | number | null;
};

export type FolderObject = {
  children: Array<{
    folderName: string;
    id: number;
    parentId: number;
    userId: number;
  }>;
  // REMEMBER TO ADD FILES !!!
  folderName: string;
  id: number;
  parentId: null | number;
  userId: number;
};

export type FolderState = {
  setCurrFolder: React.Dispatch<React.SetStateAction<FolderObject>>;
  currFolder: FolderObject | null;
};
