import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import logo from '../assets/Flickora AI Film Ribbon Logo.png';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const [activeTab, setActiveTab] = useState('Home');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error('Sign out error:', error);
    });
  };

  const navItems = [
    { name: 'Home' },
    { name: 'Explore' },
    {
      name: 'AI Assistant',
      isAi: true,
    },
    { name: 'Actors' },
    { name: 'My Watchlist' },
  ];

  return (
    <header className="w-full bg-[#0a0a16]/95 backdrop-blur-md border-b border-gray-800/40 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Brand Logo */}
      <div className="flex items-center gap-8 w-3/12">
        <div
          onClick={() => navigate(user ? '/Home' : '/')}
          className="flex items-center cursor-pointer select-none"
        >
          <img
            src={logo}
            alt="Flickora AI"
            className="h-9 sm:h-11 w-auto object-contain drop-shadow-[0_0_14px_rgba(168,85,247,0.45)] hover:opacity-95 transition-opacity"
          />
        </div>
      </div>

      {/* Right: Nav Items, Search, Notifications & User Avatar (Only when logged in) */}
      {user && (
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Nav Items */}
          <div className="mr-10">
            <nav className="hidden md:flex items-center gap-3">
              {navItems.map((item) => {
                const isActive = activeTab === item.name;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActiveTab(item.name)}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-[#1e1b38] text-white shadow-inner border border-purple-500/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.isAi && (
                      <svg
                        className="w-3.5 h-3.5 text-purple-400 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L14.3 9.7L22 12L14.3 14.3L12 22L9.7 14.3L2 12L9.7 9.7L12 2Z" />
                      </svg>
                    )}
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Search Bar */}
          <div className="relative hidden sm:flex items-center">
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search movies, actors, genres..."
              className="w-56 md:w-72 bg-[#121124] text-xs sm:text-sm text-gray-200 placeholder-gray-500 rounded-full pl-9 pr-4 py-2 border border-gray-800/90 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 transition-all"
            />
          </div>

          {/* Notification Bell */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {/* Purple Notification Badge Dot */}
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-purple-500 rounded-full ring-2 ring-[#0a0a16]" />
          </button>

          {/* User Profile Avatar with dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown((prev) => !prev)}
              aria-label="User menu"
              className="w-8 h-8 rounded-full bg-[#413c66] flex items-center justify-center text-[#d0ccf7] overflow-hidden border border-purple-400/30 hover:ring-2 hover:ring-purple-500/50 transition-all cursor-pointer"
            >
              <img
                src={
                  user?.photoURL ||
                  "https://avatars.githubusercontent.com/u/154526818?v=4"
                }
                alt={user?.displayName || 'User'}
                className="w-full h-full object-cover"
              />
            </button>

            {/* User Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-[#131227] border border-gray-800 rounded-xl shadow-2xl py-2 z-50 text-xs">
                <div className="px-4 py-2 border-b border-gray-800">
                  <p className="font-semibold text-white truncate">
                    {user?.displayName || 'User'}
                  </p>
                  <p className="text-gray-400 truncate">{user?.email || ''}</p>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-white/5 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
