

export class Overlay {
    constructor() {
        this.overlay = this.createOverlay();
        this.overlayContent = this.createOverlayContent();
        this.overlay.appendChild(this.overlayContent);

    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        return overlay;
    }

    createOverlayContent() {
        // general overlay content element
        const overlayContent = document.createElement('div');
        overlayContent.classList.add('overlay-content');

        // title elements
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('overlay-section');
        const titleElement = document.createElement('h2');
        titleElement.classList.add('step-title');
        titleDiv.appendChild(titleElement);

        // text elements
        const textDiv = document.createElement('div');
        textDiv.classList.add('overlay-section');
        const textElement = document.createElement('p');
        textElement.classList.add('step-text');
        textDiv.appendChild(textElement);

        // progress bar elements
        const progressBarDiv = document.createElement('div');
        progressBarDiv.classList.add('overlay-section');

        // button elements
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('overlay-section', 'buttons-grid');

        const prevButton = document.createElement('button');
        prevButton.innerText = 'Previous';
        prevButton.classList.add('prev-button');

        const skipButton = document.createElement('button');
        skipButton.innerText = 'Skip Tour';
        skipButton.classList.add('skip-button');

        const nextButton = document.createElement('button');
        nextButton.innerText = 'Next';
        nextButton.classList.add('next-button');

        buttonsDiv.appendChild(prevButton);
        buttonsDiv.appendChild(skipButton);
        buttonsDiv.appendChild(nextButton);

        overlayContent.appendChild(titleDiv);
        overlayContent.appendChild(textDiv);
        overlayContent.appendChild(progressBarDiv);
        overlayContent.appendChild(buttonsDiv);

        return overlayContent;
    }
}