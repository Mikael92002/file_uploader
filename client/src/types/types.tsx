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
