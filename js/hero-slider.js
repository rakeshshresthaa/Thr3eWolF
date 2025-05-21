document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.hero-arrow.prev');
    const nextBtn = document.querySelector('.hero-arrow.next');
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Function to show next slide
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) {
            next = 0;
        }
        showSlide(next);
    }

    // Function to show previous slide
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) {
            prev = slides.length - 1;
        }
        showSlide(prev);
    }

    // Start automatic slideshow
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Stop automatic slideshow
    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlideshow();
            showSlide(index);
            startSlideshow();
        });
    });

    // Event listeners for arrow buttons
    prevBtn.addEventListener('click', () => {
        stopSlideshow();
        prevSlide();
        startSlideshow();
    });

    nextBtn.addEventListener('click', () => {
        stopSlideshow();
        nextSlide();
        startSlideshow();
    });

    // Pause slideshow when hovering over the hero section
    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', stopSlideshow);
    hero.addEventListener('mouseleave', startSlideshow);

    // Start the slideshow
    startSlideshow();
}); 