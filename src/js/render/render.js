import { apiCall } from "../api/api.js";
import { createListingCard } from "../components/listingCards.js";
import { createCarouselCard } from "../components/carousel.js";
import { fetchPopularListings } from "../filters/popular.js";
import { createListing } from "../components/listing.js";
import { countDown } from "../utils/countdown.js";
import * as storage from "../storage/index.js";
import { createProfile } from "../components/profile.js";
import { getQueryParamId } from "../utils/queryParam.js";
import * as url from "../api/constant.js";
import { createMsg } from "../components/listingMsg.js";
import { createEditModalContent } from "../components/editModal.js";
import { scrollToListings } from "../utils/scroll.js";

export const renderCards = (url, data) => {
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.innerHTML = "";

  if (!data) {
    apiCall(url)
      .then((result) => {
        result.forEach((listing) => {
          const listingCard = createListingCard(listing);
          cardsContainer.append(listingCard);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    data.forEach((listing) => {
      const listingCard = createListingCard(listing);
      cardsContainer.append(listingCard);
      scrollToListings();
    });
  }
};

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

export const renderListing = (url) => {
  const container = document.querySelector(".listing-section");
  apiCall(url)
    .then((result) => {
      const listing = createListing(result);
      container.append(listing);

      const date = result.endsAt;
      countDown(date);
      createEditModalContent(result);
    })

    .catch((error) => {
      console.log(error);
    });
};

export const renderProfile = (profileUrl) => {
  const profileContainer = document.querySelector(".profile-section");
  profileContainer.innerHTML = "";
  const fetchOptions = {
    method: "GET",
    headers: {
      application: "application/json",
      Authorization: `Bearer ${storage.get("token")}`,
    },
  };

  apiCall(profileUrl, fetchOptions)
    .then((result) => {
      console.log(result);
      const profile = createProfile(result);
      profileContainer.append(profile);
    })

    .catch((error) => {
      console.log(error);
    });
};

export const renderProfileListings = (value) => {
  let id = getQueryParamId("id");
  if (!id) {
    id = storage.get("user").name;
  }

  let newUrl =
    url.BASE +
    url.PROFILE +
    `/${id}` +
    "/listings" +
    "?&_seller=true&_bids=true&sort=created&sortOrder=desc";

  const container = document.querySelector(".cards-container");
  container.classList.add("row-cols-sm-2");
  container.innerHTML = "";

  const fetchOptions = {
    method: "GET",
    headers: {
      application: "application/json",
      Authorization: `Bearer ${storage.get("token")}`,
    },
  };

  if (value === "bids") {
    newUrl = url.BASE + url.PROFILE + `/${id}` + "/bids" + url.profileParams;
    apiCall(newUrl, fetchOptions)
      .then((result) => {
        if (result.length > 0) {
          result.forEach(({ listing, amount }) => {
            const listingCard = createListingCard(listing, amount);
            container.append(listingCard);
          });
        } else {
          createMsg("You have not bid on any listings yet");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (value === "wins") {
    newUrl = url.BASE + url.PROFILE + `/${id}` + url.profileParams;
    apiCall(newUrl, fetchOptions)
      .then(({ wins }) => {
        console.log(wins);
        if (wins.length > 0) {
          wins.forEach((listing) => {
            apiCall(
              url.BASE + url.LISTINGS + `/${listing}` + url.listingsParams,
            ).then((result) => {
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
        if (result.length > 0) {
          result.forEach((listing) => {
            const listingCard = createListingCard(listing);
            container.append(listingCard);
          });
        } else {
          createMsg("You have not posted any listings yet");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
