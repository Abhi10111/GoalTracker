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
            startTime: (new Date()).toLocaleString('en-IN'),
            endTime: null,
            duration: duration,
            remainingSec: duration * 60,
            isPaused: false,
            cycleType: "focus"
        };

        setCurSession(session);
        console.log("Session started:", session);
    }

    function PauseResumeSession(taskId) {
        if (!curSession || curSession.taskId != taskId) return;

        setCurSession(s => ({
            ...s,
            isPaused: !s.isPaused
        }));
    }

    function ExtendSession(taskId) {
        if (!curSession || curSession.taskId != taskId) return;

        setCurSession(s => ({
            ...s,
            duration:s.duration+10,
            remainingSec: s.remainingSec + 10*60
        }));
    }
    function EndSession(taskId) {
        if (!curSession || curSession.taskId != taskId) return;

        const endSession = {
            id: curSession.id,
            taskId: curSession.taskId,
            startTime: curSession.startTime,
    endTime: (new Date()).toLocaleString('en-IN'),
            duration: curSession.duration,
        }
        console.log("Session ended:", endSession);
        setCurSession(null);
    }

    return (<SessionContext.Provider value={{ curSession, StartSession, PauseResumeSession, ExtendSession, EndSession }}>
        {children}
    </SessionContext.Provider>)
}
