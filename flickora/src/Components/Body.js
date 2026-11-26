import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import SigninupPage from '../pages/SigninupPage';
import Home from '../pages/Home';

const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { path: '/', element: <SigninupPage /> },
        { path: '/Home', element: <Home /> },
      ],
    },
  ]);

const Body = () => {
  return <RouterProvider router={appRouter} />;
};

export default Body;
