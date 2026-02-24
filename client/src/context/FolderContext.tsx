import { createContext, useContext } from "react";
import type { Folder } from "../types/types";

interface FolderContextType {
  currentFolder: Folder | null;
  rootFolder: Folder | null;
  setCurrentFolder: React.Dispatch<React.SetStateAction<Folder | null>>;
  setRootFolder: React.Dispatch<React.SetStateAction<Folder | null>>;
}

export const FolderContext = createContext<FolderContextType | null>(null);

export const useFolder = () => {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolder must be used within provider");
  }
  return context;
};
