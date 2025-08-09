// ========================================================================== //
// Skill Bar Animations //
// ========================================================================== //

function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.progress-fill');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        let fill = true;
        function animateBar() {
            if (fill) {
                bar.style.transition = 'width 1.8s cubic-bezier(0.4,0,0.2,1)';
                bar.style.width = '100%';
            } else {
                bar.style.transition = 'width 1.8s cubic-bezier(0.4,0,0.2,1)';
                bar.style.width = '0%';
            }
            fill = !fill;
            setTimeout(animateBar, 2200);
        }
        setTimeout(animateBar, 400 + Math.random()*400); // slight random delay for nice effect
    });
}
