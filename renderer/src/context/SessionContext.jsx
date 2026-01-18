import React, { createContext, useState, useEffect } from "react";

export const SessionContext = createContext(null);

export function SessionProvider({ children }) {
    const [curSession, setCurSession] = useState(null);
    useEffect(() => {
        if (!curSession) return;

        const id = setInterval(() => {
            setCurSession(s => {
                if (!s) return null;
                if (s.remainingSec <= 0 || s.isPaused) return s;

                return {
                    ...s,
                    remainingSec: s.remainingSec - 1
                };
            });
        }, 1000);

        return () => clearInterval(id);
    }, [curSession?.id]);

    function StartSession(taskId, duration) {
        if (curSession) return;

        const session = {
            id: crypto.randomUUID(),
            taskId: taskId,
            startTime: Date.now(),
            endTime: null,
            duration: duration,
            remainingSec: duration * 60,
            isPaused: false,
            cycleType: "focus"
        };

        setCurSession(session);
    }

    function EndSession() {
        const endSession = {
            id: curSession.id,
            taskId: curSession.taskId,
            startTime: curSession.startTime,
            endTime: Date.now(),
            duration: curSession.duration,
        }
        console.log("Session ended:", endSession);
        setCurSession(null);
    }

    return (<SessionContext.Provider value={{ curSession, StartSession, EndSession }}>
        {children}
    </SessionContext.Provider>)
}
