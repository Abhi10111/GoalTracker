import React from "react";
import { createContext, useReducer, useEffect } from "react";

export const TasksContext = createContext(null);

function tasksReducer(state, action) {
    switch (action.type) {
        case "FETCH_TASKS": {
            const updatedState = action.payload.map(task =>
            (
                {
                    ...task,
                    subtasks: task.subtasks.map(subtask => {
                        if (subtask.completed && !IsModifiedToday(subtask.lastModified || "")) {
                            if (subtask.daily) {
                                return {
                                    ...subtask,
                                    completed: false,
                                    lastModified: new Date().toISOString()
                                }
                            }
                            return null;
                        }
                        else {
                            return subtask;
                        }
                    }
                    ).filter(Boolean)
                }
            ));
            window.api.updateTasks(updatedState);
            return updatedState;
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
                id: crypto.randomUUID(),
                title: action.payload.title,
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
                                daily: false,
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

export function IsModifiedToday(dateString) {
    const todayStart = new Date().setHours(0, 0, 0, 0);
    const lastModified = new Date(dateString).getTime();
    return lastModified >= todayStart;
}

