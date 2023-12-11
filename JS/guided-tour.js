
import { Overlay } from "./overlay.js";
import { attachEventListeners } from "./events.js";

export class GuidedTour {
    constructor() {
        this.tourSteps = document.querySelectorAll('*[data-intro]');
        this.currentStepIndex = 0;

        // Create overlay 
        this.overlay = new Overlay().overlay;
        this.overlayContent = this.overlay.querySelector('.overlay-content');

        document.body.appendChild(this.overlay);
        attachEventListeners(this);
    }

    updateOverlayContent() {
        // Remove highlight from previous step
        this.tourSteps.forEach(step => step.classList.remove('highlight'));
    
        // Highlight the current step
        this.tourSteps[this.currentStepIndex].classList.add('highlight');
    
        // Use the current step element for positioning
        const stepRect = this.tourSteps[this.currentStepIndex].getBoundingClientRect();
    
        const distance = 10;
        this.overlay.style.top = `${stepRect.bottom + distance}px`;
        this.overlay.style.left = `${stepRect.left + distance}px`;
    
        // Update content
        this.overlayContent.querySelector('.step-title').innerText = this.tourSteps[this.currentStepIndex].getAttribute('data-title') || '';
        this.overlayContent.querySelector('.step-text').innerText = this.tourSteps[this.currentStepIndex].getAttribute('data-intro') || 'Default Content';


        // Disable Previous button if it's the first step
        if (this.currentStepIndex === 0) {
            this.overlay.querySelector('.prev-button').classList.add('disabled');
        } else {
            this.overlay.querySelector('.prev-button').classList.remove('disabled');
        }
    
        // Logic for progress bar
    
        this.overlay.innerHTML = '';
        this.overlay.appendChild(this.overlayContent);
    }

    nextStep() {
        this.currentStepIndex++;
        if (this.currentStepIndex >= this.tourSteps.length) {
            this.endTour();
            return;
        }
        this.updateOverlayContent();
    }
    
    prevStep() {
        this.currentStepIndex--;
        if (this.currentStepIndex < 0) {
            this.currentStepIndex = this.tourSteps.length - 1;
        }
        this.updateOverlayContent();
    }

    endTour() {
        // Remove 'highlight' class from all tour steps
        this.tourSteps.forEach(step => step.classList.remove('highlight'));
        
        this.overlay.style.display = 'none';
    }

    start() {
        this.overlay.style.display = 'flex';
        this.updateOverlayContent();
    }
}
