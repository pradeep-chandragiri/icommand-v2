import React, { useState } from 'react'
import { Command } from 'lucide-react'

import ChatList from './ChatList.jsx'
import SidebarNavbar from './SidebarNavbar.jsx'

import NewChatModal from '../Modals/NewChatModal.jsx'
import SearchModal from '../Modals/SearchModal.jsx'
import ProfileModal from '../Modals/ProfileModal.jsx'

const Sidebar = () => {

    const [showNewChatModal, setShowNewChatModal] = useState(false)
    const [showSearchModal, setShowSearchModal] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)

    return (
        <>
            <aside className="sidebar">

                {/* Sidebar Header */}
                <header className="sidebar__header">
                    <div className="sidebar__brand">
                        <span className="sidebar__brand-icon">
                            <Command size={23} />
                        </span>
                        <h3 className="sidebar__brand-name">iCommand</h3>
                    </div>
                </header>

                {/* Recent Chats */}
                <section className="sidebar__chats">
                    <div className="sidebar__section-header">
                        <span className="sidebar__section-title">Recent chats</span>
                    </div>

                    <ChatList />
                </section>

                {/* Sidebar Navigation */}
                <div className="sidebar__footer">
                    <SidebarNavbar
                        showNewChat={setShowNewChatModal}
                        showSearch={setShowSearchModal}
                        showProfile={setShowProfileModal}
                    />
                </div>

            </aside>

            {/* Modals */}
            {showNewChatModal && <NewChatModal showNewChat={setShowNewChatModal} />}
            {showSearchModal && <SearchModal showSearch={setShowSearchModal} />}
            {showProfileModal && <ProfileModal showProfile={setShowProfileModal} />}
        </>
    )
}

export default Sidebar