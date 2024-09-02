import { createElement } from "../utils/createElement.js";
import { parseDate } from "../utils/parse.js";
import { checkMedia } from "../utils/media.js";
import { trimText } from "../utils/trimText.js";
import { findLatestBid } from "../utils/bidChecker.js";

/**
 * Creates a listing card.
 * @param {object} param0  - The object containing the listing data.
 * @param {number} param0.id - The id of the listing.
 * @param {string} param0.title - The title of the listing.
 * @param {array} param0.bids - The bids of the listing.
 * @param {string} param0.endsAt - The end date of the listing.
 * @param {array} param0.media - The media of the listing.
 * @param {number} param0.amount - The amount of the listing.
 * @param {number} amount  - The price of the listing.
 * @returns {HTMLDivElement} - The listing card.
 *
 * @example
 * //Example usage:
 * createListingCard({
 * id: 1,
 * title: "test",
 * bids: [
 * {
 * amount: 100,
 * },
 * ],
 * endsAt: "2021-10-10T10:00:00.000Z",
 * media: [
 * {
 * url: "https://via.placeholder.com/150",
 * },
 * ],
 * }, 100);
 * //Returns:
 * <div class="col py-4 d-flex, justify-content-center card-container">
 * <div class="card d-flex flex-column justify-content-center flex-lg-row border border-warning">
 * <div class="img-container">
 * <img src="https://via.placeholder.com/150" alt="test">
 * </div>
 * <div class="card-body d-flex flex-column justify-content-center align-items-center">
 * <div class="m-auto p-3">
 * <h2 class="card-title fs-4">test</h2>
 * <p class="card-text">Ends at: 10/10/2021</p>
 * <p class="card-text">Current bid: 100 EUR</p>
 * <a href="../../../listing/index.html?id=1" class="btn btn-secondary mt-1">View</a>
 * </div>
 * </div>
 * </div>
 * </div>
 *
 *
 */
export const createListingCard = ({ id, title, bids, endsAt, media }, amount) => {
  const element = createElement("div", ["col", "py-4", "d-flex,", "justify-content-center", "card-container"]);
  const image = media ? imgContainer(media, title) : imgContainer([{ url: "https://via.placeholder.com/300x200?text=No+image+available" }], title);
  const cardBodyElement = cardBody(id, title, endsAt, bids, amount);
  const card = createElement("div", ["card", "d-flex", "flex-column", "justify-content-center", "flex-lg-row", "border", "border-warning"], [image, cardBodyElement]);

  element.append(card);

  return element;
};

const imgContainer = (media, title) => {
  const element = createElement("div", ["img-container"]);

  const img = createElement("img", undefined, undefined, undefined, undefined, checkMedia(media[0]), title);
  element.append(img);
  return element;
};

const cardBody = (id, title, endsAt, bids, amount) => {
  const element = createElement("div", ["card-body", "d-flex", "flex-column", "justify-content-center", "align-items-center"]);

  const header = createElement("h2", ["card-title", "fs-4"], undefined, trimText(title, 15));

  const paragraph = createElement("p", ["card-text"], undefined, `Ends at: ${parseDate(endsAt)}`);
  const secondParagraph = createElement("p", ["card-text"], undefined);

  if (bids) {
    if (bids.length > 0) {
      const sum = createElement("span", ["text-danger", "fw-bold"], undefined, `${findLatestBid(bids).amount} EUR`);
      secondParagraph.append(`Current bid: `, sum);
    } else {
      secondParagraph.append("No bids yet");
    }
  } else if (amount) {
    const sum = createElement("span", ["text-danger", "fw-bold"], undefined, `${amount} EUR`);
    secondParagraph.append(`Your bid: `, sum);
  }

  const link = createElement("a", ["btn", "btn-secondary", "mt-1"], undefined, "View", `../../../listing/index.html?id=${id}`);

  const textContainer = createElement("div", ["m-auto", "p-3"], [header, paragraph, secondParagraph, link]);

  element.append(textContainer);
  return element;
};
