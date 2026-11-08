import React, { memo } from 'react'

const Footer = () => {
  return (
    <footer>
        <div className="footer-links">
        <a href="/privacy">GitHub</a>
        <a href="/terms">LinkedIn</a>
        <a href="/contact">Contact</a>
        </div>
        <span>© {new Date().getFullYear()} iCommand</span>
    </footer>
  )
}

export default memo(Footer)
