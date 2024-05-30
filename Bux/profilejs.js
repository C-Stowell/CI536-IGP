document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".login-form form");
    const registerForm = document.querySelector(".register-form form");

    // Login form submission
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        if (validateEmail(email) && password) {
            alert("Login successful");
            // Here you can add code to handle the login, such as sending the data to the server
        } else {
            alert("Please enter valid email and password");
        }
    });

    // Register form submission
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const confirmPassword = document.getElementById("register-confirm-password").value;

        if (name && validateEmail(email) && password && password === confirmPassword) {
            alert("Registration successful");
            // Here you can add code to handle the registration, such as sending the data to the server
        } else {
            if (!name || !validateEmail(email) || !password) {
                alert("Please fill out all fields");
            } else if (password !== confirmPassword) {
                alert("Passwords do not match");
            }
        }
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});