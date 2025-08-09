// ========================================================================== //
// Hero section //
// ========================================================================== //

function initializeHeroAnimations() {
    if (typeof gsap === 'undefined') return;
    const tl = gsap.timeline();
    tl.fromTo('.hero-greeting', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .fromTo('.hero-name', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
        .fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
        .fromTo('.hero-description', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
        .fromTo('.hero-actions', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
        .fromTo('.hero-social', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4");
    gsap.fromTo('.hero-image', { opacity: 0, x: 100 }, {
        opacity: 1, x: 0, duration: 1, ease: "power2.out", delay: 0.5, onComplete: () => {
            const heroImage = document.querySelector('.hero-image');
            const imageContainer = document.querySelector('.image-container');
            const profileImage = document.querySelector('.profile-image');
            if (heroImage) { heroImage.style.opacity = '1'; heroImage.style.visibility = 'visible'; }
            if (imageContainer) { imageContainer.style.opacity = '1'; }
            if (profileImage) { profileImage.style.opacity = '1'; }
            initializeHeroFloating();
        }
    });
    gsap.fromTo('.floating-element', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)", stagger: 0.2, delay: 1.2 });
}

function initializeHeroFloating() {
    if (typeof gsap === 'undefined') return;
    gsap.to('.image-container', { y: -15, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.to('.profile-image', { rotation: 2, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 });
}

// Dynamic typing effect for hero title
const titles = [
    'Full-Stack .NET Developer',
    'ASP.NET Core Specialist',
    'Clean Code Enthusiast',
    'Problem Solver'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const titleElement = document.getElementById('dynamic-title');

function typeTitle() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        titleElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        titleElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeTitle, speed);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeTitle, 1000);
});