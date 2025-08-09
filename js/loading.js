// ========================================================================== //
// Loading Screen //
// ========================================================================== //

let isLoading = true;

function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.classList.remove('loading');
            setTimeout(() => {
                if (loadingScreen && loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 500);
            isLoading = false;
            initializeAnimations();
            initializeCounters();
            initializeSkillBars();
        }, 800);
    }
}

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