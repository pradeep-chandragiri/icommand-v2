import React from 'react'
import { LogOut, X, Command } from 'lucide-react'
import useAuth from '../../hooks/useAuth.js'

const ProfileModal = ({ showProfile }) => {

    const { user } = useAuth()

    return (
        <div className="profile-modal">
            <div className="profile-modal__content">

                {/* Close Button */}
                <button type="button" className="profile-modal__close" onClick={() => showProfile(false)}>
                    <X size={18} strokeWidth={1.6} />
                </button>

                {/* Avatar */}
                <div className="profile-modal__avatar">
                    <Command size={30} strokeWidth={2} />
                </div>

                {/* User Information */}
                <h2 className="profile-modal__name">{user.display_name}</h2>

                <p className="profile-modal__joined">
                    Joined on {new Date(user.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                    })}
                </p>

                {/* Logout */}
                <button type="button" className="profile-modal__logout">
                    <LogOut size={17} strokeWidth={1.7} />
                    <span>Logout</span>
                </button>

            </div>
        </div>
    )
}

export default ProfileModal