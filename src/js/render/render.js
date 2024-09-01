import { apiCall } from "../api/api.js";
import { createListingCard } from "../components/listingCards.js";
import { createCarouselCard } from "../components/carousel.js";
import { fetchPopularListings } from "../filters/popular.js";
import { createListing } from "../components/listing.js";
import { countDown } from "../utils/countDownTimer.js";
import * as storage from "../storage/index.js";
import { createProfile } from "../components/profile.js";
import { getQueryParamId } from "../utils/queryParam.js";
import * as url from "../api/constant.js";
import { createMsg } from "../components/listingMsg.js";
import { createEditModalContent } from "../components/editModal.js";
import { scrollToListings } from "../utils/scroll.js";
import { createViewMoreBtn } from "../components/viewMoreBtn.js";

/**
 *  Renders listing cards to the DOM, and adds a view more button. if data is provided, it will render the data instead of fetching it from the API.
 * if index is greater than 9, the listing card will be hidden.
 * Uses timeout to make sure the view more button is appended after the listings.
 * @param {url} url
 * @param {array} data
 * @example
 * //Example usage:
 * renderCards(url);
 * renderCards(url, data);
 *
 */
export const renderCards = (url, data) => {
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.innerHTML = "";

  if (!data) {
    apiCall(url)
      .then((result) => {
        if (result.errors) {
          alert(result.errors[0].message);
        }

        result.data.forEach((listing, i) => {
          const listingCard = createListingCard(listing);

          if (i > 9) {
            listingCard.classList.add("d-none");
          }
          cardsContainer.append(listingCard);
        });
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    data.forEach((listing, i) => {
      const listingCard = createListingCard(listing);
      if (i > 9) {
        listingCard.classList.add("d-none");
      }
      cardsContainer.append(listingCard);
      scrollToListings();
    });
  }

  setTimeout(() => {
    const btn = createViewMoreBtn(cardsContainer.children);
    cardsContainer.append(btn);
  }, 500);
};

/**
 * Fetches the popular listings, and renders the three most popular listings to the carousel.
 * @example
 * //Example usage:
 * renderCarousel();
 */
export const renderCarousel = () => {
  const carouselContainer = document.querySelector(".carousel-inner");
  carouselContainer.innerHTML = "";
  fetchPopularListings().then((popularListings) => {
    popularListings.forEach((listing, i) => {
      if (i < 3) {
        const carouselCard = createCarouselCard(listing);
        if (listing === popularListings[0]) {
          carouselCard.classList.add("active");
        }
        carouselContainer.append(carouselCard);
      }
    });
  });
};

/**
 *  Renders a single listing to the DOM. Then calls the countDown function to start the countdown timer.
 * Renders the edit modal content.
 * @param {url} url
 * @example
 * //Example usage:
 * renderListing(url);
 */
export const renderListing = (url) => {
  const container = document.querySelector(".listing-section");
  apiCall(url)
    .then((result) => {
      if (result.errors) {
        alert(result.errors[0].message);
      }
      const listing = createListing(result.data);
      container.append(listing);

      const date = result.data.endsAt;
      countDown(date);
      createEditModalContent(result);
    })

    .catch((error) => {
      console.log(error);
    });
};
/**
 *  Renders a profile to the DOM.
 * @param {url} profileUrl
 * @example
 * //Example usage:
 * renderProfile(profileUrl);
 */
export const renderProfile = (profileUrl) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const profileContainer = document.querySelector(".profile-section");
  profileContainer.innerHTML = "";
  const fetchOptions = {
    method: "GET",
    headers: {
      application: "application/json",
      Authorization: `Bearer ${storage.get("token")}`,
      "X-Noroff-Api-Key": apiKey,
    },
  };

  apiCall(profileUrl, fetchOptions)
    .then((result) => {
      if (result.errors) {
        alert(result.errors[0].message);
      }
      console.log(result);
      const profile = createProfile(result.data);
      profileContainer.append(profile);
    })

    .catch((error) => {
      alert(error);
    });
};

/**
 *  Renders listings belonging to a profile to the DOM.
 * It uses the getQueryParamId function to get the id from the query parameter.
 * If there is no id, it will use the name from the storage.
 * It uses the value parameter to determine which listings to fetch, if  value is "bids" it will fetch the bids, if value is "wins" it will fetch the wins, otherwise it will fetch the listings.
 * Values are triggered by the filter buttons on the profile page.
 * @param {string} value
 * @example
 * //Example usage:
 * renderProfileListings(value);
 */
export const renderProfileListings = (value) => {
  let id = getQueryParamId("id");
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!id) {
    id = storage.get("user").name;
  }

  let newUrl = url.BASE + url.PROFILE + `/${id}` + "/listings" + "?&_seller=true&_bids=true&sort=created&sortOrder=desc";

  const container = document.querySelector(".cards-container");
  container.classList.add("row-cols-sm-2");
  container.innerHTML = "";

  const fetchOptions = {
    method: "GET",
    headers: {
      application: "application/json",
      Authorization: `Bearer ${storage.get("token")}`,
      "X-Noroff-Api-Key": apiKey,
    },
  };

  if (value === "bids") {
    newUrl = url.BASE + url.PROFILE + `/${id}` + "/bids" + url.profileParams;
    apiCall(newUrl, fetchOptions)
      .then((result) => {
        if (result.errors) {
          alert(result.errors[0].message);
        }
        const bids = result.data;
        if (bids.length > 0) {
          bids.forEach(({ listing, amount }) => {
            const listingCard = createListingCard(listing, amount);
            container.append(listingCard);
          });
        } else {
          createMsg("You have not bid on any listings yet");
        }
      })
      .catch((error) => {
        alert(error);
      });
  } else if (value === "wins") {
    newUrl = url.BASE + url.PROFILE + `/${id}` + url.profileParams;
    apiCall(newUrl, fetchOptions)
      .then((result) => {
        const { wins } = result.data;
        if (wins && wins.length > 0) {
          wins.forEach((listing) => {
            apiCall(url.BASE + url.LISTINGS + `/${listing}` + url.listingsParams).then((result) => {
              const listingCard = createListingCard(result);
              container.append(listingCard);
            });
          });
        } else {
          createMsg("You have not any wins yet");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    apiCall(newUrl, fetchOptions)
      .then((result) => {
        if (result.errors) {
          alert(result.errors[0].message);
        }
        if (result.data.length > 0) {
          result.data.forEach((listing) => {
            const listingCard = createListingCard(listing);
            container.append(listingCard);
          });
        } else {
          createMsg("You have not posted any listings yet");
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
};
