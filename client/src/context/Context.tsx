import { createContext } from "react";
import type { User } from "../types/types";

export const AuthContext = createContext<User | null>(null);
