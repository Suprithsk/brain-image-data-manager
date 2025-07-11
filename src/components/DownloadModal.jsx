import { useEffect, useState } from "react";
import { downloadFilesService, getDownloadStatusService, cancelDownloadService } from "../apis/filesService";

export default function DownloadModal({ isOpen, onClose, selectedFiles }) {
    const [downloadStarted, setDownloadStarted] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [refId, setRefId] = useState("");
    const [downloadStatus, setDownloadStatus] = useState("");
    const [downloadLink, setDownloadLink] = useState("");
    const [timer, setTimer] = useState(120);

    useEffect(() => {
        if (isOpen) {
            // Start the download when the modal opens
            const startDownload = async () => {
                try {
                    const response = await downloadFilesService(selectedFiles);
                    console.log("Download response:", response);
                    if (!response || !response.ref) {
                        throw new Error("Invalid response from download API");
                    }
                    const { ref } = response;
                    setRefId(ref);
                    setDownloadStarted(true);
                } catch (error) {
                    console.error("Error starting download:", error);
                }
            };
            startDownload();
        }
    }, [isOpen, selectedFiles]);

    useEffect(() => {
        if (downloadStarted) {
            const interval = setInterval(async () => {
                try {
                    console.log("Checking download status for refId:", refId);
                    const progress = await getDownloadStatusService(refId);
                    setDownloadProgress(progress.percentageCompleted);
                    setDownloadStatus(progress.message || "In Progress");

                    if (progress.message === "COMPLETED") {
                        clearInterval(interval);
                        setDownloadLink(progress.url); // Set the download link
                        startTimer(); // Start the 120-second timer
                    }
                } catch (error) {
                    console.error("Error fetching download status:", error);
                }
            }, 4000); // Check every 4 seconds

            return () => clearInterval(interval);
        }
    }, [downloadStarted, refId]);

    const startTimer = () => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    onClose(); // Close the modal after 120 seconds
                }
                return prevTimer - 1;
            });
        }, 1000); // Decrease timer every second
    };
    const onCloseHandler = async () => {
        if (downloadStarted) {
            try {
                await cancelDownloadService(refId);
                console.log("Download cancelled successfully");
            } catch (error) {
                console.error("Error cancelling download:", error);
            }
        }
        setDownloadStarted(false);
        setDownloadProgress(0);
        setRefId("");
        setDownloadStatus("");
        setDownloadLink("");
        setTimer(120);
        onClose();
    }
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                <h2 className="text-lg font-bold text-primary mb-4">Download Progress</h2>
                <p className="text-gray-700 mb-6">Your download is in progress with reference ID:</p>
                <div className="text-sm text-gray-900 bg-gray-100 p-2 rounded mb-6 break-all">
                    {refId}
                </div>
                <div className="text-gray-700 mb-6">
                    <p>Status: <span className="font-semibold">{downloadStatus}</span></p>
                    {!downloadLink && <p>Progress: <span className="font-semibold">{downloadProgress}%</span></p>}
                </div>
                {downloadLink && (
                    <div className="text-gray-700 mb-6">
                        <p>
                            Download Link:{" "}
                            <a
                                href={downloadLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Click here to download
                            </a>
                        </p>
                        <p>Link expires in: <span className="font-semibold">{timer} seconds</span></p>
                    </div>
                )}
                <div className="flex justify-end">
                    <button
                        onClick={onCloseHandler}
                        className="bg-error text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}