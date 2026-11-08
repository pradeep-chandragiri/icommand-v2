import React, { useState } from 'react'
import { Trash } from 'lucide-react'
import DeleteModal from '../Modals/DeleteModal.jsx'

const ChatItem = ({ data }) => {
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [timerId, setTimerId] = useState(null);

    // Start long-press timer
    const handleTouchStart = () => {
        const timer = setTimeout(() => {
            setShowDeleteModal(true);
            setTimerId(null);
        }, 600);

        setTimerId(timer);
    };

    // Cancel timer
    const handleTouchEnd = () => {
        clearTimeout(timerId);
        setTimerId(null);
    };

    return (
        <>
            <div className='chat-item'
                onTouchStart={ handleTouchStart }
                onTouchEnd={ handleTouchEnd }
                onTouchMove={ handleTouchEnd }
                onTouchCancel={ handleTouchEnd }
                onContextMenu={ (e) => e.preventDefault() }
            >
                <>
                    <h3 className="chat-title">{ data.title }</h3>
                    <p className="chat-response">{ data.date }</p>
                </>
                <div className="delete-btn" onClick={ () => setShowDeleteModal(true) }>
                    <Trash size={15} strokeWidth={1.2} />
                </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && 
                <DeleteModal data={ data } onClose={() => setShowDeleteModal(false)} />     
            }   
        </>
    )
}

export default ChatItem
