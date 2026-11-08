import React from 'react'
import ChatItem from './ChatItem.jsx'
import { chatItems } from '../../assets/assets.js'

const ChatList = () => {
    return (
        <div className='chat-list'>
            {
                chatItems.map((data) => (
                    <ChatItem key={ data.id } data={ data } />
                ))
            }
        </div>
    )
}

export default ChatList
