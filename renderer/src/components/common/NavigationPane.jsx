import React from "react"
import { BicepsFlexed, House } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../components/ActionButtons";
import "../../styles/HomePage.css"


export default function NavigationPane() {
    const navigate = useNavigate()
    return (<div className="navigation-buttons"
    >
        <ActionButton icon={<House />} onClick={() => navigate('/')} />
        <ActionButton icon={<BicepsFlexed />} onClick={() => navigate('/today')} />
    </div>)
}