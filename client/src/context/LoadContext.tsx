import { createContext, useContext } from "react";

interface LoadContextType{
setLoadToTrue: () => void,
setLoadToFalse: () => void,
navLoad: () => void,
isLoading: boolean;
}

export const LoadContext = createContext<LoadContextType | null>(null);

export const useLoad = () => {
    const context = useContext(LoadContext);
    if(!context){
        throw new Error("useLoad must be used inside provider")
    }
    return context;
}