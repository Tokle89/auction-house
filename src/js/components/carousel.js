import { createElement } from "../utils/createElement.js";
import { parseDate } from "../utils/parse.js";
import { checkMedia } from "../utils/media.js";
import { trimText } from "../utils/trimText.js";

export const createCarouselCard = ({
  id,
  title,
  endsAt,
  bids,
  description,
  media,
}) => {
  const element = createElement("div", ["carousel-item"]);

  const img = createCarouselCardImg(media, title);
  const textContainer = createTextContainer(
    id,
    title,
    endsAt,
    bids,
    description,
  );

  const carouselItemContainer = createElement(
    "div",
    ["carousel-item-container", "d-flex", "flex-column", "flex-sm-row", "p-3"],
    [img, textContainer],
  );
  const div = createElement(
    "div",
    ["d-flex", "justify-content-center", "w-100"],
    [carouselItemContainer],
  );

  element.append(div);
  return element;
};

const createCarouselCardImg = (media, title) => {
  const element = createElement(
    "img",
    ["d-block"],
    undefined,
    undefined,
    undefined,
    title,
  );
  element.src = checkMedia(media);
  return element;
};

const createTextContainer = (id, title, endsAt, bids, description) => {
  const element = createElement("div", [
    "p-4",
    "content-container",
    "d-flex",
    "flex-column",
    "justify-content-md-center",
  ]);
  const h1 = createElement("h1", undefined, null, trimText(title, 25));
  const paragraph = createElement(
    "p",
    ["text-dark", "d-none", "d-sm-block"],
    undefined,
    trimText(description, 70),
  );
  const paragraph2 = createElement(
    "p",
    undefined,
    undefined,
    `Ends at: ${parseDate(endsAt)}`,
  );

  const latestBid = bids[bids.length - 1];
  const span = createElement(
    "span",
    ["text-danger", "fw-bold"],
    undefined,
    `${latestBid.amount} EUR`,
  );
  const paragraph3 = createElement("p", undefined, ["Current bid:", span]);

  const link = createElement(
    "a",
    ["btn", "btn-secondary"],
    undefined,
    "View",
    `./listing/index.html?id=${id}`,
  );

  const container = createElement(
    "div",
    ["m-auto"],
    [h1, paragraph, paragraph2, paragraph3, link],
  );
  element.append(container);
  return element;
};
