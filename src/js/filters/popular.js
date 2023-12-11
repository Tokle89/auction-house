import { apiCall } from "../api/api.js";
import * as url from "../api/constant.js";

/**
 *  Fetches the popular listings, and sorts them by the amount of bids they have. as the listings are fetched in batches of 100, the function will fetch listings until it has 50 listings with bids.
 * if the function is called with an array, it will sort the array by the amount of bids the listings have.
 * @param {array} array
 * @returns  {array} - The sorted array.
 * @example
 * //Example usage:
 * fetchPopularListings(array);
 */

export const fetchPopularListings = async (array) => {
  const ListingsArr = [];

  let offset = 0;

  if (!array) {
    while (ListingsArr.length < 50) {
      const listings = await apiCall(
        url.BASE + url.LISTINGS + url.listingsParams + `&offset=${offset}`,
      );

      const sortedListings = sortListingsByBids(listings);
      ListingsArr.push(...sortedListings);

      offset += 100;
    }
  } else {
    const sortedListings = sortListingsByBids(array);
    ListingsArr.push(...sortedListings);
  }

  const PopularListings = ListingsArr.sort(
    (a, b) => b.bids.length - a.bids.length,
  );
  return PopularListings;
};

/**
 *  Filters the listings, and returns an array with listings that have bids.
 * @param {array} listings
 * @returns  {array} - The sorted array.
 * @example
 * //Example usage:
 * sortListingsByBids(listings);
 */
const sortListingsByBids = (listings) => {
  const sortedListings = listings.filter(({ bids }) => bids.length > 0);

  return sortedListings;
};
