import { createElement } from "../utils/createElement.js";

export const createListing = ({ media, title, description, endsAt }) => {
  const element = createElement("div", [
    "container",
    "listing-details_container",
    "d-flex",
    "flex-lg-row",
    "flex-column",
  ]);
  console.log(media, title, description);

  const listingContent = createContentContainer(media, title, description);
  const listingInfo = createListingInfoContainer(endsAt);
  element.append(listingContent, listingInfo);
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

const createListingInfoContainer = (endsAt) => {
  const element = createElement("div", ["listing-info", "container"]);

  // const h2 = createElement("h2", ["fw-bold", "mb-2", "fs-5"], undefined, "Time Remaining");
  console.log(endsAt);
  const countDown = countDownFunction(endsAt);
  console.log(
    countDown.days,
    countDown.hours,
    countDown.minutes,
    countDown.seconds,
  );
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
