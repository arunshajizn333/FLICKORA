import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const AppLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Centralized Auth Listener & Navigation at the Layout level
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate('/Home');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a1a]">
      <Header />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;

