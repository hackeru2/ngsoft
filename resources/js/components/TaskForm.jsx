// frontend/src/components/TaskForm.jsx

import React, { useState, useEffect, useContext } from "react";
import DatePicker from "./DatePicker";
import MyContext from "../../../MyContext";

const TaskForm = ({ initialTask, onSubmit }) => {
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        due_date: "",
        id: null,
    });
    const { showModal, setShowModal } = useContext(MyContext);

    useEffect(() => {
        if (initialTask && initialTask.id) setTaskData({ ...initialTask });
    }, [initialTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };
    const handleDateChange = (newDate) => {
        setTaskData({ ...taskData, due_date: newDate });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ taskData });
        onSubmit(taskData);
        setTaskData({
            title: "",
            description: "",
            due_date: "",
        });
    };
    const onClose = (e) => {
        console.log(e);
        setShowModal(false);
    };
    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-3xl font=semibold">
                        {taskData.id ? "Update" : "Add"} Task
                    </h3>
                    <button
                        className="btn btn-default btn-close"
                        onClick={onClose}
                    ></button>
                </div>
                <div className="relative p-6 flex-auto">
                    {JSON.stringify(taskData)}
                    <label className="task-label"> Title:</label>
                    <input
                        type="text"
                        name="title"
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={taskData.title}
                        onChange={handleChange}
                        required
                    />

                    <label className="task-label">Description:</label>
                    <textarea
                        name="description"
                        className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={taskData.description}
                        onChange={handleChange}
                        required
                    />

                    <label className="task-label">Due date:</label>
                    <DatePicker
                        onDateChange={handleDateChange}
                        taskDate={taskData.due_date}
                    />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <input
                        value="Submit"
                        type="submit"
                        className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    />
                </div>
            </div>
        </form>
    );
};

export default TaskForm;
