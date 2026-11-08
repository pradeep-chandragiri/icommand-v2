import React from 'react'

const NewChat = ({ Icon }) => {
    return (
        <>
            <li className='nav-link'>
                <span className='nl-icon'>
                    <Icon size={20} />
                </span>
                <span className='nl-label'>New chat</span>
            </li>
        </>
    )
}

export default NewChat
