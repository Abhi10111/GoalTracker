import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import "../../styles/CreateListModal.css";

export default function CreateListModal({ onClose }) {
    const [name, setName] = useState("");
    const [selectedColor, setSelectedColor] = useState("#4ade80");

    const colors = [
        "#4ade80",
        "#60a5fa",
        "#facc15",
        "#f472b6",
        "#22d3ee",
        "#fde047",
        "#000000"
    ];

    const Submit = async (e) => {
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            const newList = await window.api.createList(name);
            onClose(e, newList);

        }
    };

    return (
        <div className="modal-overlay">
            <motion.div
                className="modal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
            >
                <button className="modal-close" onClick={onClose}>
                    <X size={18} />
                </button>

                <h2>Create a new list</h2>

                <div
                    className="icon-preview"
                    style={{ background: selectedColor }}
                >
                    {name.charAt(0).toUpperCase() || "L"}
                </div>

                <div className="color-row">
                    {colors.map(color => (
                        <div
                            key={color}
                            className={`color-dot ${selectedColor === color ? "selected" : ""}`}
                            style={{ background: color }}
                            onClick={() => setSelectedColor(color)}
                        />
                    ))}
                </div>

                <input
                    className="list-input"
                    placeholder="Enter list name"
                    value={name}
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={e => Submit(e)}
                />

                {/* <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>

                    <button className="create-btn" onClick={()=>Submit(e)}>
                        Create
                    </button>
                </div> */}
            </motion.div>
        </div>
    );
}