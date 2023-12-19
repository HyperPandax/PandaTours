export class ScrollTo {
    constructor() {
      // You can add any initialization logic here
      this.scrollOffset = 0;
    }
  
    scrollToElement(element) {
      if (element instanceof Element) {
        element.scrollIntoView({
          behavior: 'smooth', // You can change this to 'auto' for instant scrolling
          block: 'center', // You can change this to 'start','center' or 'end' if needed
          inline: 'nearest', // Ensure the element is aligned to the top of the scroll container
        });
      } else {
        console.error('Invalid element provided to scrollToElement');
      }
    }
}