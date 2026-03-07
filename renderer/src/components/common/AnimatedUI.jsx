import React from "react";
import { motion } from "framer-motion";

const actionPaneAnimationVariants = {
    "slide": {
        hidden: {
            opacity: 0,
            x: 12
        },
        hovered: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.2,
                ease: "easeOut",
            },
        },
    },
    "fade": {
        hidden: {
            opacity: 0,
        },
        hovered: {
            opacity: 1,
            transition: {
                duration: 0.2,
                ease: "easeOut",
            }
        }

    }
};

export function Clock({ remainingSec }) {
    const hours = Math.floor(remainingSec / 3600);
    const minutes = Math.floor((remainingSec % 3600) / 60);
    const seconds = remainingSec % 60;

    return (
        <motion.div
            className="clock"
            style={{ position: "absolute", pointerEvents: "none" }}
            variants={{ hovered: { opacity: 0 } }}
        >
            {String(hours).padStart(2, "0")}:
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
        </motion.div>
    );
}

export function ActionPane({ idle, children, animationType }) {
    return (
        <div className="flex items-center justify-end" style={{ position: "relative", width: "40%" }}>
            {idle}
            <motion.div className="actions"
                variants={actionPaneAnimationVariants[animationType]}>
                {children}
            </motion.div>
        </div>
    )
}
