export class OverlayPosition {
  static setPosition(overlay, targetElement, position) {
    // Distance between overlay and target element
    const distance = 10;
    // Additional distance for left and right positions
    const sideDistance = 10;

    // Get the position of the target element and viewport height
    const elementRect = targetElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // If no position is specified, default to "top" if the element is in the lower half of the screen
    if (!position) {
      position = elementRect.top > viewportHeight / 2 ? "top" : "bottom";
    }

    // Split the position into mainPosition and alignment
    const [mainPosition, alignment = ""] = position
      .trim()
      .split(",")
      .map((pos) => pos.trim());
      //calculate the difference between the viewport and top of the page 
      const scrollDifference = this.calcScrollDifference();
    switch (mainPosition) {
      case "top":
        overlay.style.transition = "top 0.5s, left 0.5s";
        overlay.style.top = `${(elementRect.top - overlay.offsetHeight - distance)+scrollDifference}px`;
        overlay.style.left = `${elementRect.left}px`;
        break;
      case "bottom":
        overlay.style.transition = "top 0.5s, left 0.5s";
        overlay.style.top = `${(elementRect.bottom + distance)+scrollDifference}px`;
        overlay.style.left = `${elementRect.left}px`;
        break;
      case "left":
        overlay.style.transition = "top 0.5s, left 0.5s";
        overlay.style.top = `${(elementRect.top)+scrollDifference}px`;
        overlay.style.left = `${elementRect.left - overlay.offsetWidth - sideDistance}px`;
        break;
      case "right":
        overlay.style.transition = "top 0.5s, left 0.5s";
        overlay.style.top = `${(elementRect.top)+scrollDifference}px`;
        overlay.style.left = `${elementRect.right + sideDistance}px`;
        break;
      default:
        // Default position (top or bottom)
        overlay.style.top =
          mainPosition === "top"
            ? `${(elementRect.top - overlay.offsetHeight - distance)+scrollDifference}px`
            : `${elementRect.bottom + distance}px`;
        overlay.style.left = `${elementRect.left}px`;
        break;
    }

    // Check if it should be centered
    if (alignment === "center") {
      if (mainPosition === "top" || mainPosition === "bottom") {
        overlay.style.left = `${elementRect.left + (elementRect.width - overlay.offsetWidth) / 2}px`;
      } else if (mainPosition === "left" || mainPosition === "right") {
        overlay.style.top = `${elementRect.top + (elementRect.height - overlay.offsetHeight) / 2}px`;
      }
    } else if (alignment === "bottom") {
      if (mainPosition === "left" || mainPosition === "right") {
        overlay.style.top = `${elementRect.top + (elementRect.height - overlay.offsetHeight)}px`;
      }
    } else if (alignment === "right") {
      if (mainPosition === "top" || mainPosition === "bottom") {
        overlay.style.left = `${elementRect.right - overlay.offsetWidth}px`;
      }
    }

    // Check if the element is still in view after scrolling
    const isElementInView = this.isElementInViewport(elementRect);

    // If not in view, adjust the overlay position after scrolling
    if (!isElementInView) {
      const offset = this.calculateScrollOffset(elementRect);
      window.scrollBy(0, -offset);

      // Recalculate the position after scrolling
      const updatedElementRect = targetElement.getBoundingClientRect();
      this.adjustOverlayPositionAfterScroll(overlay, updatedElementRect, distance, sideDistance);
    }
  }

  static isElementInViewport(rect) {
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  static calculateScrollOffset(rect) {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const desiredTop = rect.top - 10; // Adjust this value if needed

    return Math.abs(viewportHeight - desiredTop);
  }

  static adjustOverlayPositionAfterScroll(overlay, targetElementRect, distance, sideDistance) {
    
  }

  static calcScrollDifference(){
    // Get the top position of the viewport
    const viewportTop = window.scrollY || window.pageYOffset;

    // Get the top position of the page
    const pageTop = 0; // You can set this to any specific value if needed, like the top position of a specific element

    // Calculate the difference
    const scrollDifference = viewportTop - pageTop;

    console.log("Scroll Difference:", scrollDifference);
    return scrollDifference;
  }
}
