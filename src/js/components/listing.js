import { createElement } from "../utils/createElement.js";
import { parseDate } from "../utils/parse.js";
import * as storage from "../storage/index.js";
import { toggleBids } from "../utils/toggle.js";

export const createListing = ({
  media,
  title,
  description,
  seller,
  created,
  bids,
}) => {
  const element = createElement("div", [
    "container",
    "listing-details_container",
    "d-flex",
    "flex-lg-row",
    "flex-column",
  ]);

  const listingContent = createContentContainer(media, title, description);
  const listingInfo = createListingInfoContainer(seller, created, bids);
  element.append(listingContent, listingInfo);
  return element;
};

const createContentContainer = (media, title, description) => {
  const element = createElement("div", ["listing-content", "container"]);
  const imgContainer = createImgContainer(media, title);
  const textContainer = createTextContainer(title, description);

  element.append(imgContainer, textContainer);
  return element;
};

const createImgContainer = (media, title) => {
  const element = createElement("div", ["img-container"]);

  const mainImg = createElement(
    "img",
    ["main-image"],
    undefined,
    undefined,
    undefined,
    media[0],
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
      const thumbnailImg = createElement(
        "img",
        ["thumbnail"],
        undefined,
        undefined,
        undefined,
        img,
        title,
      );

      thumbnailImg.addEventListener("click", () => {
        // Store the current main image source
        const currentMainImgSrc = mainImg.src;

        // Set the main image source to the clicked thumbnail's source
        mainImg.src = thumbnailImg.src;

        // Set the clicked thumbnail's source to the stored main image source
        thumbnailImg.src = currentMainImgSrc;

        // Move the clicked thumbnail to the end of the thumbnail container
        thumbnailContainer.append(thumbnailImg);
      });

      thumbnailContainer.append(thumbnailImg);
    });

    element.append(thumbnailContainer);
  }

  return element;
};

const createTextContainer = (title, description) => {
  const element = createElement("div", ["text-container", "p-2"]);

  const h1 = createElement("h2", undefined, undefined, title);
  const p = createElement("p", ["text-dark"], undefined, description);

  element.append(h1, p);

  return element;
};

const createListingInfoContainer = (seller, created, bids) => {
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

  const bidInfoContainer = createBidInfoContainer(seller, created, bids);
  element.append(h2, timeRemainingContainer, bidInfoContainer);

  return element;
};

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

const createBidInfoContainer = (seller, created, bids) => {
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
  const infoContainer = createInfoContainer(created, bids);
  element.append(profileContainer, border, infoContainer);
  return element;
};

const createInfoContainer = (created, bids) => {
  const element = createElement("div");

  const time = parseDate(created);
  const p = createElement("p", undefined, undefined, `Started: ${time}`);
  const secondP = createElement("p", ["fw-bold"], undefined, "Current bid:");
  const LatestBid = bids[bids.length - 1];
  const thirdP = createElement(
    "p",
    undefined,
    undefined,
    `By: ${LatestBid.bidderName}`,
  );
  const price = createElement(
    "span",
    ["text-danger", "fw-bold"],
    undefined,
    `${LatestBid.amount} EUR`,
  );

  const fourthP = createElement("p", undefined, [`Amount: `, price]);
  const fundsP = createElement(
    "p",
    ["text-secondary", "fw-bold"],
    undefined,
    `Funds: ${storage.get("user").credit} EUR`,
  );

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

  const form = createBidForm();
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

  element.append(p, secondP, thirdP, container, form, button, bidsContainer);
  return element;
};

const createBidForm = () => {
  const element = createElement("form", [
    "d-flex",
    "flex-column",
    "flex-sm-row",
  ]);
  element.action = "post";
  const input = createElement("input", ["form-control", "mb-4"]);
  input.id = "bid";
  input.placeholder = "Enter Amount";
  input.required = true;
  input.type = "number";
  input.min = "1";

  const button = createElement(
    "button",
    ["btn", "btn-secondary", "mb-4"],
    undefined,
    "Bid",
  );
  button.type = "submit";
  element.append(input, button);
  return element;
};

const createProfileContainer = ({ name, email, avatar }) => {
  const element = createElement(
    "a",
    ["profile-info", "d-flex", "align-items-center"],
    undefined,
    undefined,
    `../profile/index.html?id=${name}`,
  );
  const img = createElement(
    "img",
    ["profile-avatar", "rounded-circle"],
    undefined,
    undefined,
    undefined,
    avatar,
    name,
  );
  const h3 = createElement("h3", ["fs-5", "fw-bold", "mb-o"], undefined, name);
  const p = createElement("p", ["text-dark"], undefined, email);
  const div = createElement("div", ["ps-4"], [h3, p]);
  element.append(img, div);
  return element;
};
