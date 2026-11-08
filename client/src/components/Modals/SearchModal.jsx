import React from 'react'
import { X, MessageCircle } from 'lucide-react'

const SearchModal = ({ showSearch }) => {

    const recentChats = [
        "Style Navbar List",
        "Explain Regularisation Simply",
        "Cinematography Editing Roadmap",
        "Schema Designing Tutorial",
        "Page Name Recommendations",
        "Generate Mobile Image"
    ];

    return (
        <div className='search-container'>
            <div className="search-modal">
                {/* Search Header */}
                <div className="search-header">
                    <input type="text" placeholder="Search..." className="search-input" />

                    <span className="search-close" onClick={ () => showSearch(false) }>
                        <X size={18} strokeWidth={1.6} />
                    </span>
                </div>

                {/* Recent Chats */}
                <div className="search-content">
                    <p className="search-label">Recent chats</p>
                    <div className="search-list">
                        {recentChats.map((chat, index) => (
                            <div className={`search-item ${index === 0 ? 'active' : ''}`} key={index}>
                                <MessageCircle size={17} strokeWidth={1.6} />
                                <span>{chat}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchModal
