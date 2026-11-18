import React, { useRef, useState } from "react";
import validate from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const SigninupPage = () => {
  const dispatch = useDispatch();
  const [authMode, setAuthMode] = useState("Sign In"); // "Sign In" | "Sign Up"
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const refName = useRef(null);
  const refEmail = useRef(null);
  const refPassword = useRef(null);

  const toggleAuthMode = () => {
    setErrMsg("");
    setSuccessMsg("");
    setAuthMode((prev) => (prev === "Sign In" ? "Sign Up" : "Sign In"));
  };

  // 1. Email & Password Authentication (Sign In & Sign Up)
  const authenticateForm = async (event) => {
    event.preventDefault();
    setErrMsg("");
    setSuccessMsg("");

    const username = refName.current?.value.trim() || "";
    const email = refEmail.current?.value.trim() || "";
    const password = refPassword.current?.value || "";

    const validationError = validate(authMode, username, email, password);
    if (validationError) {
      setErrMsg(validationError);
      return;
    }

    setIsLoading(true);
    try {
      // Respect "Remember Me" persistent vs session storage
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      if (authMode === "Sign Up") {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, {
          displayName: username,
        });

        const currentUser = auth.currentUser;
        dispatch(
          addUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          })
        );
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      const code = error.code;
      if (code === "auth/email-already-in-use") {
        setErrMsg("An account with this email already exists. Please sign in.");
      } else if (code === "auth/weak-password") {
        setErrMsg("Password should be at least 6 characters long.");
      } else if (
        code === "auth/invalid-credential" ||
        code === "auth/wrong-password"
      ) {
        setErrMsg("Incorrect email or password. Please try again.");
      } else if (code === "auth/user-not-found") {
        setErrMsg("No account found with this email. Please check or sign up.");
      } else if (code === "auth/too-many-requests") {
        setErrMsg(
          "Too many failed login attempts. Please reset your password or try again later."
        );
      } else {
        setErrMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Working Google OAuth Sign-In
  const handleGoogleSignIn = async () => {
    setErrMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      dispatch(
        addUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        setErrMsg("Google sign-in was canceled.");
      } else if (error.code !== "auth/cancelled-popup-request") {
        setErrMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Working Password Reset via Email
  const handleForgotPassword = async () => {
    const email = refEmail.current?.value.trim();
    if (!email) {
      setErrMsg("Please enter your email address in the field above first.");
      return;
    }

    setErrMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg(
        `A password reset link has been sent to ${email}. Check your inbox.`
      );
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrMsg("No account registered with this email address.");
      } else if (error.code === "auth/invalid-email") {
        setErrMsg("Please provide a valid email address.");
      } else {
        setErrMsg(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-76px)] w-full flex items-center justify-center bg-[#0d0d12] px-4 py-12 sm:py-16">
      {/* Subtle, tasteful background vignette (no excessive neon AI glow) */}
      <div className="absolute inset-0 bg-radial from-neutral-900/40 via-transparent to-[#0d0d12] pointer-events-none" />

      {/* Focused Authentication Card */}
      <div className="relative z-10 w-full max-w-[420px] bg-[#15151b] border border-neutral-800/80 rounded-2xl p-7 sm:p-9 shadow-2xl">
        {/* Header Title & Subtitle */}
        <div className="mb-7">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {authMode === "Sign Up" ? "Create an account" : "Sign in"}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1.5">
            {authMode === "Sign Up"
              ? "Sign up to start watching and tracking films"
              : "Welcome back. Enter your credentials to continue"}
          </p>
        </div>

        {/* Feedback Alerts */}
        {errMsg && (
          <div
            role="alert"
            className="mb-5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3.5 py-3 rounded-lg flex items-start gap-2.5"
          >
            <svg
              className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span className="leading-snug">{errMsg}</span>
          </div>
        )}

        {successMsg && (
          <div
            role="status"
            className="mb-5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-3.5 py-3 rounded-lg flex items-start gap-2.5"
          >
            <svg
              className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span className="leading-snug">{successMsg}</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={authenticateForm} className="flex flex-col gap-4">
          {/* Username Input (Only on Sign Up) */}
          {authMode === "Sign Up" && (
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-medium text-neutral-300 mb-1.5"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                ref={refName}
                placeholder="e.g. arunshaji"
                required
                autoComplete="username"
                disabled={isLoading}
                className="w-full px-3.5 py-2.5 bg-[#1e1e26] border border-neutral-700/80 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors disabled:opacity-50"
              />
            </div>
          )}

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-neutral-300 mb-1.5"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              ref={refEmail}
              placeholder="name@example.com"
              required
              autoComplete="email"
              disabled={isLoading}
              className="w-full px-3.5 py-2.5 bg-[#1e1e26] border border-neutral-700/80 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors disabled:opacity-50"
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-medium text-neutral-300"
              >
                Password
              </label>
              {authMode === "Sign In" && (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isLoading}
                  className="text-xs text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                ref={refPassword}
                placeholder="••••••••"
                required
                autoComplete={
                  authMode === "Sign Up" ? "new-password" : "current-password"
                }
                disabled={isLoading}
                className="w-full pl-3.5 pr-10 py-2.5 bg-[#1e1e26] border border-neutral-700/80 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
              className="w-4 h-4 rounded bg-[#1e1e26] border-neutral-700 text-red-600 focus:ring-red-600/30 accent-red-600 cursor-pointer"
            />
            <label
              htmlFor="remember-me"
              className="text-xs text-neutral-300 select-none cursor-pointer"
            >
              Remember me on this device
            </label>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 bg-[#e50914] hover:bg-[#c11119] active:bg-[#a50d15] text-white text-sm font-semibold rounded-lg transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <span>{authMode === "Sign Up" ? "Sign Up" : "Sign In"}</span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-5">
          <div className="border-t border-neutral-800 w-full" />
          <span className="bg-[#15151b] px-3 text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
            or
          </span>
          <div className="border-t border-neutral-800 w-full" />
        </div>

        {/* Real Working Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-[#1e1e26] hover:bg-[#262631] border border-neutral-700/80 rounded-lg text-sm font-medium text-neutral-200 hover:text-white transition-colors flex items-center justify-center gap-3 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
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
          <span>Continue with Google</span>
        </button>

        {/* Toggle Mode Link */}
        <p className="text-xs text-neutral-400 text-center mt-6">
          {authMode === "Sign Up"
            ? "Already have an account?"
            : "New to Flickora?"}{" "}
          <button
            type="button"
            onClick={toggleAuthMode}
            disabled={isLoading}
            className="text-white hover:underline font-semibold ml-1 cursor-pointer"
          >
            {authMode === "Sign Up" ? "Sign in now" : "Sign up now"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SigninupPage;
