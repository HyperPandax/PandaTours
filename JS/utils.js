import { OverlayPosition } from "./utils/overlay-position.js";
import {Feedback} from "./utils/feedback.js";
import {Animation} from "./utils/animation.js";
import {MultiLanguageSupport} from "./utils/multi-language-support.js";
import {OverlaySettings} from "./utils/overlay-settings.js";
import {AccessibilityOptions} from "./utils/accessibility-options.js";

export class Utils {
  constructor(guidedTour) {
    this.guidedTour = guidedTour;
    this.feedback = new Feedback();
  }

  updateOverlayContent() {
    // Remove highlight from previous step
    this.guidedTour.tourSteps.forEach((step) => step.classList.remove("highlight"));

    // Highlight the current step
    this.guidedTour.tourSteps[this.guidedTour.currentStepIndex].classList.add("highlight");

    // Use the current step element for positioning
    const position = this.guidedTour.tourSteps[this.guidedTour.currentStepIndex].getAttribute("data-position");
    OverlayPosition.setPosition(
      this.guidedTour.overlay,
      this.guidedTour.tourSteps[this.guidedTour.currentStepIndex],
      position
    );

    // Scroll to
    const stepElement = this.guidedTour.tourSteps[this.guidedTour.currentStepIndex];
    if (stepElement) {
      if (!OverlayPosition.isElementInViewport(stepElement.getBoundingClientRect())) {
        this.guidedTour.scrollTo.scrollToElement(stepElement);
      }
    }
    
    // Update content
    this.updateOverlayContentText();

    // Disable Previous button if it's the first step
    this.togglePrevButtonDisabled();

    // Change next button to finish it its the last step
    this.changeToFinishButton()
   
    // Update progress bar
    this.updateProgressBar();

    // Reappend the overlay content
    this.reappendOverlayContent();
  }

  updateOverlayContentText() {
    this.guidedTour.overlayContent.querySelector(".step-title").innerText =
      this.guidedTour.tourSteps[this.guidedTour.currentStepIndex].getAttribute("data-title") || "";
    this.guidedTour.overlayContent.querySelector(".step-text").innerText =
      this.guidedTour.tourSteps[this.guidedTour.currentStepIndex].getAttribute("data-intro") ||
      "Default Content";
  }

  togglePrevButtonDisabled() {
    if (this.guidedTour.currentStepIndex === 0) {
      this.guidedTour.overlay.querySelector(".prev-button").classList.add("disabled");
    } else {
      this.guidedTour.overlay.querySelector(".prev-button").classList.remove("disabled");
    }
  }

  changeToFinishButton(){
    if (this.guidedTour.currentStepIndex === (this.guidedTour.tourSteps.length-1)){
      this.guidedTour.overlay.querySelector(".next-button").innerHTML="Finish";
    } 
  }

  updateProgressBar() {
    this.guidedTour.overlay.querySelector(".progress-bar").value =
      (100 / this.guidedTour.tourSteps.length) * this.guidedTour.currentStepIndex +
      100 / this.guidedTour.tourSteps.length;
  }

  reappendOverlayContent() {
    this.guidedTour.overlay.innerHTML = "";
    this.guidedTour.overlay.appendChild(this.guidedTour.overlayContent);
  }

  requestUserFeedback(){
    this.feedback.askForFeedback();
  }
}
