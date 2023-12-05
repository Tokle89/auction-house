import { renderProfileListings } from "../render/render.js";

export const toggleProfileListings = () => {
  const btnContainer = document.querySelector(".btn-group");
  const btnArray = Object.values(btnContainer.children);
  btnArray.forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = btn.id;
      renderProfileListings(`${id}`);
      toggleFeedBtnClass(id);
    });
  });
};

const toggleFeedBtnClass = (id) => {
  const btnContainer = document.querySelector(".btn-group");
  const btnArray = Object.values(btnContainer.children);
  btnArray.forEach((btn) => {
    if (btn.id === id) {
      btn.classList.add("current-btn");
    } else {
      btn.classList.remove("current-btn");
    }
  });
};
