const API_URL = 'https://simplistic-chisel-ceiling.glitch.me/users';

// Fetch users from server and display in the table
async function fetchUsers() {
    const response = await fetch(API_URL);
    const users = await response.json();
    displayUsers(users);
}

// Display users in the table
function displayUsers(users) {
    const tbody = document.querySelector('#users-table tbody');
    tbody.innerHTML = '';
    users.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td><a href="tel:${user.phone}">${user.phone}</a></td>
            <td><a href="mailto:${user.email}">${user.email}</a></td>
        `;
        tbody.appendChild(row);
    });
}

// Handle form submission
document.getElementById('user-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    // Create new user object
    const newUser = { name, phone, email };

    // Send user data to server
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        if (response.ok) {
            fetchUsers(); // Reload users after adding a new one
            this.reset(); // Reset the form fields
        } else {
            const error = await response.json();
            alert(error.error); // Show error message
        }
    } catch (error) {
        console.error('Failed to save user data.', error);
    }
});

// Initial call to fetch and display users on page load
fetchUsers();
