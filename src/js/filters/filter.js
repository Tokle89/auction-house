import * as url from "../api/constant.js";
import { toggleBtnClass } from "../utils/toggle.js";
import { renderCards } from "../render/render.js";
import { scrollToListings } from "../utils/scroll.js";
import { apiCall } from "../api/api.js";
import { sortArrayByCreated } from "./latest.js";
import { sortArrayByEnding } from "./ending.js";
import { fetchPopularListings } from "./popular.js";

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
  } else if (id === "popular") {
    const sortedListings = await fetchPopularListings(listings);
    renderCards(undefined, sortedListings);
  }
};
