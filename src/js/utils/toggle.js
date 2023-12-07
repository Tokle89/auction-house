import { createProfileBtnImg } from "../components/profile.js";
import { createElement } from "./createElement.js";
import { parseDate } from "./parse.js";

const authBtns = document.getElementById("auth-btns");
const profileBtn = document.querySelector(".profile-btn");

export const toggleHeaderBtns = () => {
  const token = localStorage.getItem("token");

  if (token) {
    authBtns.classList.add("d-none");
    profileBtn.classList.remove("d-none");
    createProfileBtnImg();
  } else {
    authBtns.classList.remove("d-none");
    profileBtn.classList.add("d-none");
  }
};

export const toggleBids = (button, bidsContainer, bids) => {
  if (button.classList.contains("view")) {
    bids
      .sort((a, b) => b.amount - a.amount)
      .forEach((bid) => {
        const bidContainer = createElement("div", [
          "border",
          "border-primary",
          "p-2",
          "mb-3",
        ]);
        const p = createElement(
          "p",
          ["fw-bold", "mb-0"],
          undefined,
          bid.bidderName,
        );
        const span = createElement(
          "span",
          ["text-danger", "fw-bold"],
          undefined,
          ` ${bid.amount} EUR`,
        );
        const secondP = createElement(
          "p",
          ["text-dark", "mb-0"],
          [`Amount: `, span],
        );
        const thirdP = createElement(
          "p",
          ["text-dark", "mb-0"],
          undefined,
          `Date: ${parseDate(bid.created)}`,
        );
        bidContainer.append(p, secondP, thirdP);
        bidsContainer.append(bidContainer);
      });

    button.textContent = "Hide Bids";
    button.classList.remove("view");
  } else {
    bidsContainer.innerHTML = "";
    button.textContent = "View All Bids";
    button.classList.add("view");
  }
};

export const toggleBtnClass = (id, containerClass, childrenClass) => {
  const btnContainer = document.querySelector(containerClass);
  const btnArray = Object.values(btnContainer.children);
  btnArray.forEach((btn) => {
    if (btn.id === id) {
      btn.classList.add(childrenClass);
    } else {
      btn.classList.remove(childrenClass);
    }
  });
};
