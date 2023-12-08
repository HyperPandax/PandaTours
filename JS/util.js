/*TODO:
- progress bar
- devide all code in small seperate files
- able to configure settings like:
    - overlay position
    - customize overlay:
        - text color
        - text size
        - font (automaticly get font fron website)
        - button colors
- animations
- ask feedback on tour
- needs to support to use 4 languages
    - able to configure steps in json?
        - being able to not choose an element to highlight
- stay on same step on refresh
- change next button to like exit or finish at the last step.
- accacibility toetsenboord opties enz


OPTIONAL:
- ask for confirmation when exiting tour
- find and highlight if they are in scrollable element
- being able to pauze and continue the tour?
- restart tour
- themes
*/

export class GuidedTour {
    constructor() {
        this.tourSteps = document.querySelectorAll('.tour-step');
        this.currentStepIndex = 0;

        // Create overlay and buttons
        this.overlay = document.createElement('div');
        this.overlay.classList.add('overlay');
        document.body.appendChild(this.overlay);


        this.overlayContent = document.createElement('div');
        this.overlayContent.classList.add('overlay-content');

        // Content elements
        this.titleDiv = document.createElement('div');
        this.titleDiv.classList.add('overlay-section');
        this.titleElement = document.createElement('h2');
        this.titleElement.classList.add('step-title');
        this.titleDiv.appendChild(this.titleElement);

        this.textDiv = document.createElement('div');
        this.textDiv.classList.add('overlay-section');
        this.textElement = document.createElement('p');
        this.textElement.classList.add('step-text');
        this.textDiv.appendChild(this.textElement);

        this.progressBarDiv = document.createElement('div');
        this.progressBarDiv.classList.add('overlay-section');

        this.buttonsDiv = document.createElement('div');
        this.buttonsDiv.classList.add('overlay-section', 'buttons-grid');
        
        this.prevButton = document.createElement('button');
        this.prevButton.innerText = 'Previous';
        this.prevButton.classList.add('prev-button');
        this.prevButton.addEventListener('click', () => {
            if (!this.prevButton.classList.contains('disabled')) {
                this.prevStep();
            }
        });

        this.skipButton = document.createElement('button');
        this.skipButton.innerText = 'Skip Tour';
        this.skipButton.classList.add('skip-button');
        this.skipButton.addEventListener('click', this.endTour.bind(this));

        this.nextButton = document.createElement('button');
        this.nextButton.innerText = 'Next';
        this.nextButton.classList.add('next-button');
        this.nextButton.addEventListener('click', this.nextStep.bind(this));

        this.buttonsDiv.appendChild(this.prevButton);
        this.buttonsDiv.appendChild(this.skipButton);
        this.buttonsDiv.appendChild(this.nextButton);

        this.overlayContent.appendChild(this.titleDiv);
        this.overlayContent.appendChild(this.textDiv);
        this.overlayContent.appendChild(this.progressBarDiv);
        this.overlayContent.appendChild(this.buttonsDiv);

        this.overlay.appendChild(this.overlayContent);
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
        this.titleElement.innerText = this.tourSteps[this.currentStepIndex].getAttribute('data-title') || '';
        this.textElement.innerText = this.tourSteps[this.currentStepIndex].getAttribute('data-intro') || 'Default Content';

        // Disable Previous button if it's the first step
        if (this.currentStepIndex === 0) {
            this.prevButton.classList.add('disabled');
        } else {
            this.prevButton.classList.remove('disabled');
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
