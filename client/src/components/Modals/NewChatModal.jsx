import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { createChat } from '../../services/chatService.js'

const NewChatModal = ({ showNewChat }) => {

    const navigate = useNavigate();
    const [chatTitle, setChatTitle] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChatCreation = async (e) => {
        e.preventDefault();

        if(!chatTitle.trim() || chatTitle.trim().length < 6) {
            setError('Chat title must contain at least 6 characters.');
            return
        }

        try {
            setIsLoading(true);

            const response = await createChat(chatTitle);

            if (response.success) {
                showNewChat(false);
                navigate(`/chat/${response.data.chat.chatId}`);
            }

        } catch (error) {
            setError(error.response?.data?.error || 'Something went wrong.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="new-chat-modal">
            <div className="new-chat-modal__content">
                <form method="post" onSubmit={handleChatCreation}>
                    {/* Header */}
                    <div className="new-chat-modal__header">
                        <h2 className="new-chat-modal__title">Create new chat</h2>

                        <button type="button" className="new-chat-modal__close" onClick={() => showNewChat(false)}>
                            <X size={17} strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* Description */}
                    <p className="new-chat-modal__description">Keep it short and recognizable</p>

                    {error && (
                        <p>{error}</p>
                    )}
                    {/* Input */}
                    <input type="text" className="new-chat-modal__input" placeholder="Enter chat name" value={ chatTitle } onChange={(e) => setChatTitle(e.target.value)} />

                    {/* Actions */}
                    <div className="new-chat-modal__actions">
                        <button type="button" className="new-chat-modal__cancel" onClick={() => showNewChat(false)}>
                            Cancel
                        </button>

                        <button type="submit" className="new-chat-modal__save" disabled={isLoading}>
                            {
                                isLoading ? 'Saving...' : 'Save'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewChatModal