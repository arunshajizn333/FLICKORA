import React, { useRef, useState } from "react";
import bgImage from "../assets/Cinematic Purple Filmstrip Login Background.png";
import validate from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const SigninupPage = () => {
  const dispatch = useDispatch();
  const [authMode, setAuthMode] = useState("Sign In");
  const [errMsg, setErrMsg] = useState("");

  const refName = useRef(null);
  const refEmail = useRef(null);
  const refPassword = useRef(null);

  const toggleForm = () => {
    setErrMsg("");
    setAuthMode((prevMode) => (prevMode === "Sign In" ? "Sign Up" : "Sign In"));
  };

  const authenticateForm = (event) => {
    event.preventDefault();

    const username = refName.current?.value.trim() || "";
    const email = refEmail.current?.value.trim() || "";
    const password = refPassword.current?.value || "";

    const error = validate(authMode, username, email, password);

    setErrMsg(error || "");

    if (error) return;

    if (authMode === "Sign Up") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(userCredential.user, {
            displayName: username,
            photoURL: "https://avatars.githubusercontent.com/u/154526818?v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
            })
            .catch((error) => {
              setErrMsg(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;

          if (errorCode === "auth/email-already-in-use") {
            setErrMsg("This email is already registered.");
          } else if (errorCode === "auth/weak-password") {
            setErrMsg("Password should be at least 6 characters.");
          } else if (errorCode === "auth/invalid-credential") {
            setErrMsg("Invalid email or password.");
          } else {
            setErrMsg(error.message);
          }
        });
    } else {
      signInWithEmailAndPassword(auth, email, password).catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-credential") {
          setErrMsg("Invalid email or password.");
        } else if (errorCode === "auth/user-not-found") {
          setErrMsg("No account found with this email.");
        } else {
          setErrMsg(error.message);
        }
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#070612] px-4 py-16">
      {/* Background Poster Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-45 scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url("${bgImage}")` }}
      />

      {/* Atmospheric Cinematic Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070612]/90 via-[#070612]/75 to-[#070612]/95 pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -top-20 -left-20" />
      <div className="absolute w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -bottom-20 -right-20" />

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-md my-auto">
        <div className="bg-[#100f24]/85 backdrop-blur-2xl border border-purple-500/20 rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.65)] hover:border-purple-500/30 transition-all duration-300">
          {/* Header Title & Subtitle */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {authMode === "Sign Up" ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              {authMode === "Sign Up"
                ? "Join Flickora AI to discover, track & stream movies"
                : "Enter your credentials to access your account"}
            </p>
          </div>

          <form onSubmit={authenticateForm} className="flex flex-col gap-4">
            {/* Username Input (Only on Sign Up) */}
            {authMode === "Sign Up" && (
              <div className="relative">
                <input
                  type="text"
                  ref={refName}
                  placeholder="Username"
                  required
                  autoComplete="username"
                  className="w-full px-4 py-3 bg-[#181636]/90 border border-gray-700/70 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                />
              </div>
            )}

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                ref={refEmail}
                placeholder="Email address"
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-[#181636]/90 border border-gray-700/70 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                ref={refPassword}
                placeholder="Password"
                required
                autoComplete={
                  authMode === "Sign Up" ? "new-password" : "current-password"
                }
                className="w-full px-4 py-3 bg-[#181636]/90 border border-gray-700/70 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
              />
            </div>

            {/* Error Message Box */}
            {errMsg && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2 animate-fadeIn">
                <svg
                  className="w-4 h-4 text-red-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errMsg}</span>
              </div>
            )}

            {/* Primary Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer"
            >
              {authMode === "Sign Up" ? "Create Account" : "Sign In"}
            </button>

            {/* Divider: OR */}
            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-gray-700/60 w-full" />
              <span className="bg-[#100f24] px-3 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                or
              </span>
              <div className="border-t border-gray-700/60 w-full" />
            </div>

            {/* Google Sign-in / Sign-up Button (UI Design) */}
            <button
              type="button"
              className="w-full py-2.5 px-4 bg-[#181636]/90 hover:bg-[#201d45] border border-gray-700/80 hover:border-purple-500/40 rounded-xl text-sm font-medium text-gray-200 hover:text-white transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md cursor-pointer"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>
                {authMode === "Sign Up"
                  ? "Sign up with Google"
                  : "Sign in with Google"}
              </span>
            </button>

            {/* Toggle Sign In / Sign Up */}
            <p className="text-xs text-gray-400 text-center mt-3">
              {authMode === "Sign Up"
                ? "Already have an account?"
                : "New to Flickora?"}{" "}
              <button
                type="button"
                onClick={toggleForm}
                className="text-purple-400 font-semibold hover:text-purple-300 transition-colors cursor-pointer ml-1 underline underline-offset-4"
              >
                {authMode === "Sign Up" ? "Sign In now" : "Sign Up now"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninupPage;
