document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const phoneInput = document.getElementById('phoneNumber');
    const termsCheckbox = document.getElementById('termsCheckbox');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const smsBtn = document.getElementById('smsBtn');
    const googleBtn = document.querySelector('.google-btn');
    const facebookBtn = document.querySelector('.facebook-btn');

    // Function to validate phone number
    function validatePhoneNumber(phone) {
        // Basic validation: not empty and only numbers
        return phone.trim() !== '' && /^\d+$/.test(phone);
    }

    // Function to update button states
    function updateButtonStates() {
        const isPhoneValid = validatePhoneNumber(phoneInput.value);
        const isTermsChecked = termsCheckbox.checked;
        
        whatsappBtn.disabled = !(isPhoneValid && isTermsChecked);
        smsBtn.disabled = !(isPhoneValid && isTermsChecked);
    }

    // Event listeners for input changes
    phoneInput.addEventListener('input', updateButtonStates);
    termsCheckbox.addEventListener('change', updateButtonStates);

    // WhatsApp verification function
    function sendCodeViaWhatsApp() {
        const phoneNumber = document.getElementById('countryCode').value + phoneInput.value;
        console.log('Sending WhatsApp code to:', phoneNumber);
        // Add your WhatsApp verification logic here
    }

    // SMS verification function
    function sendCodeViaSMS() {
        const phoneNumber = document.getElementById('countryCode').value + phoneInput.value;
        console.log('Sending SMS code to:', phoneNumber);
        // Add your SMS verification logic here
    }

    // Event listeners for verification buttons
    whatsappBtn.addEventListener('click', sendCodeViaWhatsApp);
    smsBtn.addEventListener('click', sendCodeViaSMS);

    // Social sign-up functions
    function handleGoogleSignUp() {
        console.log('Google sign-up clicked');
        // Add your Google sign-up logic here
    }

    function handleFacebookSignUp() {
        console.log('Facebook sign-up clicked');
        // Add your Facebook sign-up logic here
    }

    // Event listeners for social buttons
    googleBtn.addEventListener('click', handleGoogleSignUp);
    facebookBtn.addEventListener('click', handleFacebookSignUp);

    // Form submission handler
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (validatePhoneNumber(phoneInput.value) && termsCheckbox.checked) {
            console.log('Form submitted successfully');
            // Add your form submission logic here
        }
    });
}); 