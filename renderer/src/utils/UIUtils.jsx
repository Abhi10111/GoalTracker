import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SessionContext } from "./TimerUtils.jsx";

const actionButtonVariants = {
    static: {},
    hovered: { color: "#ffffff" }
};

const actionVariantsSlide = {
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
};

const actionVariantsFade = {
    hidden: {
        opacity: 0,
    },
    hovered: {
        opacity: 1,
        transition: {
            duration: 0.2,
            ease: "easeOut",
        },
    },
};

export function ActionButton({ icon, onClick }) {
    return (
        <motion.button
            variants={actionButtonVariants}
            onClick={onClick}
            whileHover="hovered">
            {icon}
        </motion.button>
    );
}


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
                variants={animationType === "slide" ? actionVariantsSlide : actionVariantsFade}>
                {children}
            </motion.div>
        </div>
    )
}
