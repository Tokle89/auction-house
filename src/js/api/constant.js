export const BASE = "https://nf-api.onrender.com";
export const LISTINGS = "/api/v1/auction/listings";
export const PROFILE = "/api/v1/auction/profiles";
export const REGISTER = "/api/v1/auction/auth/register";
export const LOGIN = "/api/v1/auction/auth/login";
export const listingsParams =
  "?&_seller=true&_bids=true&_active=true&sort=created&sortOrder=desc";
export const profileParams = "?_listings=true";
