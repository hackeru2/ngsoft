import React, { useContext, useState } from "react";
import TaskForm from "./TaskForm";
import MyContext from "../../../MyContext";

const Modal = ({ onSubmit }) => {
    const { showModal, myData } = useContext(MyContext);
    return (
        <div>
            {showModal ? (
                <div className="fixed">
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-10 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <TaskForm
                                onSubmit={onSubmit}
                                initialTask={myData}
                            />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Modal;
