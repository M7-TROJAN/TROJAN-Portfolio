// ========================================================================== //
// Error Handling //
// ========================================================================== //

function handleErrors() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
        removeLoadingScreen();
        return true;
    });
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
        e.preventDefault();
    });
}
