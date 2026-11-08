import React from 'react'
import { MessageCirclePlus, Search, CircleUser, House } from 'lucide-react'

const SidebarNavbar = ({ showNewChat, showSearch, showProfile }) => {

    return (
        <nav className="sidebar-nav">
            <ul className="sidebar-nav__list">

                {/* Home */}
                <li className="sidebar-nav__item sidebar-nav__item--active sidebar-nav__item--mobile">
                    <span className="sidebar-nav__icon">
                        <House size={22} />
                    </span>
                    <span className="sidebar-nav__label">Home</span>
                </li>

                {/* New Chat */}
                <li className="sidebar-nav__item" onClick={() => showNewChat(true)}>
                    <span className="sidebar-nav__icon">
                        <MessageCirclePlus size={22} />
                    </span>
                    <span className="sidebar-nav__label">New chat</span>
                </li>

                {/* Search */}
                <li className="sidebar-nav__item" onClick={() => showSearch(true)}>
                    <span className="sidebar-nav__icon">
                        <Search size={22} />
                    </span>
                    <span className="sidebar-nav__label">Search chats</span>
                </li>

                {/* Profile */}
                <li className="sidebar-nav__item" onClick={() => showProfile(true)}>
                    <span className="sidebar-nav__icon">
                        <CircleUser size={22} />
                    </span>
                    <span className="sidebar-nav__label">Your profile</span>
                </li>

            </ul>
        </nav>
    )
}

export default SidebarNavbar