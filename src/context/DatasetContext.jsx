import { createContext, useState, useEffect } from "react";
import { fetchDatasetsService } from "../apis/datasetService";

const DatasetContext = createContext();

const DatasetProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [datasets, setDatasets] = useState([]);
    const [filteredDatasets, setFilteredDatasets] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [debouncedTitle, setDebouncedTitle] = useState("");
    const [groups, setGroups] = useState([]);
    const [modalities, setModalities] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [selectedModalities, setSelectedModalities] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    // Fetch datasets using Filter Dataset API
    useEffect(() => {
        const fetchDatasets = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetchDatasetsService(currentPage, searchTitle, selectedGroups, selectedModalities);
            if (!response || !response.data) {
                throw new Error("Invalid response from API");
            }
            setDatasets(response.data);
            setFilteredDatasets(response.data);
            setTotalPages(response.totalPages);
            const groupsSet = new Set();
            const modalitiesSet = new Set();
            response.data.forEach((dataset) => {
                if(dataset.device && dataset.device.modalities && dataset.device.modalities.length > 0) {
                    dataset.device.modalities.forEach((modality) => {
                        if (modality) {
                            modalitiesSet.add(modality);
                        }
                    });
                }
            });
            response.data.forEach((dataset) => {
                if (dataset.attributes && dataset.attributes.group) {
                    groupsSet.add(dataset.attributes.group);
                }
            });
            setGroups(Array.from(groupsSet));
            setModalities(Array.from(modalitiesSet));
            setIsLoading(false);

            console.log("Fetched datasets:", response.data);
            console.log("Available groups:", Array.from(groupsSet));
            console.log("Available modalities:", Array.from(modalitiesSet));
        } catch (error) {
            setIsLoading(false);
            setError("Error fetching datasets!");
            console.error("Error fetching datasets:", error);
        }
        };

        fetchDatasets();
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTitle(searchTitle);
        }, 300); // 300ms debounce delay

        return () => {
            clearTimeout(handler);
        };
    }, [searchTitle]);

    useEffect(() => {
    const fetchFilteredDatasets = async () => {
        try {
            setIsLoading(true);
            setError(null);

            if (debouncedTitle || selectedGroups.length > 0 || selectedModalities.length > 0) {
                setCurrentPage(1);
            }

            const response = await fetchDatasetsService(currentPage, debouncedTitle, selectedGroups, selectedModalities);
            if (!response || !response.data) {
                throw new Error("Invalid response from API");
            }

            console.log("Filtered datasets:", response);
            console.log("Total pages:", response.totalPages);

            setFilteredDatasets(response.data);
            setTotalPages(response.totalPages);

            // Reset currentPage to 1 if no content is found
            if (response.data && response.data.length === 0) {
                setCurrentPage(1);
            }

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError("Error fetching datasets!");
            console.error("Error fetching filtered datasets:", error);
        }
    };

    fetchFilteredDatasets();
}, [debouncedTitle, selectedGroups, selectedModalities, currentPage]);

  

    return (
        <DatasetContext.Provider
            value={{
                datasets,
                filteredDatasets,
                searchTitle,
                setSearchTitle,
                groups,
                modalities,
                selectedGroups,
                setSelectedGroups,
                selectedModalities,
                setSelectedModalities,
                totalPages,
                currentPage,
                setCurrentPage,
                isLoading,
                error
            }}
        >
        {children}
        </DatasetContext.Provider>
    );
};

export { DatasetContext, DatasetProvider };