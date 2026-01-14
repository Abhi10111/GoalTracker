import React from "react";
import { useState } from "react";
import { createContext, useContext, useReducer, useEffect } from "react";
import { motion } from "framer-motion";
// import { stat } from "original-fs";


export const TasksContext = createContext(null);

function tasksReducer(state, action) {
    switch (action.type) {
        case "SET_TASKS": {
            return action.payload;
        }

        case "TOGGLE_SUBTASK": {
            const updatedState = state.map(task =>
                task.id === action.payload.taskId
                    ? {
                        ...task, subtasks: task.subtasks.map(subtask =>
                            subtask.id === action.payload.subtaskId
                                ? {
                                    ...subtask,
                                    completed: !subtask.completed,
                                    lastModified: new Date().toISOString()
                                }
                                : subtask)
                    }
                    : task
            );
            window.api.updateTasks(updatedState);
            return updatedState;
        }
        case "ADD_TASK": {
            const updatedState = [...state,
            {
                id: state.length + 1,
                title: action.payload.title,
                subtasks: []
            }];
            window.api.updateTasks(updatedState);
            return updatedState;
        }

        case "ADD_SUBTASK": {
            const updatedState = state.map(task =>
                task.id === action.payload.taskId
                    ? {
                        ...task,
                        subtasks: [
                            ...task.subtasks,
                            {
                                id: task.subtasks.length + 1,
                                task: action.payload.title,
                                completed: false,
                                lastModified: new Date().toISOString()
                            }
                        ]
                    }
                    : task
            );
            window.api.updateTasks(updatedState);
            return updatedState;
        }
        default:
            return state;
    }
}

export function TaskProvider({ children }) {
    const [tasks, dispatch] = useReducer(tasksReducer, []);

    useEffect(() => {
        window.api.loadTasks().then(data => {
            dispatch({ type: "SET_TASKS", payload: data });
        });
    }, []);

    return <TasksContext.Provider value={{ tasks, dispatch }}>
        {children}
    </TasksContext.Provider>
}

export function IsModifiedToday(dateString) {
    const todayStart = new Date().setHours(0, 0, 0, 0);
    const lastModified = new Date(dateString).getTime();
    return lastModified >= todayStart;
}
export function AddTaskBox({ taskId, onClose }) {
    const [taskTitle, setTaskTitle] = useState("");
    const { _, dispatch } = useContext(TasksContext);
    return (
        <motion.div className="add-task-box">
            <input placeholder="Enter task title"
                onChange={(e) => setTaskTitle(e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                        e.preventDefault();
                        taskId != null
                            ? dispatch({ type: "ADD_SUBTASK", payload: { taskId: taskId, title: taskTitle } })
                            : dispatch({ type: "ADD_TASK", payload: { title: taskTitle } });
                        onClose();
                    }
                }}
                autoFocus
            />
            {/* <motion.button
                style={{ backgroundColor: "#00ff00", color: "#000000", borderRadius: "20px", padding: "10px 12px", opacity: 0.5 }}
                whileHover={{ opacity: 0.8 }}
                onClick={() => HandleAdd()}
            >
                Confirm
            </motion.button> */}
        </motion.div>
    )
}