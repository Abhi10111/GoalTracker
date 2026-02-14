import React from "react"
import { BicepsFlexed } from "lucide-react"
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css"
import { ActionButton } from "../components/ActionButtons";
export default function HomePage() {
    const navigate = useNavigate()
    return (
        <div className="user-actions">
            <ActionButton icon={<BicepsFlexed />} onClick={() => navigate('/today')} />
        </div>
    )
}   