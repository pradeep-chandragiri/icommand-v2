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
    ]

    return (
        <div className="search-modal">
            <div className="search-modal__content">

                {/* Search Header */}
                <div className="search-modal__header">
                    <input type="text" placeholder="Search..." className="search-modal__input" />

                    <button type="button" className="search-modal__close" onClick={() => showSearch(false)}>
                        <X size={18} strokeWidth={1.6} />
                    </button>
                </div>

                {/* Recent Chats */}
                <div className="search-modal__body">
                    <p className="search-modal__label">Recent chats</p>

                    <div className="search-modal__list">
                        {recentChats.map((chat, index) => (
                            <div className={`search-modal__item ${index === 0 ? 'search-modal__item--active' : ''}`} key={index}>
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