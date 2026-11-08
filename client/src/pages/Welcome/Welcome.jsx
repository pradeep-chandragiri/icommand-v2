import React, { useState, useCallback } from 'react'
import BackgroundScene from './components/BackgroundScene.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Footer from './components/Footer.jsx';
import LoginModal from './components/LoginModal.jsx';
import SignupModal from './components/SignupModal.jsx';

const Welcome = () => {
    
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = useCallback(() => {
    setShowSignup(false);
    setShowLogin(true);
  }, []);

  const handleSignup = useCallback(() => {
    setShowLogin(false);
    setShowSignup(true);
  }, []);

  const isModalOpen = showLogin || showSignup;

  return (
    <div id="container">
      {/* Background Scene */}
      <BackgroundScene paused={ isModalOpen } />

      <div className="overlay-container overlay-mask">

        {/* Navbar */}
        <Navbar onLogin={handleLogin} onSignup={handleSignup} />

        {/* Hero */}
        <Hero onLogin={handleLogin} onSignup={handleSignup} />

        {/* Footer */}
        <Footer />

      </div>

      {/* Login model */}
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}

      {/* Signup model */}
      {showSignup && (
        <SignupModal onClose={() => setShowSignup(false)} />
      )}
    </div>
  )
}

export default Welcome