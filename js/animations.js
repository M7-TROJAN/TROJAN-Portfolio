// ========================================================================== //
// Scroll Animations //
// ========================================================================== //

// General reusable IntersectionObserver helper
function createObserver(callback, options) {
    return new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => callback(entry, observer));
    }, options);
}
window.createObserver = createObserver;

function initializeAnimations() {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 100 });
    }
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = createObserver((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    }, observerOptions);
    const animateElements = document.querySelectorAll('[data-animate]');
    animateElements.forEach(el => observer.observe(el));
}