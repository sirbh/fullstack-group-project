/**
 * TODO: 8.4 Register new user
 *       - Handle registration form submission
 *       - Prevent registration when password and passwordConfirmation do not match
 *       - Use createNotification() function from utils.js to show user messages of
 *       - error conditions and successful registration
 *       - Reset the form back to empty after successful registration
 *       - Use postOrPutJSON() function from utils.js to send your data back to server
 */
const registrationForm = document.getElementById('register-form');
const submitButton = document.getElementById('btnRegister');
const notificationContainer = document.getElementById('notifications-container');

submitButton.addEventListener('click', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirmation = document.getElementById('passwordConfirmation').value;

    // Passwords must match
    if (password !== passwordConfirmation) {
        createNotification('Passwords do not match', notificationContainer, false);
        return;
    }

    const userData = {
        name, 
        email, 
        password,
    }

    const response = await postOrPutJSON('/api/register', 'POST', userData);

    if (response.status === 200) {
        createNotification('Registration successful', notificationContainer, true);
        registrationForm.reset();
    }
});