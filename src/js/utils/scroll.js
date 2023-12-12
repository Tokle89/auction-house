/**
 * Scrolls to the listings section
 * @returns {void}
 * @example
 * //Example usage:
 * scrollToListings();
 */
export const scrollToListings = () => {
  const container = document.querySelector(".filter-container");
  container.scrollIntoView({ behavior: "smooth" });
};
