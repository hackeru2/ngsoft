import React, { useState, useEffect, useContext } from "react";
import MyContext from "../../../MyContext";

export default function AutocompleteSearch() {
    const { setSearchQuery, tasks } = useContext(MyContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        // Filter tasks based on the search term
        const filteredResults = tasks.filter(
            (task) =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
        setFilteredTasks(filteredResults);
    }, [searchTerm, tasks]);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setSearchTerm(inputValue);
        setSearchQuery(inputValue); // Optionally set the search query in your context
    };

    return (
        <div className="flex justify-center items-center">
            <div className="relative w-64">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Type to search..."
                    className="w-full border rounded py-2 px-3 pl-10 focus:outline-none focus:border-blue-500"
                />
                <div className="absolute top-1.5 right-1.5 flex items-center pl-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
