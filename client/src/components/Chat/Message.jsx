import React from 'react';

const Message = ({ data }) => {

    const isUser = data.role === 'user';

    const date = new Date(Number(data.created_at));

    const formattedDate = date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
    });

    return (
        <div className={`message ${isUser ? 'message--user' : 'message--assistant'}`}>

            <div className="message__content">
                <p className="message__text">{data.context}</p>
                <span className="message__time">{formattedDate}</span>
            </div>

        </div>
    );
};

export default Message;