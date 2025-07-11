import { useContext } from "react"
import { DatasetContext } from "../context/DatasetContext";

const Pagination = () => {
  const { currentPage, totalPages, setCurrentPage, filteredDatasets } = useContext(DatasetContext);
  return (
    <>
    {filteredDatasets.length > 0 && (
      <div className="flex justify-end flex-wrap px-6">
            <div className="flex justify-end gap-2 md:mt-0 mt-2">
                <div className="flex items-center gap-2 md:mt-0 mt-2">
                    <button
                        className="px-2 py-1 bg-blue-500 text-white rounded font-medium transition hover:bg-blue-700 disabled:opacity-50"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(1)}
                    >
                        First
                    </button>
                    <button
                        className="px-2 py-1 bg-blue-500 text-white rounded font-medium transition hover:bg-blue-700 disabled:opacity-50"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((page) => page - 1)}
                    >
                        Previous
                    </button>
                    <p className="font-medium text-sm">
                        {currentPage} / {totalPages}
                    </p>
                    <button
                        className="px-2 py-1 bg-blue-500 text-white rounded font-medium transition hover:bg-blue-700 disabled:opacity-50"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((page) => page + 1)}
                    >
                        Next
                    </button>
                    <button
                        className="px-2 py-1 bg-blue-500 text-white rounded font-medium transition hover:bg-blue-700 disabled:opacity-50"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                    >
                        Last
                    </button>
                </div>
            </div>
        </div>
      )}
        </>
  )
}

export default Pagination