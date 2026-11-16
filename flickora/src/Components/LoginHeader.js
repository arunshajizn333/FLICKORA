import React from 'react';
import logo from '../assets/Flickora AI Film Ribbon Logo.png';

const LoginHeader = () => {
  return (
    <header className="w-full absolute top-0 left-0 z-20 px-6 sm:px-10 py-6 flex items-center justify-between">
      {/* Left: Brand Logo */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="Flickora AI"
          className="h-16 sm:h-16 w-auto object-contain drop-shadow-[0_0_12px_rgba(168,85,247,0.35)]"
        />
      </div>

      {/* Right: Icon (Help / Question Mark or Back to Home) */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Help & Support"
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 flex items-center justify-center text-gray-400 hover:text-purple-300 transition-all duration-200"
          title="Help & Support"
        >
          {/* Question / Help Icon */}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default LoginHeader;
