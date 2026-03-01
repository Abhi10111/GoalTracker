import React, { useEffect } from "react"
import { motion } from "framer-motion";
import "../styles/HomePage.css"
import NavigationPane from "../components/common/NavigationPane";

export default function HomePage() {
    useEffect(() => {
        window.api.resize("homepage")
    }, [])

    return (
        <motion.div className="homepage">
            <div className="homepage-header">
                <h1>Good Morning</h1>
                <NavigationPane />
            </div>
            <h2>Your Lists</h2>
            {/* <ListArea /> */}
        </motion.div>
    )
}   