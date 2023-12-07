import { renderProfileListings } from "../render/render.js";
import { toggleBtnClass } from "./toggle.js";
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
