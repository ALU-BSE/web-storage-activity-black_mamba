// **Sanitize User Input**
function sanitizeInput(input) {
    return encodeURIComponent(input);
}

// **Generate CSRF Token**
function generateCSRFToken() {
    return Math.random().toString(36).substr(2);
}
