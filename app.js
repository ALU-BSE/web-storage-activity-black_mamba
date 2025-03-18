// Authentication with Cookies
const setAuthCookie = () => {
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 7);
    document.cookie = `authToken=${CryptoJS.SHA256('user123').toString()}; expires=${expiration.toUTCString()}; Secure; path=/`;
};

const checkAuth = () => document.cookie.includes('authToken=');

// Theme Management
const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    document.getElementById('themeToggle').innerHTML = 
        savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
};

document.getElementById('themeToggle').addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.getElementById('themeToggle').innerHTML = 
        isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Cart Management
const updateCartDisplay = () => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    document.getElementById('cartCounter').textContent = cart.length;
    
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.product}</span>
            <span>$${item.price}</span>
            <span>Size: ${item.size}</span>
            <span>Qty: ${item.quantity}</span>
        </div>
    `).join('');

    // Update order history
    const orderTable = document.getElementById('orderTable');
    orderTable.innerHTML = cart.map(item => `
        <tr>
            <td>${new Date().toLocaleString()}</td>
            <td>${item.product}</td>
            <td>${item.size}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
    `).join('');
};

// Security Functions
const generateCSRFToken = () => Math.random().toString(36).substr(2, 15);

const sanitizeInput = (input) => encodeURIComponent(input);

const showNotification = (message) => {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => notification.style.display = 'none', 2000);
};

// Form Handling
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // CSRF Validation
    const csrfToken = document.getElementById('csrfToken').value;
    if (!csrfToken) {
        showNotification('Invalid request!');
        return;
    }

    // Sanitize and encrypt
    const email = CryptoJS.AES.encrypt(sanitizeInput(document.getElementById('email').value), 'secret').toString();
    const password = CryptoJS.AES.encrypt(sanitizeInput(document.getElementById('password').value), 'secret').toString();

    // Set auth cookie
    setAuthCookie();
    
    // Update UI
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('productsSection').style.display = 'block';
    document.getElementById('cartSection').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'inline-block';
    showNotification('Login successful!');
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    sessionStorage.clear();
    location.reload();
});

// Product Interactions
document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart')) {
        const productCard = e.target.closest('.product-card');
        const product = productCard.querySelector('.product-title').textContent;
        const price = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
        const size = productCard.querySelector('.size-select').value || 'N/A';
        const quantity = parseInt(productCard.querySelector('.quantity-input').value);

        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        cart.push({
            product: sanitizeInput(product),
            price,
            size: sanitizeInput(size),
            quantity,
            date: new Date().toISOString()
        });
        sessionStorage.setItem('cart', JSON.stringify(cart));
        
        updateCartDisplay();
        showNotification('Item added to cart!');
    }
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    document.getElementById('csrfToken').value = generateCSRFToken();

    if (checkAuth()) {
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('productsSection').style.display = 'block';
        document.getElementById('cartSection').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'inline-block';
        updateCartDisplay();
    }
});