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
    return html`
    <svg width="120" height="120" viewBox="0 0 762 734" >
      <!-- Rect SVG -->
	    <rect class="rect" width="328" height="639" fill="white" x="50" y="50"/>  <!--width should be 328(half) or 639(whole) -->
	    <!-- Mask SVG -->
	    <g>
		    <path fill-rule="evenodd" clip-rule="evenodd" d="M757 1H5V725H757V1ZM377.5 47L277 258L48 293.5L210.5 451.5L172.5 685.5L377.5 580L585.5 685.5L547 451.5L713 293.5L479.5 258L377.5 47Z" fill="white"/>
	      <path fill="none" d="M5 1V0.5H4.5V1H5ZM757 1H757.5V0.5H757V1ZM5 725H4.5V725.5H5V725ZM757 725V725.5H757.5V725H757ZM277 258L277.077 258.494L277.338 258.454L277.451 258.215L277 258ZM377.5 47L377.95 46.7824L377.497 45.8443L377.049 46.785L377.5 47ZM48 293.5L47.9234 293.006L46.9326 293.16L47.6514 293.858L48 293.5ZM210.5 451.5L210.994 451.58L211.035 451.323L210.849 451.142L210.5 451.5ZM172.5 685.5L172.006 685.42L171.848 686.398L172.729 685.945L172.5 685.5ZM377.5 580L377.726 579.554L377.498 579.439L377.271 579.555L377.5 580ZM585.5 685.5L585.274 685.946L586.153 686.392L585.993 685.419L585.5 685.5ZM547 451.5L546.655 451.138L546.464 451.32L546.507 451.581L547 451.5ZM713 293.5L713.345 293.862L714.084 293.159L713.075 293.006L713 293.5ZM479.5 258L479.05 258.218L479.164 258.455L479.425 258.494L479.5 258ZM5 1.5H757V0.5H5V1.5ZM5.5 725V1H4.5V725H5.5ZM757 724.5H5V725.5H757V724.5ZM756.5 1V725H757.5V1H756.5ZM277.451 258.215L377.951 47.215L377.049 46.785L276.549 257.785L277.451 258.215ZM48.0766 293.994L277.077 258.494L276.923 257.506L47.9234 293.006L48.0766 293.994ZM210.849 451.142L48.3486 293.142L47.6514 293.858L210.151 451.858L210.849 451.142ZM172.994 685.58L210.994 451.58L210.006 451.42L172.006 685.42L172.994 685.58ZM377.271 579.555L172.271 685.055L172.729 685.945L377.729 580.445L377.271 579.555ZM585.726 685.054L377.726 579.554L377.274 580.446L585.274 685.946L585.726 685.054ZM546.507 451.581L585.007 685.581L585.993 685.419L547.493 451.419L546.507 451.581ZM712.655 293.138L546.655 451.138L547.345 451.862L713.345 293.862L712.655 293.138ZM479.425 258.494L712.925 293.994L713.075 293.006L479.575 257.506L479.425 258.494ZM377.05 47.2176L479.05 258.218L479.95 257.782L377.95 46.7824L377.05 47.2176Z" fill="#FF0909"/>
	    </g>
	    <!-- Star SVG -->
	    <g>
	      <path class="starpath" d="M277 259L377.5 48L479.5 259L713 294.5L547 452.5L585.5 686.5L377.5 581L172.5 686.5L210.5 452.5L48 294.5L277 259Z" stroke="black" stroke-width="41" fill="none" shape-rendering="crispEdges"/>
	    </g>
    </svg>
    `;
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

      // Reset alle sterren naar de oorspronkelijke staat
      const allStarElements = this.feedbackContainerElement.querySelectorAll(".star");
      allStarElements.forEach((star) => {
          const svg = star.querySelector("svg");
          const starPath = svg.querySelector(".starpath");
          const rect = svg.querySelector("rect");
          starPath.setAttribute("stroke", "black");
          rect.setAttribute("width", "328");
          rect.setAttribute("fill", "white");
      });

      // Update de geklikte ster en de voorgaande sterren
      for (let i = 1; i <= this.stars; i++) {
          const currentStar = allStarElements[i - 1];
          const svg = currentStar.querySelector("svg");
          const starPath = svg.querySelector(".starpath");
          const rect = svg.querySelector("rect");
          starPath.setAttribute("stroke", "gold");
          rect.setAttribute("width", "639");
          rect.setAttribute("fill", "gold");
      }
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
    
    //give user message thank you for the feedback
  }
}