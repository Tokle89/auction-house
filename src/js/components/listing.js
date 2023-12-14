import { createElement } from "../utils/createElement.js";
import { parseDate } from "../utils/parse.js";
import * as storage from "../storage/index.js";
import { toggleBids } from "../utils/toggle.js";
import { deleteListing } from "../listing/delete.js";
import { checkMedia } from "../utils/media.js";
import { handleBid } from "../listing/bid.js";
import { minBid } from "../utils/bidChecker.js";
import { findLatestBid } from "../utils/bidChecker.js";

/**
 * creates a listing element with the given data.
 * @param {object} param0
 * @param {array} param0.media - The media of the listing.
 * @param {string} param0.title - The title of the listing.
 * @param {string} param0.description - The description of the listing.
 * @param {object} param0.seller - The seller of the listing.
 * @param {string} param0.created - The creation date of the listing.
 * @param {array} param0.bids - The bids of the listing.
 * @param {number} param0.id - The id of the listing.
 * @returns  {HTMLObjectElement} - The created element.
 *
 * @example
 * //Example usage:
 * const element = createListing({ media, title, description, seller, created, bids, id });
 */
export const createListing = ({
  media,
  title,
  description,
  seller,
  created,
  bids,
  id,
}) => {
  const element = createElement("div", [
    "container",
    "listing-details_container",
    "d-flex",
    "flex-lg-row",
    "flex-column",
  ]);
  const listingContent = createContentContainer(media, title, description);
  const listingInfo = createListingInfoContainer(seller, created, bids, id);
  element.append(listingContent, listingInfo);

  return element;
};

/**
 *  Creates a listing content container for the listing.
 * @param {array} media
 * @param {string} title
 * @param {string} description
 * @returns  {HTMLObjectElement} - The created element.
 *
 * @example
 * //Example usage:
 * const element = createContentContainer(media, title, description);
 */
const createContentContainer = (media, title, description) => {
  const element = createElement("div", ["listing-content", "container"]);
  const imgContainer = createImgContainer(media, title);
  const textContainer = createTextContainer(title, description);

  element.append(imgContainer, textContainer);
  return element;
};

/**
 *  Creates a listing image container for the listing. If there are more than one image, it creates a thumbnail container, and adds a event listener to the images.
 * @param {array} media
 * @param {string} title
 * @returns  {HTMLObjectElement} - The created element.
 *
 * @example
 * //Example usage:
 * const element = createImgContainer(media, title);
 */
const createImgContainer = (media, title) => {
  const element = createElement("div", ["img-container"]);

  const mainImg = createElement(
    "img",
    ["main-image"],
    undefined,
    undefined,
    undefined,
    checkMedia(media[0]),
    title,
  );
  element.append(mainImg);
  mainImg.dataset.bsToggle = "modal";
  mainImg.dataset.bsTarget = "#img-modal";
  mainImg.addEventListener("click", () => {
    const modalImg = document.getElementById("img-modal-img");
    modalImg.src = mainImg.src;
  });

  if (media.length > 1) {
    const thumbnailContainer = createElement("div", [
      "thumbnail-container",
      "d-flex",
      "justify-content-between",
    ]);

    media.slice(1).forEach((img) => {
      let checkedImg = checkMedia(img);
      const thumbnailImg = createElement(
        "img",
        ["thumbnail"],
        undefined,
        undefined,
        undefined,
        checkedImg,
        title,
      );

      thumbnailImg.addEventListener("click", () => {
        const currentMainImgSrc = mainImg.src;
        mainImg.src = thumbnailImg.src;
        thumbnailImg.src = currentMainImgSrc;
        thumbnailContainer.append(thumbnailImg);
      });

      thumbnailContainer.append(thumbnailImg);
    });

    element.append(thumbnailContainer);
  }

  return element;
};

/**
 *  Creates a listing text container for the listing.
 * @param {string} title
 * @param {string} description
 * @returns  {HTMLObjectElement} - The created element.
 *
 * @example
 * //Example usage:
 * const element = createTextContainer(title, description);
 */
const createTextContainer = (title, description) => {
  const element = createElement("div", ["text-container", "p-2"]);

  const h1 = createElement("h1", ["fs-2"], undefined, title);
  const p = createElement("p", ["text-dark"], undefined, description);

  element.append(h1, p);

  return element;
};

/**
 *  Creates a listing info container for the listing.
 * @param {object} seller
 * @param {string} created
 * @param {array} bids
 * @param {number} id
 * @returns  {HTMLObjectElement} - The created element.
 *
 * @example
 * //Example usage:
 * const element = createListingInfoContainer(seller, created, bids, id);
 */
