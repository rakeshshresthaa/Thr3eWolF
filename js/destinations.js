document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Pause auto-scroll on hover
    const scrollContainer = document.querySelector('.scroll-container');
    const scrollContent = document.querySelector('.scroll-content');

    scrollContainer.addEventListener('mouseenter', () => {
        scrollContent.style.animationPlayState = 'paused';
    });

    scrollContainer.addEventListener('mouseleave', () => {
        scrollContent.style.animationPlayState = 'running';
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add click event to destination cards
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.addEventListener('click', () => {
            const destination = card.querySelector('h3').textContent;
            // You can add more functionality here, like showing a modal or navigating to a detail page
            console.log(`Selected destination: ${destination}`);
        });
    });
}); 