import apiClient from "./apiService";

const fetchFilesService = async (dataset) => {
  try {
    console.log("Fetching files for dataset:", dataset);
    const response = await apiClient.get(
      `/manage/files/?prefix=INTRW-000/000-0-001/401-2-002_BLK-20231222-03_20240111-01_SAN-13DEC2023-06`
    );
    console.log("Fetched files:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
}
const downloadFilesService = async (files) => {
  try {
    console.log("Downloading files:", files);
    const response = await apiClient.post(`/download`, {
      files: files
    });
    console.log("Files downloaded successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error downloading files:", error);
    throw error;
  }
}
const getDownloadStatusService = async (refId) => {
    try {
        console.log("Checking download status for reference ID:", refId);
        const response = await apiClient.get(`/download/progress/${refId}`);
        console.log("Download status:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error checking download status:", error);
        throw error;
    }
}
const cancelDownloadService = async (refId) => {
    try {
        console.log("Cancelling download for reference ID:", refId);
        const response = await apiClient.post(`/download/cancel`, {
            refId
        });
        console.log("Download cancelled successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error cancelling download:", error);
        throw error;
    }
}
export { fetchFilesService, downloadFilesService, getDownloadStatusService, cancelDownloadService };