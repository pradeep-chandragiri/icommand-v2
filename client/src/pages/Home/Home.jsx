import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar.jsx'

const Home = () => {
    return (
        <div className="home--container">
            { /* Sidebar */ }
            <Sidebar />

            <main>
                { /* Empty state || Chat page */ }
                <Outlet />
            </main>
        </div>
    )
}

export default Home
