import React, { useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const ChatBox = ({ onSend }) => {

    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    const handleChange = (e) => {
        setMessage(e.target.value);

        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage) return;

        onSend?.(trimmedMessage);
        setMessage('');

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <footer className="chat-box">
            <form className="chat-box__form" onSubmit={handleSubmit}>
                <textarea
                    ref={textareaRef}
                    className="chat-box__input"
                    placeholder="Message iCommand..."
                    value={message}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    rows={1}
                />

                <div className="chat-box__actions">
                    <button type="submit" className="chat-box__send" disabled={!message.trim()} aria-label="Send message">
                        <ArrowUp size={20} />
                    </button>
                </div>
            </form>

            <p className="chat-box__disclaimer">iCommand can make mistakes. Verify important information.</p>
        </footer>
    );
};

export default ChatBox;