# Inkindi Collections - Secure Clothing E-Commerce Demo

## Overview
Inkindi Collections is a secure and functional clothing e-commerce demo designed for African fashion. This web application implements authentication, theme preferences, shopping cart functionality, and security measures to ensure a seamless and safe shopping experience.

## Features
- **User Authentication (Cookies)**: Secure login/logout using cookies.
- **Theme Preferences (Local Storage)**: Store and retrieve user-selected themes.
- **Shopping Cart (Session Storage)**: Maintain cart session until the browser closes.
- **Security Measures**: XSS and CSRF protection.
- **Modern UI**: Black and gold theme reflecting Inkindi’s brand identity with African fabric patterns.

## Technologies Used
- **Frontend**: HTML, CSS (Tailwind), JavaScript
- **Storage Methods**: Cookies, Local Storage, and Session Storage
- **Security**: CryptoJS for encryption, CSRF token implementation

## Implementation Details

### 1. User Authentication (Cookies)
Implemented using cookies to store authentication tokens securely.
```javascript
// Set authentication cookie
document.cookie = `authToken=${CryptoJS.SHA256(email)}; expires=${new Date(Date.now() + 7*24*60*60*1000).toUTCString()}; Secure; HttpOnly; path=/`;

// Logout (clear cookie)
document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
```

### 2. Theme Preferences (Local Storage)
User preferences such as theme and font size are stored in local storage.
```javascript
// Store theme settings
localStorage.setItem('inkindiSettings', JSON.stringify({ theme: 'dark', fontSize: 16 }));

// Retrieve theme settings
const settings = JSON.parse(localStorage.getItem('inkindiSettings')) || {};
```

### 3. Shopping Cart (Session Storage)
Shopping cart data is stored in session storage, ensuring items remain available until the session ends.
```javascript
// Add item to cart
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
cart.push({ product: "Kitenge Dress", quantity: 2, price: 45000 });
sessionStorage.setItem('cart', JSON.stringify(cart));
```

### 4. Security Implementation
- **Sanitizing User Input**: Prevents XSS attacks.
- **CSRF Protection**: Tokens included in checkout forms.
- **Encryption**: Encrypt user data stored in local storage.
```javascript
// Sanitize fabric type input
const fabricInput = encodeURIComponent(userInput);

// Generate CSRF token
const csrfToken = CryptoJS.lib.WordArray.random(32).toString();
document.getElementById('checkoutForm').innerHTML += `<input type="hidden" name="csrfToken" value="${csrfToken}">`;

// Encrypt user email
localStorage.setItem('user', CryptoJS.AES.encrypt(email, 'INKINDI_SECRET_KEY'));
```

### 5. Data Storage Comparison
| Criteria         | Cookies          | Local Storage    | Session Storage  |
|------------------|------------------|------------------|------------------|
| Storage Limit    | 4KB              | 5-10MB           | 5-10MB           |
| Data Persistence | Configurable     | Permanent        | Session-only     |
| Server Access    | Yes              | No               | No               |

## Final Integration
- **Workflow**: Login → Browse clothes (theme persists) → Add to cart → Secure checkout.
- **Testing**: Incognito mode resets cookies/session storage; local storage remains.
- **Deliverables**:
  - Fully functional demo for African clothing sales.
  - Documentation explaining storage choices.
  - Security audit report.

## Collaboration
- Tasks were assigned to developers and tracked via GitHub Projects.
- Team members: @Patrick Nayituriki, @Nadia Teta, @Nubuhoro Divine, @ Daniel IRYIVUZE.

## Acknowledgments
Thanks to the Inkindi team for their dedication in building a secure and stylish e-commerce platform for African fashion! 🎉
