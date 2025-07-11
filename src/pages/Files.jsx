import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FilesContext } from "../context/FilesContext";
import FilesTable from "../components/FilesTable";
import { fetchFilesService } from "../apis/filesService";
import { Hourglass } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ArrowDownCircleIcon } from "@heroicons/react/20/solid";
import DownloadModal from "../components/DownloadModal";

const Files = () => {
    const navigate = useNavigate();
    const { dataset } = useParams();
    const { files, isLoading, error, setFiles, setIsLoading, setError, selectedFiles} = useContext(FilesContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedFiles, setPaginatedFiles] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [downloadRefId, setDownloadRefId] = useState('');
    useEffect(() => {
        // Fetch files for the selected dataset
        const fetchFiles = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await fetchFilesService(dataset);
                console.log("Fetched files:", data);
                if (!data || !Array.isArray(data.data.keys)) {
                    throw new Error("Invalid response from API");
                }
                console.log("Files keys:", data.data.keys.slice(0, 10));
                setFiles(data.data.keys);
                setTotalPages(Math.ceil(data.data.keys.length / 10));
                setPaginatedFiles(data.data.keys.slice(0, 10));
            } catch (err) {
                console.error("Error fetching files:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFiles();
    }, [dataset, setFiles, setError, setIsLoading]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;
        setPaginatedFiles(files.slice(startIndex, endIndex));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Hourglass
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        );
    }
    if (error) return <div>Error: {error.message}</div>;


    const backClickHandler = () => {
        navigate(-1);
    }
    const handleDownload = async () => {
        try {
        // Simulate API response
            const response = { message: 'CREATED', ref: 'f3a2cd14-8f5e-43e3-8a1e-2c813c7996be' };

        // Normally you'd call your API here
        // const response = await startDownloadApiCall(selectedFiles);

            setDownloadRefId(response.ref);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Download failed:', error);
        }
     };
    return (
        <>
        <div className="p-6">
            <div className="px-6">
                <button onClick={backClickHandler} className="flex cursor-pointer items-center gap-2 bg-primary font-medium text-white px-4 py-2 rounded-md my-3">
                    <ArrowLeftIcon className="w-5 h-5" />
                    Back to Dataset
                </button>
            </div>
            <div className="flex justify-between items-center mb-4 px-6">
                <h1 className="text-2xl font-bold ">Files</h1>
                <button onClick={handleDownload} disabled={selectedFiles.length === 0} className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center">
                    Download Selected
                    <ArrowDownCircleIcon className="w-5 h-5 inline-block ml-2" />
                </button>
            </div>
            
            <FilesTable files={paginatedFiles} />
            <div className="flex justify-center items-center mt-2">
                <div className="flex items-center gap-2">
                    <button
                        className="px-4 py-1 bg-blue-500 text-white rounded transition hover:bg-blue-600 disabled:opacity-50"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(1)}
                    >
                        First
                    </button>
                    <button
                        className="px-4 py-1 bg-blue-500 text-white rounded transition hover:bg-blue-600 disabled:opacity-50"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <p className="font-medium text-lg">
                        {currentPage}/{totalPages}
                    </p>
                    <button
                        className="px-4 py-1 bg-blue-500 text-white rounded transition hover:bg-blue-600 disabled:opacity-50"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                    <button
                        className="px-4 py-1 bg-blue-500 text-white rounded transition hover:bg-blue-600 disabled:opacity-50"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(totalPages)}
                    >
                        Last
                    </button>
                </div>
            </div>
        </div>
        {isModalOpen && (
            <DownloadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                refId={downloadRefId}
            />
        )}
        </>
    );
};

export default Files;