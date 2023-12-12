import "../scss/styles.scss";
// eslint-disable-next-line no-unused-vars
import * as bootstrap from "bootstrap";
import { toggleBtns } from "./utils/toggle.js";
import { handleLogout } from "./auth/logout.js";
import { renderMediaInput } from "./utils/mediaInput.js";
import { handleSearchSubmit } from "./search/handleSearch.js";
import { updateCredit } from "./utils/credits/credits.js";
import { router } from "./router/router.js";

const logoutBtn = document.getElementById("logout-btn");
const mediaBtns = document.querySelectorAll(".media-btn");
const searchForm = document.getElementById("search");

router();
updateCredit();
toggleBtns();

searchForm.addEventListener("submit", handleSearchSubmit);
logoutBtn.addEventListener("click", handleLogout);

mediaBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (btn.id == "edit") {
      renderMediaInput("edit-media-input-container");
    } else {
      renderMediaInput("media-input-container");
    }
  }),
);
