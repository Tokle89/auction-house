import "../scss/styles.scss";
// eslint-disable-next-line no-unused-vars
import * as bootstrap from "bootstrap";
import { renderCards } from "./render/render.js";
import { renderCarousel } from "./render/render.js";
import { apiCall } from "./api/api.js";
import * as url from "./api/constant.js";

renderCards(url.BASE + url.LISTINGS + url.listingsParams);
renderCarousel(url.BASE + url.LISTINGS + url.listingsParams);

export const fetchPopularListings = async () => {
  const ListingsArr = [];

  let offset = 0;

  while (ListingsArr.length < 30) {
    const listings = await apiCall(
      url.BASE + url.LISTINGS + url.listingsParams + `&offset=${offset}`,
    );

    const sortedListings = sortListingsByBids(listings);
    ListingsArr.push(...sortedListings);

    offset += 100;
  }

  const PopularListings = ListingsArr.sort(
    (a, b) => b.bids.length - a.bids.length,
  );
  return PopularListings;
};

fetchPopularListings();

const sortListingsByBids = (listings) => {
  const sortedListings = listings.filter(({ bids }) => bids.length > 0);

  return sortedListings;
};
