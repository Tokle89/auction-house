import "../scss/styles.scss";

// eslint-disable-next-line no-unused-vars
import * as bootstrap from "bootstrap";

export const API_BASE_URL = "https://nf-api.onrender.com";
export const API_LISTINGS_URL = "/api/v1/auction/listings";
export const API_PROFILE_URL = "/api/v1/auction/profiles";
export const API_REGISTER_URL = "/api/v1/auction/auth/register";
export const API_LOGIN_URL = "/api/v1/auction/auth/login";
export const listingsParams =
  "?&_seller=true&_bids=true&_active=true&sort=created&sortOrder=desc";
export const profileParams = "?_listings=true";

import { createListingCard } from "./components/listingCards.js";

const apiCall = async () => {
  try {
    const response = await fetch(
      API_BASE_URL + API_LISTINGS_URL + listingsParams,
    );
    const result = await response.json();
    console.log(result);

    if (result.title !== "tester") {
      renderLinstings(result);
    }
  } catch (error) {
    console.log(error);
  }
};

apiCall();

const renderLinstings = (listings) => {
  listings.forEach((listing) => {
    createListingCard(listing);
  });
};
