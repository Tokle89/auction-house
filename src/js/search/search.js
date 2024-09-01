import { apiCall } from "../api/api.js";
import * as url from "../api/constant.js";
import { renderCards } from "../render/render.js";
import { renderSearchMsg } from "./searchMsg.js";
import { filterBtns } from "../filters/filter.js";

/**
 *  Makes an API call to the given URL with the given options.
 *  Searches for listings with the given value, and pushes the listings that match the value to an array,
 *  and send the array to renderCards() and filterBtns().
 *  If there are no listings, renderSearchMsg() is called.
 * @param {string} value
 * @return {void}
 * @example
 * //Example usage:
 * search("bike");
 */
export const search = async (value) => {
  const listingArr = [];
  let offset = 0;

  while (listingArr.length < 50 && offset < 500) {
    const response = await apiCall(url.BASE + url.LISTINGS + url.listingsParams + `&offset=${offset}`);
    const listings = response.data;
    const filteredListings = listings.filter(({ title, description }) => {
      let desc = "";
      if (description) {
        const stringifiedDesc = JSON.stringify(description);
        desc = stringifiedDesc.toLocaleLowerCase();
      }
      return title.toLowerCase().includes(value.toLowerCase()) || desc.includes(value.toLowerCase());
    });

    listingArr.push(...filteredListings);
    offset += 100;
  }

  if (listingArr.length === 0) {
    renderSearchMsg();
  } else {
    renderCards(undefined, listingArr);
    filterBtns(listingArr);
  }
};
