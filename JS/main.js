import { GuidedTour } from "./guided-tour.js";

const guidedTour = new GuidedTour();
guidedTour.start();

/*TODO:
- progress bar
- devide all code in small seperate files
- able to configure settings like:
    - overlay position
    - customize overlay:
        - text color
        - text size
        - font (automaticly get font fron website)
        - button colors
- animations
- ask feedback on tour
- needs to support to use 4 languages
    - able to configure steps in json?
        - being able to not choose an element to highlight
- stay on same step on refresh
- change next button to like exit or finish at the last step.
- accacibility toetsenboord opties enz


OPTIONAL:
- ask for confirmation when exiting tour
- find and highlight if they are in scrollable element
- being able to pauze and continue the tour?
- restart tour
- themes
*/