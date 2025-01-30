const Pagination = ({ totalItems, itemsPerPage, currentPage, setCurrentPage, maxPagesToShow = 5 }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null; // Hide pagination if only one page

    const getPageNumbers = () => {
        let pages = [];
        if (totalPages <= maxPagesToShow) {
            pages = [...Array(totalPages).keys()].map(num => num + 1);
        } else {
            if (currentPage <= 3) {
                pages = [1, 2, 3, 4, "...", totalPages];
            } else if (currentPage >= totalPages - 2) {
                pages = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
            }
        }
        return pages;
    };

    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            {/* Previous Button */}
            <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ⬅ Previous
            </button>

            {/* Numbered Pagination */}
            {getPageNumbers().map((page, index) =>
                page === "..." ? (
                    <span key={index} className="px-3 py-2 text-gray-500">...</span>
                ) : (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-md transition ${currentPage === page
                            ? "bg-blue-500 text-white font-bold"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
                            }`}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next Button */}
            <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next ➡
            </button>
        </div>
    );
};

export default Pagination;
