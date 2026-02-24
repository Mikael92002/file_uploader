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

// basically says that follow the File type
// above but exclude id:
export type DraftFile = Omit<File, "id">;

export type Folder = {
  id: number;
  folderName: string;
  userId: number;
  files: Array<File>;
  parentId: number | null;
  children: Array<Folder>;
};

export type DraftFolder = Omit<Folder, "id">;

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

export type FolderState = {
  setCurrFolder: React.Dispatch<React.SetStateAction<Folder>>;
  currFolder: Folder | null;
};
