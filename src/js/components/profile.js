import * as storage from "../storage/index.js";
import { createElement } from "../utils/createElement.js";
import { handleLogout } from "../auth/logout.js";

/**
 * Creates a profile button, with the user avatar.
 * if the user has no avatar, the default image is used.
 * @returns {HTMLButtonElement} - The profile button.
 * @example
 * //Example usage:
 * createProfileBtnImg();
 *
 */

export const createProfileBtnImg = () => {
  const user = storage.get("user");
  const img = document.getElementById("profile-btn-img");

  const { name, avatar } = user;
  img.src = "../../../images/profile.jpg";
  if (avatar) {
    img.src = avatar;
    img.alt = name;
  }
};

/**
 * Creates a user profile with the given data. If the user is the logged in user, the credits are shown instead of the listings count.
 * @param {object} param0
 * @param {string} param0.name - The name of the user.
 * @param {string} param0.email - The email of the user.
 * @param {object} param0._count - The count of listings the user has.
 * @param {number} param0.credits - The credits the user has.
 * @param {Url} param0.avatar - The avatar of the user.
 * @returns {HTMLDivElement} - The profile.
 *
 * @example
 * //Example usage:
 * createProfile({
 * name: "test",
 * email: "test@email.com",
 * _count: { listings: 1 },
 * credits: 100,
 * avatar: "https://via.placeholder.com/150",
 * });
 * //Returns:
 * <div class="profile-info container d-flex align-items-center justify-content-center">
 * <img src="https://via.placeholder.com/150" alt="test" class="profile-avatar rounded-circle">
 * <div class="ps-4">
 * <h1 class="fs-4 fw-bold mb-0 text-capitalize">test</h1>
 * <p class="text-dark">test</p>
 * <p class="fw-bold text-secondary mb-0">Listings: 1</p>
 * </div>
 * </div>
 *
 *
 */

export const createProfile = ({ name, email, _count, credits, avatar }) => {
  const element = createElement("div", [
    "profile-info",
    "container",
    "d-flex",
    "align-items-center",
    "justify-content-center",
  ]);
  const img = createElement(
    "img",
    ["profile-avatar", "rounded-circle"],
    undefined,
    undefined,
    undefined,
    avatar,
    name,
  );
  const h1 = createElement(
    "h1",
    ["fs-4", "fw-bold", "mb-0", "text-capitalize"],
    undefined,
    name,
  );
  const p = createElement("p", ["text-dark"], undefined, email);
  const secondP = createElement(
    "p",
    ["fw-bold", "text-secondary", "mb-0"],
    undefined,
    `Listings: ${_count.listings}`,
  );
  const div = createElement("div", ["ps-4"], [h1, p, secondP]);
  const editBtn = createDropDownBtn();
  element.append(img, div, editBtn);

  console.log(_count.listings);

  if (name === storage.get("user").name) {
    secondP.innerText = `Credits: ${credits}`;
  }

  return element;
};

/**
 *  Creates a dropdown button with the logout and edit profile buttons.
 * @returns {HTMLDivElement} - The dropdown button.
 * @example
 * //Example usage:
 * createDropDownBtn();
 * //Returns:
 * <div class="dropdown align-self-start">
 * <button class="listing-modal_btn edit-btn ms-2" data-bs-toggle="dropdown" data-bs-target="#dropdownMenu">
 * <i class="bi bi-gear pb-4"></i>
 * </button>
 * <ul class="dropdown-menu dropdown-menu-start text-secondary border border-warning" id="dropdownMenu">
 * <li>
 * <button class="dropdown-item listing-modal_btn text-link ps-1 py-2">Logout</button>
 * </li>
 * <li>
 * <hr class="dropdown-divider">
 * </li>
 * <li>
 * <button class="dropdown-item listing-modal_btn text-link ps-1 py-2">Edit Profile</button>
 * </li>
 * </ul>
 * </div>
 */
const createDropDownBtn = () => {
  const element = createElement("div", ["dropdown", "align-self-start"]);
  const icon = createElement("i", ["bi", "bi-gear", "pb-4"]);
  const btn = createElement(
    "button",
    ["listing-modal_btn", "edit-btn", "ms-2"],
    [icon],
  );
  btn.dataset.bsToggle = "dropdown";
  btn.dataset.bsTarget = "#dropdownMenu";

  const logoutBtn = createElement(
    "button",
    ["dropdown-item", "listing-modal_btn", "text-link", "ps-1", "py-2"],
    undefined,
    "Sign out",
  );
  logoutBtn.addEventListener("click", handleLogout);

  const li = createElement("li", undefined, [logoutBtn]);
  const hr = createElement("hr", ["dropdown-divider"]);
  const li2 = createElement("li", undefined, [hr]);

  const editBtn = createElement(
    "button",
    ["dropdown-item", "listing-modal_btn", "text-link", "ps-1", "py-2"],
    undefined,
    "Edit Profile",
  );
  editBtn.dataset.bsToggle = "modal";
  editBtn.dataset.bsTarget = "#edit-avatar-modal";

  const li3 = createElement("li", undefined, [editBtn]);
  const ul = createElement(
    "ul",
    [
      "dropdown-menu",
      "dropdown-menu-start",
      "text-secondary",
      "border",
      "border-warning",
    ],
    [li, li2, li3],
  );
  ul.id = "dropdownMenu";

  element.append(btn, ul);
  return element;
};
