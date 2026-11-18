const validate = (authMode, userName, email, password) => {
  const isValidUsername = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/.test(userName);
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const isValidPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  if (authMode === "Sign Up") {
    if (!userName || userName.trim().length === 0) {
      return "Please enter your username.";
    }
    if (!isValidUsername) {
      return "Username must be 3–20 characters and start with a letter (letters, numbers, or underscores).";
    }
  }

  if (!email || email.trim().length === 0) {
    return "Please enter your email address.";
  }

  if (!isValidEmail) {
    return "Please enter a valid email address (e.g. name@example.com).";
  }

  if (!password || password.length === 0) {
    return "Please enter your password.";
  }

  if (authMode === "Sign Up" && !isValidPassword) {
    return "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character (@$!%*?&).";
  }

  return null;
};

export default validate;
