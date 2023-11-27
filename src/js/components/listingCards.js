import { createElement } from "../utils/createHtml.js";
import { parseDate } from "../utils/parse.js";
import { checkMedia } from "../utils/media.js";

export const createListingCard = ({ title, bids, endsAt, media }) => {
  const element = createElement("div", [
    "col",
    "py-4",
    "d-flex,",
    "justify-content-center",
  ]);

  const image = imgContainer(media, title);
  const cardBodyElement = cardBody(title, endsAt, bids);
  const card = createElement(
    "div",
    [
      "card",
      "d-flex",
      "flex-column",
      "justify-content-center",
      "flex-lg-row",
      "border",
      "border-warning",
    ],
    [image, cardBodyElement],
  );

  element.append(card);

  return element;
};

const imgContainer = (media, title) => {
  const element = createElement("div", ["img-container"]);
  const img = createElement(
    "img",
    undefined,
    undefined,
    undefined,
    undefined,
    title,
  );
  img.src = checkMedia(media);

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
    const sum = createElement(
      "span",
      ["text-danger", "fw-bold"],
      undefined,
      `${lastBid.amount} EUR`,
    );
    secondParagraph.append(`Current bid: `, sum);
  } else {
    secondParagraph.append("No bids yet");
  }

  const link = createElement(
    "a",
    ["btn", "btn-secondary", "mt-1"],
    undefined,
    "View",
  );

  const textContainer = createElement(
    "div",
    ["m-auto", "p-3"],
    [header, paragraph, secondParagraph, link],
  );

  element.append(textContainer);
  return element;
};
