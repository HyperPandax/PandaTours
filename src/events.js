export class EventListeners {
    constructor(guidedTour) {
      this.guidedTour = guidedTour;
    }
  
    attachEventListeners() {
      const overlay = this.guidedTour.overlay;
      const prevButton = overlay.querySelector('.prev-button');
      const skipButton = overlay.querySelector('.skip-button');
      const nextButton = overlay.querySelector('.next-button');
  
      prevButton.addEventListener('click', () => {
        this.guidedTour.prevStep();
      });
  
      skipButton.addEventListener('click', () => {
        this.guidedTour.endTour();
      });
  
      nextButton.addEventListener('click', () => {
        this.guidedTour.nextStep();
      });
    }
  }