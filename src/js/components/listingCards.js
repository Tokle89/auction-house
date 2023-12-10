import { createElement } from "../utils/createElement.js";
import { parseDate } from "../utils/parse.js";
import { checkMedia } from "../utils/media.js";
import { trimText } from "../utils/trimText.js";

export const createListingCard = (
  { id, title, bids, endsAt, media },
  amount,
) => {
  const element = createElement("div", [
    "col",
    "py-4",
    "d-flex,",
    "justify-content-center",
    "card-container",
  ]);

  const image = imgContainer(media, title);
  const cardBodyElement = cardBody(id, title, endsAt, bids, amount);
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
    checkMedia(media[0]),
    title,
  );

  element.append(img);
  return element;
};

const cardBody = (id, title, endsAt, bids, amount) => {
  const element = createElement("div", [
    "card-body",
    "d-flex",
    "flex-column",
    "justify-content-center",
    "align-items-center",
  ]);

  const header = createElement(
    "h2",
    ["card-title", "fs-4"],
    undefined,
    trimText(title, 15),
  );

  const paragraph = createElement(
    "p",
    ["card-text"],
    undefined,
    `Ends at: ${parseDate(endsAt)}`,
  );
  const secondParagraph = createElement("p", ["card-text"], undefined);

  if (bids) {
    if (bids.length > 0) {
      const lastBid = bids[0];
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
  } else if (amount) {
    const sum = createElement(
      "span",
      ["text-danger", "fw-bold"],
      undefined,
      `${amount} EUR`,
    );
    secondParagraph.append(`Your bid: `, sum);
  }

  const link = createElement(
    "a",
    ["btn", "btn-secondary", "mt-1"],
    undefined,
    "View",
    `../../../listing/index.html?id=${id}`,
  );

  const textContainer = createElement(
    "div",
    ["m-auto", "p-3"],
    [header, paragraph, secondParagraph, link],
  );

  element.append(textContainer);
  return element;
};
