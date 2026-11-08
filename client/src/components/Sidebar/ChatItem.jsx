import React, { useRef, useState } from 'react'
import { Trash } from 'lucide-react'
import DeleteModal from '../Modals/DeleteModal.jsx'

// Avatar background palette
const avatarColors = [
    '#ff0000',
    '#16d55c',
    '#5d00ff',
    '#ffa200',
    '#0051ff',
    '#ff0073',
    '#0d00ff',
    '#00ffea'
]

const ChatItem = ({ data }) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const timerRef = useRef(null)

    // Start long-press timer
    const handleTouchStart = () => {
        timerRef.current = setTimeout(() => {
            setShowDeleteModal(true)
            timerRef.current = null
        }, 600)
    }

    // Cancel long-press timer
    const handleTouchEnd = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
    }

    // Generate consistent avatar color
    const getAvatarColor = (title = '') => {
        const hash = [...title].reduce((acc, char) => acc + char.charCodeAt(0), 0)
        return avatarColors[hash % avatarColors.length]
    }

    const avatarColor = getAvatarColor(data.title)

    return (
        <>
            <article
                className="chat-item"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                onContextMenu={(e) => e.preventDefault()}
            >

                {/* Date Avatar */}
                <div className="chat-item__avatar">
                    <div className="chat-item__avatar-content" style={{ '--avatar-background': avatarColor }}>
                        <h2>{data.day}</h2>
                        <span>{data.month}</span>
                    </div>
                </div>

                {/* Chat Information */}
                <div className="chat-item__content">
                    <h3 className="chat-item__title">{data.title}</h3>
                    <p className="chat-item__preview">{data.response}</p>
                </div>

                {/* Delete Button */}
                <button type="button" className="chat-item__delete" aria-label="Delete chat" onClick={() => setShowDeleteModal(true)}>
                    <Trash size={15} strokeWidth={1.2} />
                </button>

            </article>

            {/* Delete Modal */}
            {showDeleteModal && <DeleteModal data={data} onClose={() => setShowDeleteModal(false)} />}
        </>
    )
}

export default ChatItem