import { createElement } from "../utils/createElement.js";

/**
 *  Creates a view more button, and appends it to the cards container, and adds an event listener to it.
 * @param {array} listings
 * @returns  {HTMLButtonElement} - The view more button.
 * @example
 * //Example usage:
 * createViewMoreBtn(listings);
 * returns:
 * <button class="btn btn-primary mt-3 col-12 m-auto">View More</button>
 *
 */

export const createViewMoreBtn = (listings) => {
  const btn = createElement(
    "button",
    ["btn", "btn-primary", "mt-3", "col-12", "m-auto"],
    undefined,
    "View More",
  );
  btn.addEventListener("click", () => {
    ViewMoreListings(listings, btn);
    btn.classList.add("d-none");
  });

  return btn;
};

/**
 *  Shows all the listings, and hides the view more button. This function is called when the view more button is clicked.
 * @param {array} listings
 * @param {HTMLButtonElement} btn
 * @example
 * //Example usage:
 * ViewMoreListings(listings, btn);
 *
 */

const ViewMoreListings = (listings, btn) => {
  const listingsArr = Object.values(listings);

  listingsArr.forEach((listing) => {
    if (listing.classList.contains("d-none")) {
      listing.classList.remove("d-none");
    }
  });
  btn.classList.add("d-none");
};
