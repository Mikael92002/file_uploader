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
  uploadTime: string;
  folderId: number;
};

export interface FileInterface {
  file: File
}

// basically says that follow the File type
// above but exclude id:
export type DraftFile = Omit<File, "id">;

export type Folder = {
  id: number;
  folderName: string;
  userId: number;
  files: File[];
  parentId: number | null;
  children: Folder[];
};

export type DraftFolder = Omit<
  Folder,
  "id" | "userId" | "files" | "children" | "files"
>;

export type FolderState = {
  setCurrFolder: React.Dispatch<React.SetStateAction<Folder>>;
  currFolder: Folder | null;
};

export type Directory = {
  id: number;
  folderName: string;
};
