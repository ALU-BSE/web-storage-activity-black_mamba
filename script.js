document.addEventListener("DOMContentLoaded", () => {
    checkAuth();
    loadTheme();
    loadCart();

    document.getElementById("loginForm")?.addEventListener("submit", loginUser);
    document.getElementById("logoutBtn")?.addEventListener("click", logoutUser);
    document.getElementById("themeToggle")?.addEventListener("click", toggleTheme);
    document.getElementById("addToCart")?.addEventListener("click", addToCart);
});

// **User Authentication**
function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    
    if (username) {
        document.cookie = `authToken=${encodeURIComponent(username)}; expires=${getExpiry(7)}; Secure; path=/`;
        alert("Login successful!");
        location.reload();
    }
}

function logoutUser() {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    alert("Logged out!");
    location.reload();
}

function checkAuth() {
    const authToken = getCookie("authToken");
    if (authToken) {
        document.getElementById("login-section").style.display = "none";
    } else {
        document.getElementById("logoutBtn").style.display = "none";
    }
}

// **Theme Toggle with Local Storage**
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
}

// **Shopping Cart with Session Storage**
function addToCart() {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.push({ product: "Book", quantity: 1 });
    sessionStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function loadCart() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = cart.map(item => `<li>${item.product} - Quantity: ${item.quantity}</li>`).join("");
}

// **Utility Functions**
function getCookie(name) {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
    }, {});
    return cookies[name];
}

function getExpiry(days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    return date.toUTCString();
}
