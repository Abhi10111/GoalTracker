import { time } from "framer-motion";
import React, { createContext, useReducer, useEffect } from "react";
import { getToday, isModifiedToday } from "../utils/dateUtils.js";

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
            const newTask = {
                id: crypto.randomUUID(),
                title: action.payload.title,
                estimatedTime: parseInt(hh, 10) * 60 + parseInt(mm, 10),
                created: getToday(),
                subtasks: [],
                listId: action.payload.listId,
                deadLine: ""
            };
            window.api.addTask(newTask);
            return [...state, newTask];
        }

        case "ADD_TODAY_TASK": {
            const [hh, mm] = action.payload.time.split(":")
            const newTask = {
                id: crypto.randomUUID(),
                title: action.payload.title,
                estimatedTime: parseInt(hh, 10) * 60 + parseInt(mm, 10),
                created: getToday(),
                subtasks: [],
                listId: "",
                deadLine: getToday().split(",")[0].trim()
            };

            window.api.addTask(newTask);
            return [...state, newTask];
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

        case "MARK_FOR_TODAY":
            const updatedState = state.map(task =>
                task.id === action.payload
                    ? { ...task, deadLine: getToday().split(",")[0].trim() }
                    : task
            );

            window.api.updateTasks(updatedState);
            return updatedState;
        default:
            return state;
    }
}

export function TaskProvider({ children }) {
    const [tasks, dispatch] = useReducer(tasksReducer, []);

    function markTaskForToday(taskId) {
        dispatch({
            type: "MARK_FOR_TODAY",
            payload: taskId
        });
    }
    function getTaskbyListId(listId) {
        if (listId === "today") {
            return tasks.filter(task => isModifiedToday(task.deadLine))
        }
        return tasks.filter(task => task.listId === listId && !isModifiedToday(task.deadLine) && !task.completed)
    }
    useEffect(() => {
        window.api.loadTasks().then(data => {
            dispatch({ type: "FETCH_TASKS", payload: data });
        });
    }, []);

    return <TasksContext.Provider value={{ tasks, dispatch, getTaskbyListId, markTaskForToday }}>
        {children}
    </TasksContext.Provider>
}

