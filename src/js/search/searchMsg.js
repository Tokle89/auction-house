import { createElement } from "../utils/createElement.js";

export const renderSearchMsg = () => {
  const container = document.querySelector(".cards-container");
  container.innerHTML = "";
  const searchMsg = createSearchMsg();
  container.append(searchMsg);
};
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
