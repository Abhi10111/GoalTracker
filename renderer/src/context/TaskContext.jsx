import { time } from "framer-motion";
import React from "react";
import { createContext, useReducer, useEffect } from "react";

export const TasksContext = createContext(null);

function tasksReducer(state, action) {
    switch (action.type) {
        case "FETCH_TASKS": {
            return action.payload;
        }
        case "TOGGLE": {
            const updatedState = action.payload.subtaskId ? state.map(task =>
                task.id === action.payload.taskId
                    ? {
                        ...task, subtasks: task.subtasks.map(subtask =>
                            subtask.id === action.payload.subtaskId
                                ? {
                                    ...subtask,
                                    completed: !subtask.completed
                                }
                                : subtask)
                    }
                    : task)
                : state.map(task => task.id === action.payload.taskId
                    ? {
                        ...task,
                        completed: (new Date()).toLocaleString('en-IN')
                    }
                    : task)
            window.api.updateTasks(updatedState);
            return updatedState;
        }
        case "ADD_TASK": {
            const [hh, mm] = action.payload.time.split(":")
            const updatedState = [...state,
            {
                id: crypto.randomUUID(),
                title: action.payload.title,
                estimatedTime: parseInt(hh, 10) * 60 + parseInt(mm, 10),
                created: (new Date()).toLocaleString('en-IN'),
                subtasks: []
            }];
            window.api.updateTasks(updatedState);
            return updatedState;
        }

        case "ADD_SUBTASK": {
            const [hh, mm] = action.payload.time.split(":")
            const updatedState = state.map(task =>
                task.id === action.payload.taskId
                    ? {
                        ...task,
                        subtasks: [
                            ...task.subtasks,
                            {
                                id: crypto.randomUUID(),
                                task: action.payload.title,
                                estimatedTime: parseInt(hh, 10) * 60 + parseInt(mm, 10),
                                completed: false,
                            }
                        ]
                    }
                    : task
            );
            window.api.updateTasks(updatedState);
            return updatedState;
        }

        case "DELETE": {
            const updatedState = action.payload.subtaskId ?
                state.map(task =>
                    task.id === action.payload.taskId
                        ? {
                            ...task,
                            subtasks: task.subtasks.filter(subtask => subtask.id !== action.payload.subtaskId)
                        }
                        : task
                ) :
                state.filter(task => task.id !== action.payload.taskId);
            window.api.updateTasks(updatedState);
            return updatedState;
        }

        case "EXTEND": {
            const updatedState = state.map(task =>
                task.id === action.payload.taskId
                    ? { ...task, estimatedTime: task.estimatedTime + 10 }
                    : task
            )
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
            dispatch({ type: "FETCH_TASKS", payload: data });
        });
    }, []);

    return <TasksContext.Provider value={{ tasks, dispatch }}>
        {children}
    </TasksContext.Provider>
}

export function isModifiedToday(dateString) {
    const storedDatePart = dateString.split(",")[0].trim();

    const todayDatePart = new Date().toLocaleDateString("en-IN");

    return storedDatePart === todayDatePart;
}

