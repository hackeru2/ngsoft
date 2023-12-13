import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { isToday, isAfter } from "date-fns";
import { useContext } from "react";
import MyContext from "../../../MyContext";

export const SortableTask = ({ task, onClickDelete }) => {
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
            <div className="flex justify-content-between">
                <div>
                    <p> {task.title}</p>

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
                <div>
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
                    <button
                        className="btn btn-sm btn-delete"
                        onDoubleClick={() => onClickDelete(task)}
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
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </button>{" "}
                </div>
            </div>
        </div>
    );
};
