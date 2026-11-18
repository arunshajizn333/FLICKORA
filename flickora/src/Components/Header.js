import React from 'react'
import logo from '../assets/Flickora AI Film Ribbon Logo.png';

const Header = () => {
  return (
    <div>
        <header className="w-full absolute top-0 left-0 z-20 px-6 sm:px-10 py-6 flex items-center justify-between">
      {/* Left: Brand Logo */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="Flickora AI"
          className="h-16 sm:h-16 w-auto object-contain drop-shadow-[0_0_12px_rgba(168,85,247,0.35)]"
        />
      </div>
    </header>
    </div>
  )
}

export default Header