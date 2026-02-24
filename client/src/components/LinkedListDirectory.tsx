import { useFolder } from "../context/FolderContext";
import { useState } from "react";

const LinkedListDirectory = () => {
  const { currentFolder, setCurrentFolder, rootFolder, setRootFolder } =
    useFolder();
  // should only contain string rep.
  // of curr. Directory:
  const { linkedDirectory, setLinkedDirectory } = useState({
    currDirectory: "",
  });

  // need to find path to currentFolder
  // BFS:
  // Queues and return first queue to find
  // currentFolder.id from root.id.
  // This will be currDirectory string path

  //traverse over rootFolder.children:
  if (rootFolder?.children) {
    const q = [...rootFolder.children];
    const solStack = [];
    while(q.length>0){
        const currNode = q.shift();

        if(currNode!.id === currentFolder!.id){
            // check if children, push to arr if there are:
            if(currNode!.children.length>0){
                q.push(currNode.children);
            }
        }
    }
  }
};

export default LinkedListDirectory;
