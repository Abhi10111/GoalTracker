import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

const tick = {
  checked: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.25 }
  },
  unchecked: {
    pathLength: 0,
    opacity: 0,
    transition: { duration: 0.15 }
  }
};

export default function CircleCheckbox({ isChecked , onClick}) {

  return (
    <motion.div
      onClick={onClick}
      className="flex items-center justify-center cursor-pointer"
      style={{
        width: 12,
        height: 12,
        borderRadius: "35%",
        border: isChecked
          ? "2px solid rgb(120,220,120)"
          : "2px solid rgb(120,120,120)",
        background: isChecked ? "rgb(180,255,120)" : "transparent",
        overflow: "hidden"
      }}
      whileHover={{ scale: 1.15 }}
      transition={{ duration: 0.3, ease:"easeIn" }}
    >
      <motion.svg viewBox="0 0 24 24" width="12" height="12"
        initial={false}
        animate={isChecked ? "checked" : "unchecked"}
      >
        <motion.path
          d="M4.5 12.75l6 6 9-13.5"
          stroke="black"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={tick}
        />
      </motion.svg>
    </motion.div>
  );
}
