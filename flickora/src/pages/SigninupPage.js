
import React, { useRef, useState } from "react";

import bgImage from "../assets/Cinematic Purple Filmstrip Login Background.png";
import LoginHeader from "../components/LoginHeader";
import validate from "../utils/validate";

const SigninupPage = () => {
  const [authMode, setAuthMode] = useState("Sign In");
  const [errMsg, setErrMsg] = useState("")

  const refName = useRef(null);
  const refEmail = useRef(null);
  const refPassword = useRef(null);

  const toggleForm = () => {
    setAuthMode((prevMode) =>
      prevMode === "Sign In" ? "Sign Up" : "Sign In"
    );
  };


  const authenticateForm = (event) => {
    event.preventDefault();

    const username = refName.current?.value.trim() || "";
    const email = refEmail.current?.value.trim() || "";
    const password = refPassword.current?.value || "";

    const error = validate(
      authMode,
      username,
      email,
      password
    );

    setErrMsg(error || "");

    if (error) return;

    console.log("Validation successful!");

    // Add Firebase authentication here
  };


  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#0a0a1a]">

      <LoginHeader />

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url("${bgImage}")` }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a]/85 via-[#0a0a1a]/70 to-[#0a0a1a]/90 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-4 py-8">

        <form
          onSubmit={authenticateForm}
          className="w-full max-w-sm mx-auto bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4"
        >

          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            {authMode}
          </h1>

          {authMode === "Sign Up" && (
            <input
              type="text"
              ref={refName}
              placeholder="Username"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          )}

          <input
            type="email"
            ref={refEmail}
            placeholder="Email"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="password"
            ref={refPassword}
            placeholder="Password"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errMsg && (
            <p className="text-red-500 text-xs font-medium text-center">
              {errMsg}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md"
          >
            {authMode}
          </button>

          <p className="text-xs text-gray-600 text-center mt-2">
            {authMode === "Sign Up"
              ? "Already have an account?"
              : "Don't have an account?"}

            {" "}

            <button
              type="button"
              onClick={toggleForm}
              className="text-red-600 font-semibold hover:underline"
            >
              {authMode === "Sign Up" ? "Sign In" : "Sign Up"}
            </button>
          </p>

        </form>
      </div>
    </div>
  );
};

export default SigninupPage;
