// ========================================================================== //
// Portfolio Initialization //
// ========================================================================== //

function initializePortfolio() {
    try {
        // console.log('Initializing portfolio...');
        handleErrors();
        initializeTheme();
        initializeNavigation();
        initializeScrollToTop();
        initializeSmoothScrolling();
        initializeContactForm();
        optimizePerformance();
        initializeLoading();
        setTimeout(removeLoadingScreen, 3000);
        // console.log('Portfolio initialized successfully');
    } catch (error) {
        // console.error('Error initializing portfolio:', error);
        removeLoadingScreen();
    }
}

document.addEventListener('DOMContentLoaded', initializePortfolio);

setTimeout(() => {
    if (isLoading) {
        console.log('Emergency initialization triggered');
        initializePortfolio();
    }
}, 1000);

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

window.addEventListener('load', () => {
    setTimeout(() => {
        initializeHeroAnimations();
    }, 500);
});

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


// console.log('Main.js loaded successfully');
