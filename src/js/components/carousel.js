import { createElement } from "../utils/createElement.js";
import { parseDate } from "../utils/parse.js";
import { checkMedia } from "../utils/media.js";
import { trimText } from "../utils/trimText.js";
import { findLatestBid } from "../utils/bidChecker.js";

/**
 *  Creates a carousel card.
 * @param {Object } param0 - object containing the listing data.
 * @param {number} param0.id - The id of the listing.
 * @param {string} param0.title - The title of the listing.
 * @param {string} param0.endsAt - The end date of the listing.
 * @param {Array} param0.bids - The bids of the listing.
 * @param {string} param0.description - The description of the listing.
 * @param {Array} param0.media - The media of the listing.
 *
 * @returns  {HTMLObjectElement} - The created element.
 *
 * @example
 * //Example usage:
 * const element = createCarouselCard({ id, title, endsAt, bids, description, media });
 *
 */

export const createCarouselCard = ({ id, title, endsAt, bids, description, media }) => {
  const element = createElement("div", ["carousel-item"]);
  const img = createCarouselCardImg(media, title);
  const textContainer = createTextContainer(id, title, endsAt, bids, description);

  const carouselItemContainer = createElement("div", ["carousel-item-container", "d-flex", "flex-column", "flex-sm-row", "p-3"], [img, textContainer]);
  const div = createElement("div", ["d-flex", "justify-content-center", "w-100"], [carouselItemContainer]);

  element.append(div);
  return element;
};

/**
 *  Creates a carousel card image.
 * @param {url} media - The url of the image.
 * @param {string} title - The title of the listing.
 * @returns {HTMLObjectElement} - The created element.
 *
 * @example
 * //Example usage:
 * const element = createCarouselCardImg(media, title);
 *
 */
const createCarouselCardImg = (media, title) => {
  const element = createElement("img", ["d-block"], undefined, undefined, undefined, checkMedia(media[0]), title);

  return element;
};

/**
 *  Creates a carousel card text container.
 * @param {number} id
 * @param {string} title
 * @param {string} endsAt
 * @param {array} bids
 * @param {string} description
 * @returns   {HTMLObjectElement} - The created element.
 *
 * @example
 * //Example usage:
 * const element = createTextContainer(id, title, endsAt, bids, description);
 */
const createTextContainer = (id, title, endsAt, bids, description) => {
  const element = createElement("div", ["p-4", "content-container", "d-flex", "flex-column", "justify-content-md-center"]);
  const h1 = createElement("h1", undefined, null, trimText(title, 25));
  const paragraph = createElement("p", ["text-dark", "d-none", "d-sm-block"], undefined, trimText(description, 70));
  const paragraph2 = createElement("p", undefined, undefined, `Ends at: ${parseDate(endsAt)}`);
  const span = createElement("span", undefined, undefined);
  if (bids.length > 0) {
    span.textContent = `${findLatestBid(bids).amount} EUR`;
  } else {
    span.textContent = "No bids yet";
  }
  const paragraph3 = createElement("p", undefined, ["Current bid:", span]);

  const link = createElement("a", ["btn", "btn-secondary"], undefined, "View", `./listing/index.html?id=${id}`);

  const container = createElement("div", ["m-auto"], [h1, paragraph, paragraph2, paragraph3, link]);
  element.append(container);
  return element;
};
