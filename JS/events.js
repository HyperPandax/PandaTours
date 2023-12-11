export function attachEventListeners(guidedTour) {
    const overlay = guidedTour.overlay;
    const prevButton = overlay.querySelector('.prev-button');
    const skipButton = overlay.querySelector('.skip-button');
    const nextButton = overlay.querySelector('.next-button');

    prevButton.addEventListener('click', () => {
        guidedTour.prevStep();
    });

    skipButton.addEventListener('click', () => {
        guidedTour.endTour();
    });

    nextButton.addEventListener('click', () => {
        guidedTour.nextStep();
    });
}