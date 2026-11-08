import React, { useState } from 'react'
import ChatList from './ChatList.jsx'
import SidebarNavbar from './SidebarNavbar.jsx'
import { Command } from 'lucide-react'
import NewChatModal from '../Modals/NewChatModal.jsx'
import SearchModal from '../Modals/SearchModal.jsx'
import ProfileModal from '../Modals/ProfileModal.jsx'

const Sidebar = () => {

    const [showNewChatModal, setShowNewChatModal] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);

    return (
        <>
            <aside>
                {/* Sidebar Header & Chats */}
                <div className="sidebar-chats">
                    {/* Header */}
                    <div className="sidebar-chats-header">
                        <div className="app-logo">
                            <span>
                                <Command size={23} />
                            </span>
                            <h3>iCommand</h3>
                        </div>
                    </div>

                    {/* Chat List */}
                    <div className="sidebar-chats-list">
                        <div className="recent-label">
                            <span>Recent chats</span>
                        </div>
                        <ChatList />
                    </div>
                </div>

                {/* Sidebar Navbar */}
                <div className="sidebar-navbar">
                    {/* Navbar */}
                    <SidebarNavbar 
                        showNewChat = { setShowNewChatModal }
                        showSearch = { setShowSearchModal }
                        showProfile = { setShowProfileModal }
                    />
                </div>
            </aside>
            {/* Modals */}
            {showNewChatModal && 
                <NewChatModal showNewChat = { setShowNewChatModal } />
            }
            {showSearchModal &&
                <SearchModal showSearch = { setShowSearchModal } />
            }
            {showProfileModal && 
                <ProfileModal showProfile = { setShowProfileModal } />
            }
        </>
    )
}

export default Sidebar
