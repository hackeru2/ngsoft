// MyContextProvider.js
import React, { useState } from "react";
import MyContext from "./MyContext";

const MyContextProvider = ({ children }) => {
    const [myData, setMyData] = useState({ id: null });
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [tasks, setTasks] = useState([]);

    const contextValue = {
        myData,
        tasks,
        setTasks,
        setMyData,
        showModal,
        currentPage,
        setCurrentPage,
        searchQuery,
        setSearchQuery,
        setShowModal,
    };

    return (
        <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
    );
};

export default MyContextProvider;
