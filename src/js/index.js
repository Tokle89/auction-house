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

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");
const listingForm = document.getElementById("listing-form");
const mediaBtns = document.querySelectorAll(".media-btn");
const editForm = document.getElementById("edit-listing-form");

export const router = () => {
  const href = location.href;

  if (href.includes("register")) {
    registerForm.addEventListener("submit", handleRegister);
  } else if (href.includes("login")) {
    displayRegisteredMsg();
    loginForm.addEventListener("submit", handleLogin);
    loginCredentials();
  } else if (href.includes("profile")) {
    let id = getQueryParamId();
    if (!id) {
      id = storage.get("user").name;
    }
    renderProfile(url.BASE + url.PROFILE + `/${id}` + url.profileParams);
    renderProfileListings("listings");

    toggleProfileListings();
  } else if (href.includes("listing")) {
    const id = getQueryParamId();
    renderListing(url.BASE + url.LISTINGS + `/${id}` + url.listingsParams);
    renderCards(url.BASE + url.LISTINGS + url.listingsParams);
    editForm.addEventListener("submit", () => handleEditListing(id));
  } else {
    renderCards(url.BASE + url.LISTINGS + url.listingsParams);
    renderCarousel();
  }
};

router();

toggleHeaderBtns();

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
