import { createElement } from "../utils/createElement.js";
/**
 * Renders a message to the user if there are no listings that match the search value.
 * @return {void}
 * @example
 * //Example usage:
 * renderSearchMsg();
 */
export const renderSearchMsg = () => {
  const container = document.querySelector(".cards-container");
  container.innerHTML = "";
  const searchMsg = createSearchMsg();
  container.append(searchMsg);
};
/**
 *  Creates a div element with a search message.
 * @returns {HTMLDivElement} - A div element with a search message.
 * @example
 * //Example usage:
 * createSearchMsg();
 */
const createSearchMsg = () => {
  const element = createElement("div", [
    "search-msg",
    "text-center",
    "p-5",
    "border",
    "border-danger",
    "bg-white",
    "m-auto",
  ]);
  const h1 = createElement(
    "h1",
    ["text-danger"],
    undefined,
    "No listings found",
  );
  const p = createElement(
    "p",
    ["text-dark"],
    undefined,
    "Try searching for something else",
  );
  element.append(h1, p);
  return element;
};
