import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from 'lucide-react';
import ListCard from "./ListCard";
import CreateListModal from "./CreateListModal";
import "../../styles/HomePage.css";
import "../../styles/ListCard.css"



export default function ListArea() {
    const [lists, setLists] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    useEffect(() => {
        window.api.getLists().then(data => setLists(data));
    }, []);
    return (
        <motion.div className='list-area'>
            {
                lists.map(list =>
                    <ListCard list={list} />)
            }
            <div className="listcard create-list-card"
                onClick={() => setShowCreateModal(true)}
            >
                <Plus size={28} strokeWidth={3} />
                CREATE LIST
            </div>
            {showCreateModal &&
                (
                    <CreateListModal onClose={(e, newList) => {
                        if (newList) {
                            setLists(prev => [...prev, newList]);
                        }
                        setShowCreateModal(false);
                    }}
                    />
                )
            }
        </motion.div>
    )
}
