import React from 'react';
import SigninupPage from '../pages/SigninupPage';
import Footer from './Footer';
import Home from '../pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Header from './Header';

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: '/Home', element: <Home /> },
    { path: '/', element: <SigninupPage /> },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a1a]">
      <Header/>
      <main className="flex-grow flex flex-col">
        <RouterProvider router={appRouter} />
      </main>
      <Footer />
    </div>
  );
};

export default Body;