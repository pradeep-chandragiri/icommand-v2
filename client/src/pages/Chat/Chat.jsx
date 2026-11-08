import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, X, MoreHorizontal } from 'lucide-react';
import Message from '../../components/Chat/Message.jsx';
import ChatBox from '../../components/Chat/ChatBox.jsx';

const Chat = () => {
    const navigate = useNavigate();
    const [showActions, setShowActions] = useState(false);
    const actionsRef = useRef(null);

    const messages = [
        { id: 1, role: 'user', content: 'Hey, can you explain React components?', time: '10:30 AM' },
        { id: 2, role: 'assistant', content: 'Absolutely! React components are reusable building blocks of a React application. They allow you to split your UI into independent and reusable pieces.', time: '10:30 AM' },
        { id: 3, role: 'user', content: 'Can you give me a simple example?', time: '10:31 AM' },
        { id: 4, role: 'assistant', content: 'Sure! A component is simply a JavaScript function that returns JSX. For example, a Welcome component can return a heading that says Hello World.', time: '10:31 AM' }
    ];

    const handleBack = () => navigate('/chat');

    const handleDelete = () => {
        setShowActions(false);
        console.log('Delete conversation');
    };

    const handleClose = () => {
        setShowActions(false);
        navigate('/chat');
    };

    const handleSend = (message) => {
        console.log('New message:', message);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (actionsRef.current && !actionsRef.current.contains(event.target)) {
                setShowActions(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') setShowActions(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    return (
        <section className="chat">
            <header className="chat__header">
                <div className="chat__header-left">
                    <button type="button" className="chat__back" onClick={handleBack} aria-label="Go back">
                        <ArrowLeft size={19} />
                    </button>
                    <div className="chat__title-container">
                        <h2 className="chat__title">React Components</h2>
                    </div>
                </div>

                <div className="chat__header-actions">
                    <button type="button" className="chat__action" onClick={handleDelete} aria-label="Delete conversation">
                        <Trash2 size={18} />
                    </button>
                    <button type="button" className="chat__action" onClick={handleClose} aria-label="Close conversation">
                        <X size={19} />
                    </button>
                </div>

                <div className="chat__mobile-actions" ref={actionsRef}>
                    <button type="button" className="chat__mobile-menu-btn" onClick={() => setShowActions((prev) => !prev)} aria-label="Open conversation actions" aria-expanded={showActions}>
                        <MoreHorizontal size={22} />
                    </button>

                    {showActions && (
                        <div className="chat__mobile-menu">
                            <button type="button" className="chat__mobile-menu-item chat__mobile-menu-item--danger" onClick={handleDelete}>
                                <Trash2 size={17} />
                                <span>Delete conversation</span>
                            </button>
                            <button type="button" className="chat__mobile-menu-item" onClick={handleClose}>
                                <X size={17} />
                                <span>Close conversation</span>
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <main className="chat__messages">
                <div className="chat__messages-container">
                    {messages.map((message) => (<Message key={message.id} data={message} />))}
                </div>
            </main>

            <ChatBox onSend={handleSend} />
        </section>
    );
};

export default Chat;