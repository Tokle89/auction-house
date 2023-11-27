import { apiCall } from "../api/api.js";
import { createListingCard } from "../components/listingCards.js";
import { createCarouselCard } from "../components/carousel.js";

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

export const renderCarousel = (url) => {
  const carouselContainer = document.querySelector(".carousel-inner");
  carouselContainer.innerHTML = "";

  apiCall(url)
    .then((listings) => {
      const highestBids = listings
        .filter(({ bids }) => bids.length > 0)
        .sort((a, b) => b.bids[0].amount - a.bids[0].amount);

      highestBids.forEach((listing, i) => {
        if (i < 3) {
          const carouselCard = createCarouselCard(listing);
          if (listing === highestBids[0]) {
            carouselCard.classList.add("active");
          }
          carouselContainer.append(carouselCard);
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
