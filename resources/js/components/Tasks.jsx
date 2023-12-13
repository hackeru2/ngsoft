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

const Tasks = ({ setTotalPages, currentPage }) => {
    const { showModal, setShowModal, myData } = useContext(MyContext);

    const [tasks, setTasks] = useState([]);

    const addTask = async (taskData) => {
        try {
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(taskData),
            });

            if (response.ok) {
                const newTask = await response.json();
                setTasks([...tasks, newTask.task]);
            } else {
                console.error("Failed to add task");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await axios("/api/tasks?page=" + currentPage);
                setTasks(data.tasks.data);
                setTotalPages(data.tasks.last_page); // Assuming 10 tasks per page
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [currentPage]);

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
            <button
                className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Add Task
            </button>
            <MyModal onSubmit={addTask} />
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
                            <SortableTask key={task.id} task={task} />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
};
export default Tasks;
