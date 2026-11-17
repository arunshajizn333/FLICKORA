const validate = (authMode, userName, email, password) => {

    const isValidUsername = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/.test(userName);
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    if (authMode === "Sign Up" && !isValidUsername) {
        return "Username must start with a letter and contain 4–20 characters (letters, numbers or underscores).";
    }
    if (!isValidEmail) return "Invalid Email";
    if (!isValidPassword) return "Invalid Password";


    return null;

}

export default validate;