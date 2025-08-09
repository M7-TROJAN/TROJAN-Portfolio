// ========================================================================== //
// Footer Animations //
// ========================================================================== //

function initializeFooterAnimations() {
    const footerElements = document.querySelectorAll('.footer-content > *');
    footerElements.forEach((el, index) => {
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(el, { opacity: 0, y: 20 }, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            });
        }
    });
}
