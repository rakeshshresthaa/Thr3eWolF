document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const loginForm = document.getElementById('loginForm');
    const emailOrPhoneInput = document.getElementById('emailOrPhone');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const errorMessage = document.getElementById('errorMessage');
    const googleBtn = document.querySelector('.google-btn');
    const facebookBtn = document.querySelector('.facebook-btn');

    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Form validation
    function validateForm() {
        let isValid = true;
        errorMessage.textContent = '';

        // Validate email/phone
        if (!emailOrPhoneInput.value.trim()) {
            errorMessage.textContent = 'Please enter your email or phone number';
            isValid = false;
        }

        // Validate password
        if (!passwordInput.value.trim()) {
            errorMessage.textContent = 'Please enter your password';
            isValid = false;
        }

        return isValid;
    }

    // Form submission handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Here you would typically make an API call to your backend
            console.log('Form submitted successfully');
            console.log('Email/Phone:', emailOrPhoneInput.value);
            console.log('Password:', passwordInput.value);
            
            // Clear form
            loginForm.reset();
            errorMessage.textContent = '';
        }
    });

    // Social login handlers
    function handleGoogleLogin() {
        console.log('Google login clicked');
        // Add your Google login logic here
    }

    function handleFacebookLogin() {
        console.log('Facebook login clicked');
        // Add your Facebook login logic here
    }

    // Event listeners for social buttons
    googleBtn.addEventListener('click', handleGoogleLogin);
    facebookBtn.addEventListener('click', handleFacebookLogin);

    // Input validation on blur
    emailOrPhoneInput.addEventListener('blur', function() {
        if (!this.value.trim()) {
            errorMessage.textContent = 'Please enter your email or phone number';
        } else {
            errorMessage.textContent = '';
        }
    });

    passwordInput.addEventListener('blur', function() {
        if (!this.value.trim()) {
            errorMessage.textContent = 'Please enter your password';
        } else {
            errorMessage.textContent = '';
        }
    });
}); 