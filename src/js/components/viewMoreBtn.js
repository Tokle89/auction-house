import { createElement } from "../utils/createElement.js";

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

const ViewMoreListings = (listings, btn) => {
  const listingsArr = Object.values(listings);

  listingsArr.forEach((listing) => {
    if (listing.classList.contains("d-none")) {
      listing.classList.remove("d-none");
    }
  });
  btn.classList.add("d-none");
};
