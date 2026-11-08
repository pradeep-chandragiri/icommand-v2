import React from 'react'
import { X } from 'lucide-react'

const NewChatModal = ({ showNewChat }) => {

    return (
        <div className="new-chat-modal">
            <div className="new-chat-modal__content">

                {/* Header */}
                <div className="new-chat-modal__header">
                    <h2 className="new-chat-modal__title">Create new chat</h2>

                    <button type="button" className="new-chat-modal__close" onClick={() => showNewChat(false)}>
                        <X size={17} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Description */}
                <p className="new-chat-modal__description">Keep it short and recognizable</p>

                {/* Input */}
                <input type="text" className="new-chat-modal__input" placeholder="Enter chat name" />

                {/* Actions */}
                <div className="new-chat-modal__actions">
                    <button type="button" className="new-chat-modal__cancel" onClick={() => showNewChat(false)}>
                        Cancel
                    </button>

                    <button type="button" className="new-chat-modal__save">
                        Save
                    </button>
                </div>

            </div>
        </div>
    )
}

export default NewChatModal