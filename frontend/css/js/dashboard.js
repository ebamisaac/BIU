document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }
    
    // Fetch student data
    fetch('/api/students/me', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Authentication failed');
        }
        return response.json();
    })
    .then(student => {
        // Update welcome message
        document.getElementById('welcomeMessage').textContent = `Welcome, ${student.name}!`;
        
        // Load classes (in a real app, this would come from the API)
        // For now we're using the static HTML content
    })
    .catch(error => {
        console.error('Error:', error);
        window.location.href = 'index.html';
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const classCards = document.querySelectorAll('.class-card');
        
        classCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const teacher = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || teacher.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Logout functionality (you would add a logout button to the UI)
    // document.getElementById('logoutBtn').addEventListener('click', function() {
    //     localStorage.removeItem('authToken');
    //     sessionStorage.removeItem('authToken');
    //     window.location.href = 'index.html';
    // });
});