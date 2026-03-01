import React, { createContext, useEffect, useState } from "react";

export const ListContext = createContext(null)

export function ListProvider({ children }) {
    // const [tasks, dispatch] = useReducer(tasksReducer, []);
    const [lists, setLists] = useState([]);
    useEffect(() => {
        window.api.getLists().then(lists => {
            setLists(lists);
        });
    }, []);
    return <ListContext.Provider value={{ lists }}>
        {children}
    </ListContext.Provider>
}