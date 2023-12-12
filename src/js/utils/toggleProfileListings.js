import { renderProfileListings } from "../render/render.js";
import { toggleBtnClass } from "./toggle.js";

/**
 * Toggles the profile listings, and displays the listings if the button has the class "current-btn".
 * executes the renderProfileListings function with the given id.
 * @returns {void}
 * @example
 * //Example usage:
 * toggleProfileListings();
 *
 */
export const toggleProfileListings = () => {
  const btnContainer = document.querySelector(".btn-group");
  const btnArray = Object.values(btnContainer.children);
  btnArray.forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = btn.id;
      renderProfileListings(`${id}`);
      toggleBtnClass(id, ".btn-group", "current-btn");
    });
  });
};
