import { createElement } from "../utils/createElement.js";

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
