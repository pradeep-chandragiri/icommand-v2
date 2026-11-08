import React from 'react'
import { MessageCirclePlus, Search, CircleUser, Astroid } from 'lucide-react'

const SidebarNavbar = ({ showNewChat, showSearch, showProfile }) => {
    return (
        <>
            <nav>
                <ul className='nav-links'>
                    <li className='nav-link nav-hidden active'>
                        <span className='nl-icon'>
                            <Astroid size={22} />
                        </span>
                        <span className='nl-label'>Home</span>
                    </li>
                    <li className='nav-link' onClick={() => showNewChat(true)}>
                        <span className='nl-icon'>
                            <MessageCirclePlus size={22} />
                        </span>
                        <span className='nl-label'>New chat</span>
                    </li>
                    <li className='nav-link' onClick={() => showSearch(true)}>
                        <span className='nl-icon'>
                            <Search size={22} />
                        </span>
                        <span className='nl-label'>Search chats</span>
                    </li>
                    <li className='nav-link' onClick={() => showProfile(true)}>
                        <span className='nl-icon'>
                            <CircleUser size={22} />
                        </span>
                        <span className='nl-label'>Your profile</span>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default SidebarNavbar
