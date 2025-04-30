// Enhanced form validation and submission feedback
function showMsg(flag) {
    const successBox = document.querySelector('.successBox');
    if (flag === 0) {
        if (!successBox) {
            const newSuccessBox = document.createElement('div');
            newSuccessBox.className = 'successBox';
            newSuccessBox.textContent = 'Your message has been sent successfully!';
            newSuccessBox.style.cssText = 'background: #4caf50; color: white; padding: 10px; border-radius: 5px; text-align: center; margin-top: 10px;';
            document.querySelector('form').appendChild(newSuccessBox);
        } else {
            successBox.style.display = 'block';
        }
    } else {
        if (successBox) {
            successBox.style.display = 'none';
        }
    }
}

// Add real-time validation for form inputs
document.querySelectorAll('form input, form textarea').forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '#00796b';
        }
    });
});