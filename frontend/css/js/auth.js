document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const studentId = document.getElementById('studentId').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Client-side validation
        if (!studentId || !password) {
            alert('Please enter both Student ID and Password');
            return;
        }
        
        // Send login request to server
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                studentId,
                password,
                rememberMe
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Store token if remember me is checked
                if (rememberMe) {
                    localStorage.setItem('authToken', data.token);
                } else {
                    sessionStorage.setItem('authToken', data.token);
                }
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert(data.message || 'Login failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login.');
        });
    });
    
    // Check for existing session
    checkExistingSession();
});

function checkExistingSession() {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
        // Verify token with server
        fetch('/api/auth/verify', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.valid) {
                window.location.href = 'dashboard.html';
            }
        })
        .catch(error => {
            console.error('Session verification error:', error);
            // Clear invalid tokens
            localStorage.removeItem('authToken');
            sessionStorage.removeItem('authToken');
        });
    }
}