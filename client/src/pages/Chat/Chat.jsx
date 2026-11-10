import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Trash2, X, MoreHorizontal } from 'lucide-react';
import Message from '../../components/Chat/Message.jsx';
import ChatBox from '../../components/Chat/ChatBox.jsx';
import { deleteChat, getChat } from '../../services/chatService.js';
import { sendMessage } from '../../services/messageService.js';

const Chat = () => {
    const navigate = useNavigate();
    const [showActions, setShowActions] = useState(false);
    const actionsRef = useRef(null);

    const handleBack = () => navigate('/chat');

    const { chatid } = useParams()

    const handleDelete = async (e) => {
        try {    
            const response = await deleteChat(chatid);
            if (response.success) {
                navigate('/chat');
            }
        } catch (error) {
            console.error('Chat deletion failed:', error.response?.data || error.message);
        } finally {

        }
    };

    const handleClose = () => {
        setShowActions(false);
        navigate('/chat');
    };

    // msg sending
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);

    const handleSend = async (prompt) => {

        try {
            setIsSending(true);

            const response = await sendMessage(chatid, prompt);
            if (response.success) {
                setMessages((prev) => [
                    ...prev,
                    response.data.userMessage,
                    response.data.aiMessage
                ]);
            }
        } catch (error) {
            console.error(
                'Message sending failed:',
                error.response?.data || error.message
            );
        } finally {
            setIsSending(false);
        }
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

        const fetchChat = async () => {
            try {
                setIsLoading(true);

                const response = await getChat(chatid);

                if (response.success) {
                    setChat(response.data.chat);
                    setMessages(response.data.messages);
                }
            } catch (error) {
                console.error(
                    'Failed to fetch chat:',
                    error.response?.data || error.message
                );
            } finally {
                setIsLoading(false);
            }
        };

        if (chatid) {
            fetchChat();
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
        
    }, [chatid]);

    return (
        <section className="chat">
            <header className="chat__header">
                <div className="chat__header-left">
                    <button type="button" className="chat__back" onClick={handleBack} aria-label="Go back">
                        <ArrowLeft size={19} />
                    </button>
                    <div className="chat__title-container">
                        <h2 className="chat__title">{chat?.title || 'New Chat'}</h2>
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
                    {isLoading ? (
                        <p>Loading messages...</p>
                    ) : (
                        messages.map((message) => (
                            <Message key={message._id} data={message} />
                        ))
                    )}
                </div>
            </main>

            <ChatBox onSend={handleSend} />
        </section>
    );
};

export default Chat;