import { html, render } from "lit-html";

export class Overlay {
  constructor() {
    this.overlayElement = this.createOverlay();
    this.overlayContent = this.createOverlayContent();
    render(this.overlayContent(), this.overlayElement);
  }

  createOverlay() {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    return overlay;
  }

  createOverlayContent() {
    const overlayContent = () => html`<div class="overlay-content">
      <div class="overlay-section">
        <h2 class="step-title"></h2>
      </div>
      <div class="overlay-section">
        <p class="step-text"></p>
      </div>
      <div class="overlay-section progress-div">
        <progress class="progress-bar" value="0" max="100"></progress>
      </div>
      <div class="overlay-section buttons-grid">
        <button class="prev-button">Previous</button>
        <button class="skip-button">Skip Tour</button>
        <button class="next-button">Next</button>
      </div>
    </div>`;

    return overlayContent;
  }
}
