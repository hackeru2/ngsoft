import React, { useContext, useState } from "react";
import TaskForm from "./TaskForm";
import MyContext from "../../../MyContext";

const Modal = ({ onSubmit }) => {
    const { showModal, myData } = useContext(MyContext);
    return (
        <div>
            {showModal ? (
                <div className=" overflow-x-hidden mx-auto">
                    <div className="relative w-auto my-6 w-100">
                        <TaskForm onSubmit={onSubmit} initialTask={myData} />
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Modal;
