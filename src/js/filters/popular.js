import { apiCall } from "../api/api.js";
import * as url from "../api/constant.js";

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

const sortListingsByBids = (listings) => {
  const sortedListings = listings.filter(({ bids }) => bids.length > 0);

  return sortedListings;
};
