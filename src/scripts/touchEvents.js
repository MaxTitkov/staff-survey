// Add touch event handlers
document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('dropZone');
    
    // Handle touch events for mobile file selection
    dropZone.addEventListener('touchend', function(e) {
        e.preventDefault();
        document.getElementById('fileInput').click();
    });
    
    // Prevent default browser behavior for drag events on mobile
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
});