import { useContext } from "react";
import { DatasetContext } from "../context/DatasetContext";
import { Hourglass } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
const DataTable = () => {
    const { filteredDatasets, isLoading, error } = useContext(DatasetContext);
    const navigate = useNavigate();

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <Hourglass 
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /></div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-700 font-semibold text-2xl">Error fetching datasets: {error}</div>;
    }
    if (!filteredDatasets || filteredDatasets.length === 0) {
        return <div className="flex justify-center items-center h-screen text-gray-700 font-semibold text-2xl">No datasets available</div>;
    }

    const handleRowClick = (dataset) => {
        // Navigate to dataset details page
        navigate(`/dataset/${dataset.hash}`);
    }
    return (
    <div className="p-6 rounded-2xl">
      <div className="overflow-x-auto">
        {filteredDatasets.length>0 && (<table className="min-w-full text-sm font-display">
          <thead>
            <tr className="bg-primary text-white">
              <th className="px-6 py-4 text-left rounded-tl-2xl">Title</th>
              <th className="px-6 py-4 text-left">Modality</th>
              <th className="px-6 py-4 text-left">Sex</th>
              <th className="px-6 py-4 text-left rounded-tr-2xl">Dataset</th>
            </tr>
          </thead>
          <tbody>
            {filteredDatasets.map((dataset, idx) => (
              <tr
                key={dataset.hash}
                className={`hover:bg-blue-50 transition-colors ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-6 py-4 font-medium text-blue-800 cursor-pointer underline" onClick={() => handleRowClick(dataset)}>{dataset.title}</td>
                <td className="px-6 py-4 text-gray-700">{dataset.modality}</td>
                <td className="px-6 py-4 text-gray-700">{dataset.attributes?.sex}</td>
                <td className="px-6 py-4 text-gray-700 break-all">{dataset.dataset}</td>
              </tr>
            ))}
          </tbody>
        </table>)}
      </div>
    </div>
    )
}

export default DataTable