import { createContext } from "react";
import { useState } from "react";
const FilesContext = createContext();

const FilesProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    return (
        <FilesContext.Provider value={{
            isLoading,
            setIsLoading,
            error,
            setError,
            files,
            setFiles,
            selectedFiles,
            setSelectedFiles
        }}>
            {children}
        </FilesContext.Provider>
    );
}

export { FilesContext, FilesProvider };