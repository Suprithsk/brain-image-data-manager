import apiClient from "./apiService";

const fetchDatasetsService = async (currentPage, searchTitle, selectedGroups, selectedModalities) => {
  try {
    const response = await apiClient.post(
      `/dataset/000-0-001?limit=10&page=${currentPage}&sponsorId=INTRW-000`,
      {
        title: searchTitle,
        orderBy: "createdAt",
        order: "desc",
        attributes: {
          group: selectedGroups.length > 0 ? selectedGroups : undefined,
        },
        modality: selectedModalities.length > 0 ? selectedModalities : undefined
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching datasets:", error);
    throw error;
  }
};
const getDatasetDetailsService = async (datasetId) => {
  try {
    const response = await apiClient.get(`/dataset/${datasetId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dataset details:", error);
    throw error;
  }
};
export { fetchDatasetsService, getDatasetDetailsService };
