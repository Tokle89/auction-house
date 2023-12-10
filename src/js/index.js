import "../scss/styles.scss";
// eslint-disable-next-line no-unused-vars
import * as bootstrap from "bootstrap";
import {
  renderCards,
  renderCarousel,
  renderListing,
  renderProfile,
  renderProfileListings,
} from "./render/render.js";
import * as url from "./api/constant.js";
import { handleRegister } from "./auth/register.js";
import { displayRegisteredMsg } from "./components/userMsgs.js";
import { handleLogin, loginCredentials } from "./auth/login.js";
import { toggleHeaderBtns } from "./utils/toggle.js";
import { handleLogout } from "./auth/logout.js";
import { getQueryParamId } from "./utils/queryParam.js";
import * as storage from "./storage/index.js";
import { toggleProfileListings } from "./utils/toggleProfileListings.js";
import { handleSubmitListing } from "./listing/post.js";
import { renderMediaInput } from "./utils/mediaInput.js";
import { handleEditListing } from "./listing/edit.js";
import { filterBtns } from "./filters/filter.js";
import { handleSearchSubmit } from "./search/handleSearch.js";
import { search } from "./search/search.js";
import { updateCredit } from "./utils/credits/credits.js";

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");
const listingForm = document.getElementById("listing-form");
const mediaBtns = document.querySelectorAll(".media-btn");
const editForm = document.getElementById("edit-listing-form");
const searchForm = document.getElementById("search");

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
  } else if (href.includes("listing")) {
    const id = getQueryParamId("id");
    console.log(id);
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

router();
updateCredit();
toggleHeaderBtns();
searchForm.addEventListener("submit", handleSearchSubmit);
logoutBtn.addEventListener("click", handleLogout);
listingForm.addEventListener("submit", handleSubmitListing);
mediaBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (btn.id == "edit") {
      renderMediaInput("edit-media-input-container");
    } else {
      renderMediaInput("media-input-container");
    }
  }),
);
