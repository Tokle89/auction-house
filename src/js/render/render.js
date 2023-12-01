import { apiCall } from "../api/api.js";
import { createListingCard } from "../components/listingCards.js";
import { createCarouselCard } from "../components/carousel.js";
import { fetchPopularListings } from "../utils/filter.js";
import { createListing } from "../components/listing.js";

export const renderCards = (url) => {
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.innerHTML = "";
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
  console.log(container);
  apiCall(url)
    .then((result) => {
      const listing = createListing(result);
      container.append(listing);
    })
    .catch((error) => {
      console.log(error);
    });
};
