import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar.jsx'

const Home = () => {

    const location = useLocation();
    const isChatPage = location.pathname.startsWith('/chat/');

    return (
        <div className={`home ${isChatPage ? 'home--chat-open' : ''}`}>
            <Sidebar />

            <main className="home__main">
                <Outlet />
            </main>
        </div>
    )
}

export default Home