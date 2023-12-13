import { useContext, useEffect, useState } from "react";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTask } from "./SortableTask";
import MyModal from "./MyModal";
import MyContext from "../../../MyContext";
import AutocompleteSearch from "./AutocompleteSearch";

const Tasks = ({ setTotalPages }) => {
    const {
        searchQuery,
        setMyData,
        showModal,
        setShowModal,
        myData,
        currentPage,
        setTasks,
        tasks,
    } = useContext(MyContext);

    const onSubmitTask = (data) =>
        myData.id ? updateTask(data) : addTask(data);
    const addTask = async (taskData) => {
        try {
            const { data: newTask } = await axios.post("/tasks", taskData);
            if (newTask) {
                setTasks([...tasks, newTask.task]);
                setShowModal(false);
            } else {
                console.error("Failed to add task");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const onClickDelete = async (taskToDelete) => {
        try {
            const { data: deletedTask } = await axios.delete(
                "/tasks/" + taskToDelete.id
            );
            if (deletedTask) {
                setTasks((prevTasks) =>
                    prevTasks.filter((task) => task.id !== taskToDelete.id)
                );
            } else {
                console.error("Failed to delete task");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const updateTask = async (taskData) => {
        try {
            const { data: updatedTask } = await axios.put(
                "tasks/" + taskData.id,
                taskData
            );

            if (updatedTask) {
                const findById = (task) => task.id == updatedTask.task.id;

                tasks.find(findById).title = updatedTask.task.title;
                tasks.find(findById).description = updatedTask.task.description;
                tasks.find(findById).due_date = updatedTask.task.due_date;
                setTasks(JSON.parse(JSON.stringify(tasks)));
                setShowModal(false);
                setMyData({ id: null });
            } else {
                console.error("Failed to update task");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const onClickAddTask = () => {
        setShowModal(true);
        setMyData({ id: null });
    };
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await axios("/tasks?page=" + currentPage);
                setTasks(data.tasks.data);
                setTotalPages(data.tasks.last_page); // Assuming 10 tasks per page
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [currentPage]);
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await axios("/tasks?page=" + currentPage);
                setTasks(Object.values(data.tasks.data));
                // setTasks(data.tasks);
                setTotalPages(data.tasks.last_page); // Assuming 10 tasks per page
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await axios("/tasks?search=" + searchQuery);
                if (data.data && searchQuery) {
                    console.log({ vvvv: data });
                    setTasks(data.data);
                    setTotalPages(data.last_page); // Assuming 10 tasks per page

                    return;
                }
                setTasks(data.tasks.data);
                console.log({ data });
                setTotalPages(data.tasks.last_page); // Assuming 10 tasks per page
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [searchQuery]);
    const onDragEnd = (event) => {
        const { active, over } = event;
        if (active.id === over.id) {
            return;
        }
        setTasks((tasks) => {
            const oldIndex = tasks.findIndex((user) => user.id === active.id);
            const newIndex = tasks.findIndex((user) => user.id === over.id);
            return arrayMove(tasks, oldIndex, newIndex);
        });
    };

    return (
        <div>
            <div className="flex py-3 my-3 justify-center">
                <button
                    className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
                    type="button"
                    onClick={onClickAddTask}
                >
                    Add Task
                </button>
                <AutocompleteSearch />
            </div>
            <MyModal onSubmit={onSubmitTask} />
            <div className="drag-wrap">
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={onDragEnd}
                >
                    <SortableContext
                        items={tasks}
                        strategy={verticalListSortingStrategy}
                    >
                        {tasks.map((task) => (
                            <SortableTask
                                key={task.id + task.title}
                                task={task}
                                onClickDelete={onClickDelete}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
};
export default Tasks;
