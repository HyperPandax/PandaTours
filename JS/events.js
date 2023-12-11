export function attachEventListeners(guidedTour) {
    const overlay = guidedTour.overlay;
    const prevButton = overlay.querySelector('.prev-button');
    const skipButton = overlay.querySelector('.skip-button');
    const nextButton = overlay.querySelector('.next-button');

    // Disable Previous button if it's the first step
    if (guidedTour.currentStepIndex === 0) {
        overlay.querySelector('.prev-button').classList.add('disabled');
    } else {
        overlay.querySelector('.prev-button').classList.remove('disabled');
        prevButton.addEventListener('click', () => {
            guidedTour.prevStep();
        });
    }
    
    skipButton.addEventListener('click', () => {
        guidedTour.endTour();
    });

    nextButton.addEventListener('click', () => {
        guidedTour.nextStep();
    });
}