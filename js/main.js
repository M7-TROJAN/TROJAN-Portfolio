// ==========================================================================
// TROJAN Portfolio - Main JavaScript (FIXED VERSION)
// ==========================================================================

// Global Variables
let isLoading = true;
let currentTheme = localStorage.getItem('theme') || 'light';

// ==========================================================================
// Loading Screen - FIXED
// ==========================================================================

function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        // Simulate loading time and then hide
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.classList.remove('loading');
            
            // Remove from DOM after transition
            setTimeout(() => {
                if (loadingScreen && loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 500);
            
            isLoading = false;
            
            // Initialize other components after loading
            initializeAnimations();
            initializeCounters();
            initializeSkillBars();
        }, 800);
    }
}

// Emergency loading screen removal function
function removeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;
    
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 500);
    }
    
    if (body && body.classList.contains('loading')) {
        body.classList.remove('loading');
    }
    
    isLoading = false;
}

// ==========================================================================
// Theme Management
// ==========================================================================

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    currentTheme = savedTheme;
    
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    currentTheme = newTheme;
    
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

// ==========================================================================
// Navigation
// ==========================================================================

function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

// ==========================================================================
// Hero Animations
// ==========================================================================

function initializeHeroAnimations() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline();

    // Hero text animations
    tl.fromTo('.hero-greeting', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo('.hero-name',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4"
    )
    .fromTo('.hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4"
    )
    .fromTo('.hero-description',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4"
    )
    .fromTo('.hero-actions',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4"
    )
    .fromTo('.hero-social',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4"
    );

    // Hero image animation with floating effect
    gsap.fromTo('.hero-image',
        { opacity: 0, x: 100 },
        { 
            opacity: 1, 
            x: 0, 
            duration: 1, 
            ease: "power2.out",
            delay: 0.5,
            onComplete: () => {
                // Ensure image stays visible and start floating animation
                const heroImage = document.querySelector('.hero-image');
                const imageContainer = document.querySelector('.image-container');
                const profileImage = document.querySelector('.profile-image');
                
                if (heroImage) {
                    heroImage.style.opacity = '1';
                    heroImage.style.visibility = 'visible';
                }
                if (imageContainer) {
                    imageContainer.style.opacity = '1';
                }
                if (profileImage) {
                    profileImage.style.opacity = '1';
                }
                
                // Start continuous floating animation
                initializeHeroFloating();
            }
        }
    );

    // Floating elements animation
    gsap.fromTo('.floating-element',
        { opacity: 0, scale: 0 },
        { 
            opacity: 1, 
            scale: 1, 
            duration: 0.6, 
            ease: "back.out(1.7)",
            stagger: 0.2,
            delay: 1.2
        }
    );
}

function initializeHeroFloating() {
    if (typeof gsap === 'undefined') return;

    // Continuous floating animation for hero image
    gsap.to('.image-container', {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
    });

    // Continuous subtle rotation for profile image
    gsap.to('.profile-image', {
        rotation: 2,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
    });
}

// ==========================================================================
// Scroll Animations
// ==========================================================================

function initializeAnimations() {
    // AOS initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }

    // Custom scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('[data-animate]');
    animateElements.forEach(el => observer.observe(el));
}

// ==========================================================================
// Counter Animations
// ==========================================================================

function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.create({
                trigger: counter,
                start: "top 80%",
                onEnter: () => {
                    gsap.to(counter, {
                        innerHTML: target,
                        duration: 2,
                        ease: "power2.out",
                        snap: { innerHTML: 1 },
                        onUpdate: function() {
                            counter.innerHTML = Math.ceil(counter.innerHTML);
                        }
                    });
                }
            });
        } else {
            // Fallback animation without GSAP
            animateCounter(counter, target);
        }
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.ceil(current);
    }, 20);
}

// ==========================================================================
// Skill Bar Animations
// ==========================================================================

function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.progress-fill');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = width + '%';
                }, 200);
                
                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

// ==========================================================================
// Scroll to Top Button
// ==========================================================================

function initializeScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==========================================================================
// Contact Form
// ==========================================================================

function initializeContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Add input validation
        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
            input.addEventListener('input', clearValidation);
        });
    }
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    let isValid = true;
    
    if (input.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }
    
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
    }
}

function clearValidation(e) {
    const input = e.target;
    input.classList.remove('valid', 'invalid');
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('.btn[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Message sent successfully!', 'success');
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Clear validation classes
        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ==========================================================================
// Smooth Scrolling for Navigation Links
// ==========================================================================

function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================================================
// Performance Optimizations
// ==========================================================================

function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Preload critical resources
    const criticalImages = [
        'assets/images/profile-hero.jpg',
        'assets/images/about-image.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ==========================================================================
// Error Handling
// ==========================================================================

function handleErrors() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
        // Don't let errors break the user experience
        // If there's an error, try to remove loading screen
        removeLoadingScreen();
        return true;
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
        e.preventDefault();
    });
}

// ==========================================================================
// Footer Animations
// ==========================================================================

function initializeFooterAnimations() {
    // Footer stats are now handled by initializeCounters() function
    // since they have the same structure as about stats
    
    // Additional footer animations
    const footerElements = document.querySelectorAll('.footer-content > *');
    footerElements.forEach((el, index) => {
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(el, 
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }
    });
}

// ==========================================================================
// FIXED INITIALIZATION - Multiple fallback methods
// ==========================================================================

function initializePortfolio() {
    try {
        console.log('Initializing portfolio...');
        
        // Initialize core functionality
        handleErrors();
        initializeTheme();
        initializeNavigation();
        initializeScrollToTop();
        initializeSmoothScrolling();
        initializeContactForm();
        optimizePerformance();
        
        // Initialize loading screen removal
        initializeLoading();
        
        // Emergency removal as backup
        setTimeout(removeLoadingScreen, 3000);
        
        console.log('Portfolio initialized successfully');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
        // If there's any error, force remove loading screen
        removeLoadingScreen();
    }
}

// Multiple initialization methods to ensure it works
document.addEventListener('DOMContentLoaded', initializePortfolio);
window.addEventListener('load', initializePortfolio);

// Emergency timeout initialization
setTimeout(() => {
    if (isLoading) {
        console.log('Emergency initialization triggered');
        initializePortfolio();
    }
}, 1000);

// Initialize GSAP ScrollTrigger when available
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Initialize hero animations after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        initializeHeroAnimations();
    }, 500);
});

// Export functions for global access if needed
window.portfolioApp = {
    initializeTheme,
    toggleTheme,
    initializeNavigation,
    initializeAnimations,
    initializeCounters,
    initializeSkillBars,
    showNotification,
    initializeHeroFloating,
    removeLoadingScreen
};

console.log('Main.js loaded successfully');
