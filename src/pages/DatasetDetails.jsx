import React from "react";
import DatasetDetailsCard from "../components/DatasetDetailsCard";
import { useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
const DatasetDetails = () => {
    const { datasetId } = useParams();
    const navigate = useNavigate();
    const backClickHandler = () => {
        navigate(-1); 
    };
    return (
        <div className="p-6 rounded-2xl">
            <button onClick={backClickHandler} className="flex cursor-pointer items-center gap-2 bg-primary font-medium text-white px-4 py-2 rounded-md my-3">
                <ArrowLeftIcon className="w-5 h-5" />
                Back to Datasets
            </button>
            <h1 className="text-2xl font-bold mb-4">Dataset Details:</h1>
            <DatasetDetailsCard datasetId={datasetId} />
        </div>
    );
};

export default DatasetDetails;