const createListingInfoContainer = (seller, created, bids, id) => {
  const element = createElement("div", ["listing-info", "container"]);

  const h2 = createElement(
    "h2",
    ["fw-bold", "mb-3", "fs-5"],
    undefined,
    "Time Remaining",
  );

  const timeRemainingContainer = createElement("div", [
    "d-flex",
    "justify-content-evenly",
    "time-remaining-container",
  ]);
  const dayContainer = createTimeContainer("days-container", "Days");
  const hourContainer = createTimeContainer("hours-container", "Hours");
  const minuteContainer = createTimeContainer("min-container", "Min");
  const secondContainer = createTimeContainer("sec-container", "Sec");
  timeRemainingContainer.append(
    dayContainer,
    hourContainer,
    minuteContainer,
    secondContainer,
  );

  const bidInfoContainer = createBidInfoContainer(seller, created, bids, id);
  let user = storage.get("user");
  if (user && seller.name === user.name) {
    const editDropdown = createEditDropdown(id);
    bidInfoContainer.classList.remove("mt-5");
    element.append(h2, timeRemainingContainer, editDropdown, bidInfoContainer);
  } else {
    element.append(h2, timeRemainingContainer, bidInfoContainer);
  }

  return element;
};

/**
 *  Creates a time container for each time unit, using the given class name and text.
 * @param {string} className
 * @param {string} text
 * @returns  {HTMLObjectElement} - The created element.
 *
 * @example
 * //Example usage:
 * const element = createTimeContainer(className, text);
 *
 *
 */
const createTimeContainer = (className, text) => {
  const element = createElement("div", [
    "bg-danger",
    "text-white",
    "time-container",
    "text-center",
    "fw-bold",
    "d-flex",
    "flex-column",
    "align-items-center",
    "justify-content-center",
  ]);
  const p = createElement("p", [className], undefined);
  const secondP = createElement("p", undefined, undefined, text);
  element.append(p, secondP);
  return element;
};

/**
 *  Creates a bid info container for the listing.
 * @param {object} seller
 * @param {string} created
 * @param {array} bids
 * @param {number} id
 * @returns  {HTMLObjectElement} - The created element.
 *
 * @example
 * //Example usage:
 * const element = createBidInfoContainer(seller, created, bids, id);
 */
const createBidInfoContainer = (seller, created, bids, id) => {
  const element = createElement("div", [
    "mt-5",
    "border",
    "border-warning",
    "p-3",
    "bg-white",
  ]);
  const profileContainer = createProfileContainer(seller);
  const border = createElement("div", [
    "border-bottom",
    "border-secondary",
    "py-1",
    "mb-2",
  ]);
  const infoContainer = createInfoContainer(created, bids, id);
  element.append(profileContainer, border, infoContainer);
  return element;
};

/**
 *  Creates a info container for the listing.
 * if there are bids, it creates a bids container, and a button to toggle the bids container, else it creates placeholder text.
 *  if the user is logged in, it creates a bid form, and a button to toggle the bids container, else it creates link to the login page.
 *
 * @param {string} created
 * @param {array} bids
 * @param {number} id
 * @returns  {HTMLObjectElement} - The created element.
 *
 * @example
 * //Example usage:
 * const element = createInfoContainer(created, bids, id);
 */
const createInfoContainer = (created, bids, id) => {
  const element = createElement("div", ["info-container"]);

  const p = createElement(
    "p",
    undefined,
    undefined,
    `Created: ${parseDate(created)}`,
  );
  const secondP = createElement("p", ["fw-bold"], undefined, "Current bid:");
  const thirdP = createElement("p");
  const fourthP = createElement("p");

  if (bids.length > 0) {
    const { bidderName, amount } = findLatestBid(bids);

    thirdP.append(`By: ${bidderName}`);
    const price = createElement(
      "span",
      ["text-danger", "fw-bold"],
      undefined,
      `${amount} EUR`,
    );
    fourthP.append(`Amount: `, price);
  } else {
    thirdP.append("No bids yet!");
    fourthP.append("Be the first to bid!");
    fourthP.classList.add("text-secondary", "fw-bold");
  }
  const link = createElement(
    "a",
    ["text-primary", "fw-bold", "mt-1", "text-decoration-underline", "fs-5"],
    undefined,
    "Please login in to bid",
    `../../../auth/login/`,
  );

  element.append(p, secondP, thirdP, fourthP, link);
  const LoggedId = storage.get("user");
  if (LoggedId) {
    const fundsP = createElement(
      "p",
      ["text-secondary", "fw-bold"],
      undefined,
      `Funds: ${storage.get("user").credit} EUR`,
    );

    link.classList.add("d-none");
    const container = createElement(
      "div",
      [
        "d-flex",
        "justify-content-between",
        "align-items-start",
        "align-items-sm-end",
        "flex-column",
        "flex-sm-row",
      ],
      [fourthP, fundsP],
    );

    const form = createBidForm(id, bids);
    const bidsContainer = createElement("div", ["bids-container", "mt-3"]);
    const button = createElement(
      "button",
      ["btn", "btn-white", "border-primary", "view"],
      undefined,
      "View All Bids",
    );
    button.addEventListener("click", () => {
      toggleBids(button, bidsContainer, bids);
    });

    element.append(container, form, button, bidsContainer);
  }

  return element;
};

