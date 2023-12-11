import * as url from "../api/constant.js";
import { toggleBtnClass } from "../utils/toggle.js";
import { renderCards } from "../render/render.js";
import { scrollToListings } from "../utils/scroll.js";
import { apiCall } from "../api/api.js";
import { sortArrayByCreated } from "./latest.js";
import { sortArrayByEnding } from "./ending.js";
import { fetchPopularListings } from "./popular.js";

/**
 *  Adds event listeners to the filter buttons. the event listeners will filter the listings based on the button id. and then render the filtered listings.
 * and then scroll to the listings, and then toggle the button class.
 * @param {array} listingArr
 * @example
 * //Example usage:
 * filterBtns(listingArr);
 */
export const filterBtns = (listingArr) => {
  const filterBtns = document.querySelector(".filter-btn-group");
  const btnsArr = Object.values(filterBtns.children);

  btnsArr.forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = btn.id;
      toggleBtnClass(id, ".filter-btn-group", "current-filter-btn");

      filterListings(listingArr, id);
      setTimeout(() => {
        scrollToListings();
      }, 400);
    });
  });
};

/**
 *  Filters the listings based on the button id, and then renders the filtered listings with the filter functions.
 * @param {array} listingArr
 * @param {id} id
 * @example
 * //Example usage:
 * filterListings(listingArr, id);
 *
 */
const filterListings = async (listingArr, id) => {
  let listings;

  if (!listingArr) {
    listings = await apiCall(url.BASE + url.LISTINGS + url.listingsParams);
  } else {
    listings = listingArr;
  }

  if (id === "latest") {
    const sortedListings = sortArrayByCreated(listings);
    renderCards(undefined, sortedListings);
  } else if (id === "ending") {
    const sortedListings = sortArrayByEnding(listings);
    renderCards(undefined, sortedListings);
  } else if (id === "popular" && !listingArr) {
    const sortedListings = await fetchPopularListings();
    console.log(sortedListings);
    renderCards(undefined, sortedListings);
  } else if (id === "popular" && listingArr) {
    const sortedListings = await fetchPopularListings(listingArr);
    renderCards(undefined, sortedListings);
  }
};
