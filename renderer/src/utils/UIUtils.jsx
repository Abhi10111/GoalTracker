import React from "react";
import { motion } from "framer-motion";

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

export function ActionPane({ time, children, animationType }) {
    return (
        <div className="flex items-center justify-end" style={{ position: "relative", width: "60px" }}>
            <motion.span
                style={{ opacity: 0.5, position: "absolute", pointerEvents: "none" }}
                variants={{ hovered: { opacity: 0 } }}>
                {time || 0}min
            </motion.span>
            <motion.div className="actions"
                variants={animationType === "slide" ? actionVariantsSlide : actionVariantsFade}>
                {children}
            </motion.div>
        </div>
    )
}
