export { GuidedTour } from "./guided-tour.js";
import { GuidedTour } from "./guided-tour.js";

if (import.meta.env.MODE === "development") {
  document.body.querySelector(".overlay")?.remove();
  const guidedTour = new GuidedTour();
  guidedTour.start();
}
