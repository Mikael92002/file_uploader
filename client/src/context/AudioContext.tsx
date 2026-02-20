import { createContext, useContext } from "react";

interface AudioType {
  clickSound: () => void;
}

export const AudioContext = createContext<AudioType | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used inside provider");
  }
  return context;
};
