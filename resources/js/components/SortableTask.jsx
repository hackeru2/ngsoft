import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { isToday, isAfter } from "date-fns";
import { useContext } from "react";
import MyContext from "../../../MyContext";

export const SortableTask = ({ task, editTask }) => {
    const { myData, setMyData, setShowModal } = useContext(MyContext);

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: task.id });

    const onClickEdit = () => {
        setShowModal(true);
        setMyData(task);
    };
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="drag-item"
        >
            <p> {task.title}</p>
            <button
                className="btn btn-sm btn-edit"
                onDoubleClick={onClickEdit}
            >
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
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                </svg>
            </button>{" "}
            <p className="description">{task.description}</p>
            <p
                className={`due_date ${
                    isAfter(new Date(task.due_date), new Date()) ||
                    isToday(new Date(task.due_date))
                        ? "text-blue-500 text-xs"
                        : "text-red-500 text-xs"
                }`}
            >
                {task.due_date}
            </p>
        </div>
    );
};
