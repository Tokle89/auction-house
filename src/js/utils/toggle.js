import { createProfileBtnImg } from "../components/profile.js";
import { createElement } from "./createElement.js";
import { parseDate } from "./parse.js";
import { handleSubmitListing } from "../listing/post.js";

const authBtns = document.getElementById("auth-btns");
const profileBtn = document.getElementById("profile-btn");
const listingBtns = document.querySelectorAll(".listing-btn");

/**
 * Toggles the header buttons depending on if the user is logged in or not.
 * @example
 * //Example usage:
 * toggleHeaderBtns();
 */
export const toggleBtns = () => {
  const token = localStorage.getItem("token");
  const listingBtnsArr = Object.values(listingBtns);

  if (token) {
    authBtns.classList.add("d-none");
    profileBtn.classList.remove("d-none");
    listingBtnsArr.forEach((btn) => btn.classList.remove("d-none"));

    createProfileBtnImg();
  } else {
    authBtns.classList.remove("d-none");
    profileBtn.classList.add("d-none");
    listingBtnsArr.forEach((btn) => btn.classList.add("d-none"));
  }
};

/**
 * Toggles the class "active" on the given button, and removes the class from the other buttons.
 * @param {string} id
 * @param {string} containerClass
 * @param {string} childrenClass
 * @example
 * //Example usage:
 * toggleBtnClass("bids", ".filter-btn-container", "current");
 */
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

export const toggleListingBtn = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const listingForm = document.getElementById("listing-form");
    listingForm.addEventListener("submit", handleSubmitListing);
  }
};

/**
 * Toggles the bids container, and displays the bids if the button has the class "view".
 * and hides the bids if the button does not have the class "view".
 * @param {HTMLButtonElement} button
 * @param {HTMLObjectElement} bidsContainer
 * @param {Array} bids
 * @example
 * //Example usage:
 * toggleBids(button, bidsContainer, bids);
 */
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
