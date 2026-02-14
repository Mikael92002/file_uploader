import { createContext, type SetStateAction } from "react";
import type { Dispatch } from "react";
import type { User } from "../types/types";
import { useContext } from "react";

interface AuthContextType{
    currentUser: User | null;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};