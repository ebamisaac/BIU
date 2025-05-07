document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }
    
    // Fetch class data (in a real app, this would come from the API)
    // For now we're using the static HTML content
    
    // Navigation tabs
    const navLinks = document.querySelectorAll('.class-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // In a real app, this would load the appropriate content
            // For now we're just showing the same content
        });
    });
});