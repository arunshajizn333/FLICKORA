import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/reduxStore/userSlice';

const AppLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Centralized Auth Listener & Protected Route Enforcement
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        if (location.pathname === '/') {
          navigate('/Home');
        }
      } else {
        dispatch(removeUser());
        if (location.pathname !== '/') {
          navigate('/');
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate, location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0b0f] text-neutral-100 antialiased selection:bg-red-950 selection:text-white">
      <Header />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
