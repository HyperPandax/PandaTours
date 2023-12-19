export class Settings {
    constructor() {
      this.textColor = "default";
      this.textSize = "medium";
      this.font = "default";
      this.buttonColors = {
        prevButton: "default",
        nextButton: "default",
        skipButton: "default",
      };
    }
  
    customizeOverlay(options) {
      // Implement logic to customize overlay settings based on the provided options
    }
  }