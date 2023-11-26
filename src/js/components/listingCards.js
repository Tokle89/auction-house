import { createElement } from "../utils/createHtml.js";
import { parseDate } from "../utils/parse.js";

export const createListingCard = ({ title, bids, endsAt, media }) => {
  const container = document.querySelector(".cards-container");

  const cardContainer = createElement("div", [
    "col",
    "py-4",
    "d-flex,",
    "justify-content-center",
  ]);
  const card = createElement("div", [
    "card",
    "d-flex",
    "flex-column",
    "justify-content-center",
    "flex-lg-row",
    "border",
    "border-warning",
  ]);

  const image = imgContainer(media, title);
  const cardBodyElement = cardBody(title, endsAt, bids);

  card.append(image, cardBodyElement);
  cardContainer.append(card);

  container.append(cardContainer);
};

const imgContainer = (media, title) => {
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

  if (media.length < 1) {
    img.src = "https://via.placeholder.com/300x200?text=No+image+available";
  }
  element.append(img);
  return element;
};
const cardBody = (title, endsAt, bids) => {
  const element = createElement("div", [
    "card-body",
    "d-flex",
    "flex-column",
    "justify-content-center",
    "align-items-center",
  ]);
  const textContainer = createElement("div", ["m-auto", "p-3"]);
  const header = createElement("h2", ["card-title", "fs-4"], undefined, title);

  const date = parseDate(endsAt);

  const paragraph = createElement(
    "p",
    ["card-text"],
    undefined,
    "Ends at: " + date,
  );
  const secondParagraph = createElement("p", ["card-text"], undefined);

  if (bids.length > 0) {
    const lastBid = bids[bids.length - 1];

    const stringifiedBid = JSON.stringify(lastBid.amount);

    const sum = createElement(
      "span",
      ["text-danger"],
      undefined,
      `${stringifiedBid} EUR`,
    );
    secondParagraph.append(`Current bid: `, sum);
  } else {
    secondParagraph.append("No bids yet");
  }

  textContainer.append(header, paragraph, secondParagraph);
  element.append(textContainer);
  return element;
};
