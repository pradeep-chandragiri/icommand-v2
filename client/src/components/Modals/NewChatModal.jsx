import React from 'react'
import { X } from 'lucide-react'

const NewChatModal = ({ showNewChat }) => {
    return (
        <div className='new-chat-container'>
            <div className="new-chat-modal">

                {/* Header */}
                <div className="new-chat-header">
                    <h2>Create new chat</h2>
                    <span className="new-chat-close" onClick={ () => showNewChat(false) }>
                        <X size={17} strokeWidth={1.5} />
                    </span>
                </div>

                {/* Description */}
                <p className="new-chat-description">Keep it short and recognizable</p>

                {/* Input */}
                <input type="text" className="new-chat-input" placeholder="Enter chat name" />

                {/* Actions */}
                <div className="new-chat-actions">
                    <button className="new-chat-cancel" 
                        onClick={ () => showNewChat(false) }
                    >
                        Cancel
                    </button>
                    <button className="new-chat-save">Save</button>
                </div>

            </div>
        </div>
    )
}

export default NewChatModal
