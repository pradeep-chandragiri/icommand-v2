import React, { memo } from 'react'

const Hero = ({ onLogin, onSignup }) => {
  return (
    <main className="hero">
        <h1>Bored of digging through books?</h1>
        <p className="hero-sub">Ask iCommand. Your thinking partner for every day tasks.</p>

        <div className="auth-card">
            <button type="button" className="btn btn-solid" onClick={onSignup}>
                Sign up
            </button>
            <button type="button" className="btn btn-glass" onClick={onLogin}>
                Login
            </button>
        </div>
    </main>
  )
}

export default memo(Hero)
