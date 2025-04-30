// JavaScript for the Forgot Password page

// Set light theme as default and handle theme toggling
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme (default to light if not set)
    const savedTheme = localStorage.getItem('theme') || 'light';
    const modeText = document.getElementById('mode-text');
    const modeIcon = document.querySelector('.dark-mode-toggle i');
    
    applyTheme(savedTheme);
    
    // Add input validation events
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', validateEmailInput);
        emailInput.addEventListener('blur', validateEmailInput);
    }
    
    // Password criteria animation/toggle
    const toggleDarkModeBtn = document.getElementById('dark-mode-toggle');
    if (toggleDarkModeBtn) {
        toggleDarkModeBtn.addEventListener('click', toggleDarkMode);
    }
});

// Apply theme based on setting
function applyTheme(theme) {
    const modeText = document.getElementById('mode-text');
    const modeIcon = document.querySelector('.dark-mode-toggle i');
    
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (modeText) modeText.textContent = 'Light Mode';
        if (modeIcon) {
            modeIcon.classList.remove('fa-moon');
            modeIcon.classList.add('fa-sun');
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (modeText) modeText.textContent = 'Dark Mode';
        if (modeIcon) {
            modeIcon.classList.remove('fa-sun');
            modeIcon.classList.add('fa-moon');
        }
    }
}

// Toggle between dark and light mode
function toggleDarkMode() {
    const modeText = document.getElementById('mode-text');
    const modeIcon = document.querySelector('.dark-mode-toggle i');
    
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        modeText.textContent = 'Dark Mode';
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon');
    } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        modeText.textContent = 'Light Mode';
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
    }
}

// Toggle mobile menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (navLinks && hamburger) {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// Email validation
function validateEmailInput() {
    const email = document.getElementById('email');
    const validationMessage = document.getElementById('email-validation');
    
    if (!email || !validationMessage) return;
    
    if (email.value.trim() !== '' && !validateEmail(email.value)) {
        validationMessage.style.display = 'block';
        email.style.borderColor = 'var(--error-color)';
        return false;
    } else {
        validationMessage.style.display = 'none';
        email.style.borderColor = email.value.trim() !== '' ? 'var(--primary-color)' : 'var(--input-border-light)';
        if (document.body.classList.contains('dark-mode') && email.value.trim() !== '') {
            email.style.borderColor = 'var(--primary-light)';
        }
        return true;
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced send reset link function with simulated loading
function sendResetLink(event) {
    event.preventDefault(); // Prevent form submission
    
    const email = document.getElementById('email');
    const btnText = document.getElementById('btn-text');
    const loader = document.getElementById('loader');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const submitBtn = document.getElementById('submit-btn');
    
    // Hide any existing messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    // Validate email before proceeding
    if (!validateEmailInput()) {
        return;
    }
    
    // Show loader, disable button
    btnText.style.opacity = '0';
    loader.style.display = 'block';
    submitBtn.disabled = true;
    
    // Simulate API request (2 second delay)
    setTimeout(() => {
        // Hide loader
        loader.style.display = 'none';
        btnText.style.opacity = '1';
        submitBtn.disabled = false;
        
        // Mock success (you would typically check for server response here)
        if (Math.random() > 0.1) { // 90% success rate for demonstration
            successMessage.style.display = 'block';
            email.value = ''; // Clear the email field
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        } else {
            // Show error message
            document.getElementById('error-text').textContent = 'Server error. Please try again later.';
            errorMessage.style.display = 'block';
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        }
    }, 2000);
}

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (navLinks && hamburger && 
        navLinks.classList.contains('active') &&
        !event.target.closest('.nav-links') &&
        !event.target.closest('.hamburger')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Add focus trap for accessibility in the mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="email"], input[type="password"]'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// Initialize focus trap on menu when it's opened
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        trapFocus(navLinks);
    }
});