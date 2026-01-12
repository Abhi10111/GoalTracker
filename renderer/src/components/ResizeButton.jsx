import React from "react"
import { Maximize2, Minimize2 } from 'lucide-react';
import { motion } from "framer-motion"

export default function ResizeButton({ collapsed, onClick }) {
    return (
        <motion.button
            onClick={onClick} >
            {collapsed ? <Maximize2 color='#808080' />
                : <Minimize2 color='#808080' />}
        </motion.button>
    )
}