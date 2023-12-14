export class OverlayPosition {
  static setPosition(overlay, targetElement, position) {
    // Distance between overlay and target element
    const distance = 10;
    // Additional distance for left and right positions
    const sideDistance = 10;

    // Get the position of the target element and viewport height
    const elementRect = targetElement.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    // If no position is specified, default to "top" if the element is in the lower half of the screen
    if (!position) {
      position = elementRect.top > viewportHeight / 2 ? "top" : "bottom";
    }

    // Reset distances before calculating for each step
    overlay.style.top = "";
    overlay.style.left = "";

    // Split the position into mainPosition and alignment
    const [mainPosition, alignment = ""] = position
      .trim()
      .split(",")
      .map((pos) => pos.trim());

    switch (mainPosition) {
      case "top":
        overlay.style.top = `${elementRect.top - overlay.offsetHeight - distance}px`;
        overlay.style.left = `${elementRect.left}px`;
        break;
      case "bottom":
        overlay.style.top = `${elementRect.bottom + distance}px`;
        overlay.style.left = `${elementRect.left}px`;
        break;
      case "left":
        overlay.style.top = `${elementRect.top}px`;
        overlay.style.left = `${elementRect.left - overlay.offsetWidth - sideDistance}px`;
        break;
      case "right":
        overlay.style.top = `${elementRect.top }px`;
        overlay.style.left = `${elementRect.right + sideDistance}px`;
        break;
      default:
        // Default position (top or bottom)
        overlay.style.top =
          mainPosition === "top"
            ? `${elementRect.top - overlay.offsetHeight - distance}px`
            : `${elementRect.bottom + distance}px`;
        overlay.style.left = `${elementRect.left}px`;
        break;
    }

    // Check if it should be centered
    if (alignment === "center") {
      if (mainPosition === "top" || mainPosition === "bottom") {
        overlay.style.left = `${elementRect.left + (elementRect.width - overlay.offsetWidth) / 2 }px`;
      } else if (mainPosition === "left" || mainPosition === "right") {overlay.style.top = `${elementRect.top + (elementRect.height - overlay.offsetHeight) / 2 }px`;
      }
    }else if(alignment === "bottom") {
      if (mainPosition === "left" || mainPosition === "right") {
        overlay.style.top = `${elementRect.top + (elementRect.height - overlay.offsetHeight) }px`;
      }
    }else if(alignment === "right") {
      if (mainPosition === "top" || mainPosition === "bottom") {
        overlay.style.left = `${elementRect.right - overlay.offsetWidth }px`;
      }
    }
  }
}
