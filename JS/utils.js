import { OverlayPosition } from "./utils/overlay-position.js";
import {Feedback} from "./utils/feedback.js";
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
    //Animation.fadeHighlightIn(this.guidedTour.tourSteps[this.guidedTour.currentStepIndex]);
    
    this.toggleDarkBodyOverlay();

    this.changeOverlayPosition();

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

  changeOverlayPosition() {
    const currentStepElement = this.guidedTour.tourSteps[this.guidedTour.currentStepIndex];
    const position = currentStepElement.getAttribute("data-position");
    OverlayPosition.setPosition(this.guidedTour.overlay, currentStepElement, position);

    const stepElement = this.guidedTour.tourSteps[this.guidedTour.currentStepIndex];
    
    if (stepElement) {
      if (!OverlayPosition.isElementInViewport(stepElement.getBoundingClientRect())) {
        this.guidedTour.scrollTo.scrollToElement(stepElement);
      }
    }
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

  toggleDarkBodyOverlay(){
    //remove existing overlay
    if(document.body.querySelector(".darkBodyOverlay")){
      document.body.querySelector(".darkBodyOverlay").remove();
    }

    //Make new dark body overlay and display it
    const darkBodyOverlay = document.createElement("div");
    darkBodyOverlay.classList.add("darkBodyOverlay");
    document.body.appendChild(darkBodyOverlay);

    const highlighted = document.body.querySelector(".highlight");   
    //Check if element position is static and if it is set to relative
    if(window.getComputedStyle( highlighted ,null).getPropertyValue('position')==="static"){
      highlighted.style.position="relative";
    }

    //Get BG color of the highlighted element
    const bgColor = window.getComputedStyle( highlighted ,null).getPropertyValue('background-color');
    
    if(bgColor=== "rgba(0, 0, 0, 0)"){
      //get parent background color and set it to that.
      const parentElement = highlighted.parentNode;
      const parentBgColor = window.getComputedStyle( parentElement ,null).getPropertyValue('background-color');

      if (parentBgColor != "rgba(0, 0, 0, 0)"){
        highlighted.style.backgroundColor = parentBgColor;
      }else{
        //if parent doesn't have a bg check color of text.  
        const txtColor = window.getComputedStyle( highlighted ,null).getPropertyValue('color');      
        //if text color is white set bg to black
        if(txtColor==="rgb(255, 255, 255)"){
          highlighted.style.backgroundColor = 'black';
        }else{
          //else set bg to white
          highlighted.style.backgroundColor = 'white';
        }
      }
    } 
  }

}
