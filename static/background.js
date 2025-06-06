// Background pattern mouse interaction
const patternGroups = document.querySelectorAll('.pattern-group');
let mouseX = 0;
let mouseY = 0;
let lastTime = 0;

// Update positions based on mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animate patterns
function animatePatterns(timestamp) {
    const elapsed = timestamp - lastTime;
    lastTime = timestamp;

    patternGroups.forEach((group, index) => {
        // Calculate speed and offset for each pattern
        const speed = 0.05 + (index * 0.02);
        const offset = index * 100;
        
        // Calculate new position with smooth transition
        const x = mouseX + Math.sin(index * 1.5) * 100;
        const y = mouseY + Math.cos(index * 1.5) * 100;
        
        // Add some natural movement
        const naturalX = Math.sin(timestamp * 0.001 + index * 2) * 20;
        const naturalY = Math.cos(timestamp * 0.001 + index * 2) * 20;
        
        group.style.transform = `translate(${x * speed + naturalX}px, ${y * speed + naturalY}px)`;
    });
    
    requestAnimationFrame(animatePatterns);
}

// Start animation
requestAnimationFrame(animatePatterns);
