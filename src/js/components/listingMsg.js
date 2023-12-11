import { createElement } from "../utils/createElement.js";
/**
 *  Creates a message with the given text, and appends it to the cards container
 * @param {string} text
 * @returns {HTMLHeadingElement} - The message.
 *
 * @example
 * //Example usage:
 * createMsg("No listings found");
 *
 *
 */
export const createMsg = (text) => {
  const container = document.querySelector(".cards-container");
  container.classList.remove("row-cols-sm-2");
  const msg = createElement(
    "h1",
    ["text-center", "text-secondary", "mt-5", "col-12", "position-relative"],
    undefined,
    text,
  );
  container.append(msg);
};
