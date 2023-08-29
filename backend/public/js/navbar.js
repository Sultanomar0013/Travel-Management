// Add this code at the beginning of your navbar.js file
document.addEventListener("DOMContentLoaded", () => {
    const loginBtnDiv = document.getElementById("loginBtnDiv");
    const loginButton = document.getElementById("loginButton");

    const token = localStorage.getItem("token");
    localStorage.setItem('token', token);
    console.log("Token from localStorage:", token);

    if (token) {
        console.log("User is authenticated.");
        
        replaceWithLogoutButton();
    } else {
        console.log("User is not authenticated.");
        loginButton.addEventListener("click", () => {
            console.log("Login button clicked.");
            // Handle login logic and redirection
            window.location.href = "/login";
        });
    }

    function replaceWithLogoutButton() {
        const logoutButton = document.createElement("button");
        logoutButton.textContent = "Logout";
        logoutButton.addEventListener("click", () => {
            // Handle logout logic here
            // Clear the token from localStorage and redirect to the logout route
            localStorage.removeItem("token");
            window.location.href = "/logout";
        });
        loginBtnDiv.replaceChild(logoutButton, loginButton);
    }
});




