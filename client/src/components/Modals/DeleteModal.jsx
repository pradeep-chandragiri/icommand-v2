import React from 'react'
import { X } from 'lucide-react'

const DeleteModal = ({ data, onClose }) => {

    return (
        <div className="delete-modal">
            <div className="delete-modal__content">

                {/* Header */}
                <div className="delete-modal__header">
                    <h2 className="delete-modal__title">Delete chat?</h2>

                    <button type="button" className="delete-modal__close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Description */}
                <div className="delete-modal__body">
                    <p>This will permanently delete {data.title}. This can't be undone.</p>
                </div>

                {/* Actions */}
                <div className="delete-modal__actions">
                    <button type="button" className="delete-modal__confirm">
                        Confirm Delete
                    </button>
                </div>

            </div>
        </div>
    )
}

export default DeleteModal