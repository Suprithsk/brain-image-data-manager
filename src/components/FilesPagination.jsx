import React from "react";

const FilesPagination = ({ currentPage, totalPages, handlePageChange }) => {
    return (
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
    );
};

export default FilesPagination;