/**
 *  Creates a bid form for the listing, and adds a event listener to the form.
 * @param {number} id
 * @param {array} bid
 * @returns {HTMLObjectElement} - The created element.
 *
 * @example
 * //Example usage:
 * const element = createBidForm(id, bid);
 */
const createBidForm = (id, bid) => {
  const element = createElement("form", [
    "d-flex",
    "flex-column",
    "flex-sm-row",
  ]);
  element.action = "post";
  element.id = "bid-form";
  const input = createElement("input", ["form-control", "mb-4"]);
  input.id = "bid";
  input.placeholder = `Minimum Amount: ${minBid(bid)} `;
  input.required = true;
  input.type = "number";
  input.min = minBid(bid);

  const button = createElement(
    "button",
    ["btn", "btn-secondary", "mb-4"],
    undefined,
    "Bid",
  );
  button.type = "submit";
  element.append(input, button);

  element.addEventListener("submit", () => handleBid(id));

  return element;
};

/**
 *  Creates a profile container for the listing, based on the seller object.
 * @param {object} param0
 * @param {string} param0.name
 * @param {string} param0.email
 * @param {url} param0.avatar
 * @returns  {HTMLObjectElement} - The created element.
 * @example
 * //Example usage:
 * const element = createProfileContainer({ name, email, avatar });
 *
 */
const createProfileContainer = ({ name, email, avatar }) => {
  const element = createElement(
    "a",
    ["profile-info", "d-flex", "align-items-center", "flex-wrap"],
    undefined,
    undefined,
    `../profile/index.html?id=${name}`,
  );
  const img = createElement(
    "img",
    ["profile-avatar", "rounded-circle", "me-4"],
    undefined,
    undefined,
    undefined,
    checkMedia(avatar),
    name,
  );
  const h3 = createElement("h3", ["fs-5", "fw-bold", "mb-o"], undefined, name);
  const p = createElement("p", ["text-dark"], undefined, email);
  const div = createElement("div", undefined, [h3, p]);

  element.append(img, div);

  return element;
};

/**
 *  Creates a edit dropdown container for the listing, that contains a edit and delete button. Edit button opens a modal, delete button deletes the listing.
 * @param {number} id
 * @returns  {HTMLObjectElement} - The created element.
 * @example
 * //Example usage:
 * const element = createEditDropdown(id);
 */
const createEditDropdown = (id) => {
  const element = createElement("div", ["dropdown", "mb-2", "mt-5"]);
  element.id = "edit-dropdown";
  const btn = createElement(
    "button",
    ["btn", "btn-primary", "dropdown-toggle"],
    undefined,
    "Edit Listing",
  );
  btn.dataset.bsToggle = "dropdown";
  const editBtn = createElement(
    "button",
    ["listing-modal_btn", "text-link", "text-primary", "dropdown-item", "p-2"],
    undefined,
    "Edit Listing",
  );
  editBtn.dataset.bsToggle = "modal";
  editBtn.dataset.bsTarget = "#edit-listing-modal";
  const deleteBtn = createElement(
    "button",
    ["listing-modal_btn", "text-link", "text-primary", "dropdown-item", "p-2"],
    undefined,
    "Delete Listing",
  );
  deleteBtn.addEventListener("click", () => {
    deleteListing(id);
  });

  const li = createElement("li", undefined, [editBtn]);
  const li2 = createElement("li", undefined, [deleteBtn]);
  const ul = createElement(
    "ul",
    ["dropdown-menu", "dropdown-menu-start", "border", "border-primary"],
    [li, li2],
  );
  element.append(btn, ul);

  return element;
};
