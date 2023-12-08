import { apiCall } from "../api/api.js";
import * as url from "../api/constant.js";
import { toggleBtnClass } from "./toggle.js";
import { renderCards } from "../render/render.js";
import { scrollToListings } from "./scroll.js";

export const fetchPopularListings = async () => {
  const ListingsArr = [];

  let offset = 0;

  while (ListingsArr.length < 50) {
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

const sortListingsByBids = (listings) => {
  const sortedListings = listings.filter(({ bids }) => bids.length > 0);

  return sortedListings;
};

const filterBtns = document.querySelector(".filter-btn-group");
const btnsArr = Object.values(filterBtns.children);
btnsArr.forEach((btn) => {
  btn.addEventListener("click", () => {
    let id = btn.id;
    toggleBtnClass(id, ".filter-btn-group", "current-filter-btn");

    if (id === "latest") {
      renderCards(url.BASE + url.LISTINGS + url.listingsParams);
    } else if (id === "ending") {
      renderCards(
        url.BASE +
          url.LISTINGS +
          `?&_seller=true&_bids=true&_active=true&sort=endsAt&sortOrder=asc`,
      );
    } else if (id === "popular") {
      fetchPopularListings().then((listings) =>
        renderCards(undefined, listings),
      );
    }

    setTimeout(() => {
      scrollToListings();
    }, 300);
  });
});
