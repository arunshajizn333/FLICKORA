const validateForm = (userName, email, password) => {

    const isValidUsername = /^[a-zA-Z0-9_]{3,20}$/.test(userName);
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    if (!isValidUsername) return "Invalid Username";

    if (!isValidEmail) return "Invalid Email";

    if (!isValidPassword) return "Invalid Password";


     return null;

}  