const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirm = document.getElementById("confirm");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from submitting
    if (checkInputs()) {
        handleSubmit(); // Only submit if validation passes
    }
});

function checkInputs() {
    let isValid = true; // Flag to track validation success

    // Trim input values to remove spaces
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const confirmValue = confirm.value.trim();

    if (usernameValue === '') {
        setError(username, "This field cannot be blank !!!!!!");
        isValid = false;
    } else {
        setSuccess(username);
    }

    if (emailValue === '') {
        setError(email, "This field cannot be blank !!!!!!");
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, "Check the email format !!!!!!");
        isValid = false;
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError(password, "This field cannot be blank !!!!!!");
        isValid = false;
    } else if (passwordValue.length <= 4) {
        setError(password, "Password is too short!!");
        isValid = false;
    } else {
        setSuccess(password);
    }

    if (confirmValue === '') {
        setError(confirm, "This field cannot be blank !!!!!!");
        isValid = false;
    } else if (passwordValue !== confirmValue) {
        setError(confirm, " Password and Confirm Password must be the same.");
        isValid = false;
    } else {
        setSuccess(confirm);
    }

    return isValid; // Return true if all validations pass, else false
}

function setError(input, msg) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    small.innerText = msg;
    formControl.className = "form-control error"; // Add error class
}

function setSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success"; // Add success class
}

function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function handleSubmit() {
    alert("Form submitted successfully! 🎉"); // Temporary success message
    form.reset(); // Reset form fields
    const formControls = document.querySelectorAll(".form-control");
    formControls.forEach(control => control.className = "form-control"); // Reset styles
}
