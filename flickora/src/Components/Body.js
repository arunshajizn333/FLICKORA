import React from 'react';
import SigninupPage from '../pages/SigninupPage';
import Footer from './Footer';
import Home from '../pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router';

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/Signin', element: <SigninupPage /> },
  ]);

  return (
   
    <div className="min-h-screen flex flex-col bg-[#0a0a1a]">
      
      <main className="flex-grow flex flex-col">
        <RouterProvider router={appRouter} />
      </main>

      
      <Footer />
    </div>
  );
};

export default Body;