import React from 'react'
import SigninupPage from './SigninupPage'
import Header from "./Header"
import Footer from "./Footer"
import Home from './Home'

import { createBrowserRouter, RouterProvider } from "react-router";

const Body = () => {

    const appRouter=createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/Signin", element: <SigninupPage/> },
]);
    
  return (
    <div>
        <Header/>
       <RouterProvider router={appRouter}/>
        <Footer/>

    </div>
  )
}



export default Body