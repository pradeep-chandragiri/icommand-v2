import React from 'react'
import { X } from 'lucide-react'

const DeleteModal = ({ data, onClose }) => {
    return (
        <div className="delete-container">
            <div className="delete-model">
                <div className='delete-head'>
                    <h2>Delete chat?</h2>
                    <span onClick={ onClose }>
                        <X size={20} />
                    </span>
                </div>
                <div className="delete-info">
                    <p>This will permanently delete {data.title}. This can't be undone.</p>
                </div>
                <div className="delete-confirm">
                    <button>Confirm Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal
