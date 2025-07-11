import { useContext } from "react";
import { FilesContext } from "../context/FilesContext";
import { Hourglass } from "react-loader-spinner";

const FilesTable = ({ files }) => {
    const { isLoading, error, selectedFiles, setSelectedFiles } = useContext(FilesContext);

    const handleFileToggle = (fileKey) => {
        if (selectedFiles.includes(fileKey)) {
            setSelectedFiles(selectedFiles.filter((key) => key !== fileKey));
        } else {
            setSelectedFiles([...selectedFiles, fileKey]);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Hourglass
                    height="100"
                    width="100"
                    color="#4fa94d"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-700 font-semibold text-2xl">
                Error fetching files: {error}
            </div>
        );
    }

    if (!files || files.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-700 font-semibold text-2xl">
                No files available
            </div>
        );
    }

    return (
        <div className="p-6 rounded-2xl">
            <div className="overflow-x-auto">
                {files.length > 0 && (
                    <table className="min-w-full text-sm font-display">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="px-6 py-4 text-left rounded-tl-2xl">Select</th>
                                <th className="px-6 py-4 text-left">File Name</th>
                                <th className="px-6 py-4 text-left">Size (KB)</th>
                                <th className="px-6 py-4 text-left rounded-tr-2xl">Last Modified</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file, idx) => (
                                <tr
                                    key={file.key}
                                    className={`hover:bg-blue-50 transition-colors ${
                                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    }`}
                                >
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedFiles.includes(file.key)}
                                            onChange={() => handleFileToggle(file.key)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-blue-800 break-all">{file.key}</td>
                                    <td className="px-6 py-4 text-gray-700">{(file.size / 1024).toFixed(2)}</td>
                                    <td className="px-6 py-4 text-gray-700">{new Date(file.lastModified).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default FilesTable;