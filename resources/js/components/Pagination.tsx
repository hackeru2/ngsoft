// Pagination.js
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-4 flex justify-center items-center">
            <ul className="pagination">
                {/* Left arrow */}
                <li
                    className={`inline-block mx-1 ${
                        currentPage === 1
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                    }`}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    &lt;
                </li>

                {/* Page numbers */}
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`inline-block mx-1 ${
                            currentPage === number
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                        } px-3 py-1 cursor-pointer rounded`}
                        onClick={() => onPageChange(number)}
                    >
                        {number}
                    </li>
                ))}

                {/* Right arrow */}
                <li
                    className={`inline-block mx-1 ${
                        currentPage === totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                    }`}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    &gt;
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
