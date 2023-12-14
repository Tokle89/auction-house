import {
  renderCards,
  renderCarousel,
  renderListing,
  renderProfile,
  renderProfileListings,
} from "../render/render.js";
import * as url from "../api/constant.js";
import { handleRegister } from "../auth/register.js";
import { displayRegisteredMsg } from "../components/userMsgs.js";
import { handleLogin, loginCredentials } from "../auth/login.js";
import { getQueryParamId } from "../utils/queryParam.js";
import * as storage from "../storage/index.js";
import { toggleProfileListings } from "../utils/toggleProfileListings.js";
import { handleEditListing } from "../listing/edit.js";
import { filterBtns } from "../filters/filter.js";
import { search } from "../search/search.js";
import { handleAvatarEdit } from "../utils/avatar.js";
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const editForm = document.getElementById("edit-listing-form");
const avatarForm = document.getElementById("avatar-form");

/**
 * Handles the routing depending on the url, and calls the appropriate functions.
 * @returns {void}
 * @example
 * //Example usage:
 * router();
 *
 */
export const router = () => {
  const href = location.href;

  if (href.includes("register")) {
    registerForm.addEventListener("submit", handleRegister);
  } else if (href.includes("login")) {
    displayRegisteredMsg();
    loginForm.addEventListener("submit", handleLogin);
    loginCredentials();
  } else if (href.includes("profile")) {
    let id = getQueryParamId("id");
    if (!id) {
      id = storage.get("user").name;
    }
    renderProfile(url.BASE + url.PROFILE + `/${id}` + url.profileParams);
    renderProfileListings("listings");
    toggleProfileListings();
    avatarForm.addEventListener("submit", handleAvatarEdit);
  } else if (href.includes("listing")) {
    const id = getQueryParamId("id");
    renderListing(url.BASE + url.LISTINGS + `/${id}` + url.listingsParams);
    renderCards(url.BASE + url.LISTINGS + url.listingsParams);
    editForm.addEventListener("submit", () => handleEditListing(id));
    filterBtns();
  } else if (href.includes("query")) {
    const carousel = document.getElementById("carouselExampleDark");
    carousel.remove();
    let query = getQueryParamId("query");
    search(query);
  } else {
    renderCards(url.BASE + url.LISTINGS + url.listingsParams);
    renderCarousel();
    filterBtns();
  }
};
