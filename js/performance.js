// ========================================================================== //
// Performance Optimizations //
// ========================================================================== //

function optimizePerformance() {
    const images = document.querySelectorAll('img[data-src]');
        // Lazy load images using reusable IntersectionObserver helper
        const imageObserver = window.createObserver((entry, observer) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    images.forEach(img => imageObserver.observe(img));
    const criticalImages = [
        'assets/images/profile-hero.webp',
        'assets/images/about-image.webp'
    ];
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}