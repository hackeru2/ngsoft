// MyContextProvider.js
import React, { useState } from "react";
import MyContext from "./MyContext";

const MyContextProvider = ({ children }) => {
    const [myData, setMyData] = useState({ id: null });
    const [showModal, setShowModal] = useState(false);

    const contextValue = {
        myData,
        setMyData,
        showModal,
        setShowModal,
    };

    return (
        <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
    );
};

export default MyContextProvider;
