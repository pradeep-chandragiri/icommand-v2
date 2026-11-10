import React, { useEffect, useState } from 'react'
import ChatItem from './ChatItem.jsx'
import { getAllChats } from '../../services/chatService.js';

const ChatList = () => {

    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {

        const fetchChats = async () => {
            try {
                const response = await getAllChats();

                if (response.success) {
                    setChats(response.data.chats);
                }

            } catch (error) {
                setError(error.response?.data?.message || 'Failed to load chats.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchChats();

    }, []);

    if (isLoading) return <p>Loading chats...</p>;

    if (error) return <p>{error}</p>;

    return (
        <div className="chat-list">
            {chats.map((data) => (
                <ChatItem key={data._id} data={data} />
            ))}
        </div>
    )
}

export default ChatList