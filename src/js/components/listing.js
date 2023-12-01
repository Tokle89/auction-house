import { createElement } from "../utils/createElement.js";
import { parseDate } from "../utils/parse.js";
import * as storage from "../storage/index.js";

export const createListing = ({
  media,
  title,
  description,
  endsAt,
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
  console.log(media, title, description);

  const listingContent = createContentContainer(media, title, description);
  const listingInfo = createListingInfoContainer(endsAt, seller, created, bids);
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

  const img = createElement(
    "img",
    undefined,
    undefined,
    undefined,
    undefined,
    media[0],
    title,
  );
  element.append(img);
  if (media.length > 1) {
    const div = createElement("div", ["d-flex"]);
    media.forEach((img, i) => {
      if (i > 0) {
        const image = createElement(
          "img",
          ["p-2"],
          undefined,
          undefined,
          undefined,
          img,
          title,
        );
        div.append(image);
        element.append(div);
      }
    });
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

const createListingInfoContainer = (endsAt, seller, created, bids) => {
  const element = createElement("div", ["listing-info", "container"]);

  const h2 = createElement(
    "h2",
    ["fw-bold", "mb-3", "fs-5"],
    undefined,
    "Time Remaining",
  );

  const { days, hours, minutes, seconds } = countDownFunction(endsAt);
  const timeRemainingContainer = createElement("div", [
    "d-flex",
    "justify-content-evenly",
    "time-remaining-container",
  ]);
  const dayContainer = createTimeContainer(days, "Days");
  const hourContainer = createTimeContainer(hours, "Hours");
  const minuteContainer = createTimeContainer(minutes, "Minutes");
  const secondContainer = createTimeContainer(seconds, "Seconds");
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

const createBidInfoContainer = (seller, created, bids) => {
  const element = createElement("div", [
    "mt-5",
    "border",
    "border-warning",
    "p-3",
    "bg-white",
  ]);
  const profileContainer = createProfileContainer(seller);
  const border = createElement("div", ["border-bottom", "border-secondary"]);
  const infoContainer = createInfoContainer(created, bids);
  element.append(profileContainer, border, infoContainer);
  return element;
};

const createInfoContainer = (created, bids) => {
  const element = createElement("div");

  const time = parseDate(created);
  const p = createElement("p", undefined, undefined, `Started: ${time}`);
  const secondP = createElement("p", ["mb-o"], undefined, "Current bid:");

  const LatestBid = bids[bids.length - 1];
  const price = createElement(
    "span",
    ["text-danger", "fw-bold"],
    undefined,
    `${LatestBid.amount} EUR`,
  );
  const thirdP = createElement("p", undefined, [price], "Amount");
  const fourthP = createElement(
    "p",
    undefined,
    undefined,
    `By: ${LatestBid.bidderName}`,
  );
  const div = createElement("div", ["d-flex"], [thirdP, fourthP]);

  const funds = storage.get("user").credit;
  const fundsP = createElement(
    "p",
    ["text-secondary", "fw-bold"],
    undefined,
    `Funds: ${funds} EUR`,
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
    [div, fundsP],
  );

  const form = createBidForm();
  const button = createElement(
    "button",
    ["btn", "btn-white", "border-primary"],
    undefined,
    "View All Bids",
  );

  element.append(p, secondP, container, form, button);
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
    ["btn", "btn-secondary", "mb-4", "text-white"],
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
    `../../../profile.index.html?id=${name}`,
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

const createTimeContainer = (time, text) => {
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
  const p = createElement("p", undefined, undefined, time);
  const secondP = createElement("p", undefined, undefined, text);
  element.append(p, secondP);
  return element;
};

const countDownFunction = (endsAt) => {
  const countDownDate = new Date(endsAt).getTime();
  const now = new Date().getTime();
  const distance = countDownDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
};
