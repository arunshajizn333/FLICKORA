import React, { useRef, useState } from "react";

import bgImage from "../assets/Cinematic Purple Filmstrip Login Background.png";
import LoginHeader from "../components/LoginHeader";

const SigninupPage = () => {
  const [authMode, setAuthMode] = useState("Sign in");

   const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  


  const toggleForm = () => {
    setAuthMode(authMode === "Sign In" ? "Sign Up" : "Sign In");
  };

  const authenticateForm = ()=>{

  }

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#0a0a1a]">
      <LoginHeader />
      {/* Full-page background image from assets */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url("${bgImage}")` }}
      />
      {/*Dark cinematic overlay to keep your form readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a]/85 via-[#0a0a1a]/70 to-[#0a0a1a]/90 pointer-events-none" />

      {/* Login/Signup Form*/}
      <div className="relative z-10 w-full max-w-md px-4 py-8">
        <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            {authMode}
          </h1>

           {authMode === "Sign Up" &&
          (   <input
            type="text"
            placeholder="UserName"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
          />)}
        

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
          />

          <p className="text-red-500 text-xs font-medium pl-1">Error Msg</p>

          <button
            type="submit"
            onSubmit={authenticateForm}
            className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md"
          >
            {authMode}
          </button>

          <p
            className="text-xs text-gray-600 text-center mt-2"
            onClick={toggleForm}
          >
            {authMode === "Sign Up"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <span className="text-red-600 font-semibold cursor-pointer hover:underline">
              {authMode === "Sign Up" ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SigninupPage;
