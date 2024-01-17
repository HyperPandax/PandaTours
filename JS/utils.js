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

  animateOverlayTransition(toTop, toLeft) {
    const overlay = this.guidedTour.overlay;
    const currentTop = overlay.offsetTop;
    const currentLeft = overlay.offsetLeft;
    overlay.style.top = `${toTop}px`;
    overlay.style.left = `${toLeft}px`;
    //Animation.transitionOverlay(overlay, currentTop, currentLeft, toTop, toLeft);
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
    //verwijder bestaande overlay
    if(document.body.querySelector(".darkBodyOverlay")){
      document.body.querySelector(".darkBodyOverlay").remove();
    }

    //Maak een nieuwe darkBodyOverlay aan en voeg deze toe
    const darkBodyOverlay = document.createElement("div");
    darkBodyOverlay.classList.add("darkBodyOverlay");
    document.body.appendChild(darkBodyOverlay);

    const highlighted = document.body.querySelector(".highlight");   
    //Check if element position is static and if it is set to relative
    if(window.getComputedStyle( highlighted ,null).getPropertyValue('position')==="static"){
      console.log("ahhhh static");
      highlighted.style.position="relative";
    }

    //Get BG color of the highlighted element
    const bgColor = window.getComputedStyle( highlighted ,null).getPropertyValue('background-color');
    console.log("bgColor: " + bgColor);
    
    if(bgColor=== "rgba(0, 0, 0, 0)"){
      console.log("TRANSPARENT");
      //get parent bgcolor and set it to that.
      const parentElement = highlighted.parentNode;
      const parentBgColor = window.getComputedStyle( parentElement ,null).getPropertyValue('background-color');

      console.log(parentBgColor);

      if (parentBgColor != "rgba(0, 0, 0, 0)"){
        highlighted.style.backgroundColor = parentBgColor;
        console.log("parents Color");
      }else{
        //if parent doesnt have a bg check color of text.  
        const txtColor = window.getComputedStyle( highlighted ,null).getPropertyValue('color');      
        //if textcolor is white set bg to black
        if(txtColor==="rgb(255, 255, 255)"){
          highlighted.style.backgroundColor = 'black';
          console.log("set bg to black");
        }else{
          //else set bg to white
          highlighted.style.backgroundColor = 'white';
          console.log("set bg to white");
        }
      }
    } 
  }

}
