import { html, render } from "lit-html";

export class Feedback {
  constructor() {
    this.feedbackContainerElement = this.createFeedbackContainer();
    this.stars = 0; // Initialize stars to 0
    this.renderFeedbackForm();
  }

  createFeedbackContainer() {
    const container = document.createElement("div");
    container.classList.add("feedbackContainer");
    return container;
  }

  renderFeedbackForm() {
    const feedbackForm = this.createFeedbackForm();
    render(feedbackForm, this.feedbackContainerElement);
    this.attachStarClickListeners();
  }

  createFeedbackForm() {
    return html`
      <form class="feedbackForm">
        <label for="stars">How many stars would you give this tour?</label>
        <div id="stars" class="star-container">
          ${this.renderStars()}
        </div>

        <label for="subject">Subject</label>
        <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>

        <input type="button" value="Submit" @click="${() => this.handleFeedbackSubmission()}">
      </form>
    `;
  }

  renderStars() {
    const starElements = [];
    for (let i = 1; i <= 5; i++) {
      const starType = i <= this.stars ? "full" : i - 0.5 === this.stars ? "half" : "empty";
      starElements.push(html`<span class="star" data-star="${i}">${this.getStarSVG(starType)}</span>`);
    }
    return starElements;
  }

  getStarSVG(type) {
    const svgNS = "http://www.w3.org/2000/svg";
    const existingPath = document.createElementNS(svgNS, "path");
    existingPath.setAttribute("d", this.getStarPath(type));

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("viewBox", "0 0 576 512"); // Update viewBox
    svg.appendChild(existingPath);

    return svg;
  }
  
  getStarPath(type){
    switch (type) {
      case "full":
        return "M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z";
      case "half":
        return "M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z";
      case "empty":
      default:
        return "M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z";
    }
  }

  attachStarClickListeners() {
    const starContainer = this.feedbackContainerElement.querySelector(".star-container");
    starContainer.addEventListener("click", (event) => this.handleStarClick(event));
  }

  handleStarClick(event) {
    const starElement = event.target.closest(".star");
    if (starElement) {
      const value = starElement.dataset.star;
      this.stars = parseInt(value);
  
      // Update the SVG path directly
      const svg = starElement.querySelector("svg");
      const path = svg.querySelector("path");
      path.setAttribute("d", this.getStarPath("full"));
  
      // Mark the previous stars as full and the rest as empty
      const allStarElements = this.feedbackContainerElement.querySelectorAll(".star");
      allStarElements.forEach((star) => {
        const starValue = parseInt(star.dataset.star);
        const starPath = star.querySelector("svg path");
        if (starValue <= this.stars) {
          starPath.setAttribute("d", this.getStarPath("full"));
        } else {
          starPath.setAttribute("d", this.getStarPath("empty"));
        }
      });
  
      console.log("clicked star: ", this.stars);
    }
  }
  handleFeedbackSubmission() {
    // Implement logic to handle feedback submission
    const subject = document.getElementById("subject").value;

    // You can send the feedback data to your server or handle it as needed
    console.log("Stars: ", this.stars);
    console.log("Subject: ", subject);

    // Close the feedback form or take further action
    this.closeFeedbackForm();
  }
  askForFeedback() {
    document.body.appendChild(this.feedbackContainerElement);
  }
  closeFeedbackForm() {
    document.body.removeChild(this.feedbackContainerElement);
  }
}