import React from 'react';

const Message = ({ data }) => {

    const isUser = data.role === 'user';

    return (
        <div className={`message ${isUser ? 'message--user' : 'message--assistant'}`}>

            <div className="message__content">
                <p className="message__text">{data.content}</p>
                <span className="message__time">{data.time}</span>
            </div>

        </div>
    );
};

export default Message;