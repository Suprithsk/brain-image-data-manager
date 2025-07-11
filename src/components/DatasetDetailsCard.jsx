import { ArrowLeftCircleIcon, ArrowRightCircleIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { getDatasetDetailsService } from "../apis/datasetService";
import { Hourglass } from "react-loader-spinner";
import {ArrowDownIcon} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
const DatasetDetailsCard = ({ datasetId }) => {
    const navigate=useNavigate()
    const [dataset, setDataset] = useState(null);
    useEffect(() => {
        const fetchDatasetDetails = async () => {
            try {
                const dataset = await getDatasetDetailsService(datasetId);
                setDataset(dataset);
                // Handle the dataset details (e.g., set state)
            } catch (error) {
                console.error("Error fetching dataset details:", error);
            }
        };

        fetchDatasetDetails();
    }, [datasetId]);

    if (!dataset) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-700 font-semibold text-2xl">
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

    const navigateToFiles = (dataset) => {
        console.log(dataset)
        navigate(`/files/${dataset.dataset}`);
    }
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full space-y-4">
            <h2 className="text-xl font-bold text-primary">{dataset.title}</h2>
            <p className="text-gray-600">{dataset.description}</p>

            <div className="space-y-2">
                <div className="font-medium">
                    <span className="text-gray-700">Animal ID: </span>
                    <span className="text-gray-900">{dataset.sid}</span>
                </div>
                <div className="font-medium">
                    <span className="text-gray-700">Block ID: </span>
                    <span className="text-gray-900">{dataset.blockId}</span>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="font-semibold text-gray-800">Modalities</h3>

                <div className="border rounded-lg p-3 bg-[var(--color-background)]">
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-gray-700">
                            {dataset.modality}
                        </span>
                        <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                    </div>

                    <div className="space-y-1 text-sm text-gray-700">
                        <p>
                            <strong>Viewer Status:</strong>{" "}
                            {dataset.pyramidRegistrationStatus}
                        </p>
                        <p>
                            <strong>Modality:</strong> {dataset.modality}
                        </p>
                        <p>
                            <strong>Physical Sections:</strong>{" "}
                            {dataset.physicalSections}
                        </p>
                        <p>
                            <strong>Physical Spacing:</strong>{" "}
                            {dataset.physicalSpacing}
                        </p>
                        <p>
                            <strong>Pixel Size:</strong> {dataset.pixelSize}
                        </p>
                        <p>
                            <strong>Bit Depth:</strong> {dataset.bitDepth}
                        </p>
                        <p>
                            <strong>Channels:</strong> {dataset.channels.length}
                        </p>
                    </div>

                    <div className="mt-3 space-y-2">
                        {dataset.channels.map((channel) => (
                            <div
                                key={channel.num}
                                className="bg-white rounded-lg shadow p-3 text-gray-800"
                            >
                                <p className="font-medium">
                                    Channel No. {channel.num}
                                </p>
                                <p className="text-sm">{channel.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <h3 className="font-semibold text-gray-800">Attributes</h3>
                <div className="border rounded-lg p-3 bg-[var(--color-background)]">
                    {Object.entries(dataset.attributes).map(([key, value]) => (
                        <div key={key} className="mb-2">
                            <span className="font-medium text-gray-700">
                                {key}:
                            </span>{" "}
                            <span className="text-gray-900">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={() => navigateToFiles(dataset)} className="flex cursor-pointer items-center gap-2 bg-primary font-medium text-white px-4 py-2 rounded-md my-3">
                Go To Files
                <ArrowRightCircleIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

export default DatasetDetailsCard;
