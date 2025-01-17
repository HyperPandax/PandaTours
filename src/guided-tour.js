import { Overlay } from "./overlay.js";
import { EventListeners } from "./events.js";
import { ScrollTo } from "./scroll-to.js";
import { Utils } from "./utils.js";

export class GuidedTour {
  constructor() {
    this.tourSteps = document.querySelectorAll("*[data-intro]");
    this.currentStepIndex = 0;
    this.utils = new Utils(this);

    // Create overlay
    this.overlay = new Overlay().overlayElement;
    this.overlayContent = this.overlay.querySelector(".overlay-content");

    document.body.appendChild(this.overlay);
    const eventListeners = new EventListeners(this);
    eventListeners.attachEventListeners();

    this.scrollTo = new ScrollTo();
  }

  nextStep() {
    this.currentStepIndex++;
    if (this.currentStepIndex >= this.tourSteps.length) {
      this.endTour();
      return;
    }
    this.utils.updateOverlayContent();
  }

  prevStep() {
    this.currentStepIndex--;
    if (this.currentStepIndex < 0) {
      this.currentStepIndex = this.tourSteps.length - 1;
    }
    this.utils.updateOverlayContent();
  }

  endTour() {
    // Remove 'highlight' class from all tour steps
    console.log("End Tour");
    this.tourSteps.forEach((step) => step.classList.remove("highlight"));
    this.overlay.style.display = "none";
    this.utils.requestUserFeedback();

    document.body.querySelector(".darkBodyOverlay").remove();
  }

  start() {
    document.body.querySelector(".feedbackContainer")?.remove();
    document.body.querySelector(".darkBodyOverlay")?.remove();

    console.log("Start Tour");
    this.overlay.style.display = "flex";
    this.utils.updateOverlayContent();
  }

  restartTour() {
    // Implementation for restarting the tour
  }
}
