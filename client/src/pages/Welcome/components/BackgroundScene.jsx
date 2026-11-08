import React, { useEffect, useRef } from 'react'
import { scenes } from '../../../assets/assets.js'

const BackgroundScene = ({ paused = false }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const managePlayback = () => {
        if (paused || document.hidden) {
            video.pause();
        } else {
            video.play().catch(() => {});
        }
    };

    // Initial playback check
    managePlayback();
    // Listen for browser tab visibility changes
    document.addEventListener('visibilitychange', managePlayback);

    return () => {
        document.removeEventListener('visibilitychange', managePlayback);
    };
  }, [paused]);

  return (
    <div className="scene-container">
      <video 
        ref={videoRef}
        src = { scenes.scene }
        poster = { scenes.scenePoster }
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  )
}

export default BackgroundScene
