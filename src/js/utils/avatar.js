import { apiCall } from "../api/api.js";
import * as storage from "../storage/index.js";
import * as url from "../api/constant.js";

/**
 * Handles the avatar edit form.
 * @returns {void}
 * @example
 * //Example usage:
 * handleAvatarEdit();
 */
export const handleAvatarEdit = () => {
  event.preventDefault();
  const [media] = event.target.elements;
  sendAvatar(media.value);
};

/**
 * Takes the media url from the handle function and sends it to the api, then saves the user data to local storage and reloads the page.
 * Alerts the user if there is an error.
 * @param {url} media
 * @returns {void}
 * @example
 * //Example usage:
 * sendAvatar("https://via.placeholder.com/150");
 */
const sendAvatar = async (media) => {
  const { name } = storage.get("user");
  const token = storage.get("token");
  const fetchOptions = {
    method: "Put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ avatar: media }),
  };

  try {
    const result = await apiCall(
      url.BASE + url.PROFILE + `/${name}/media`,
      fetchOptions,
    );
    if (result.errors) {
      alert(result.errors[0].message);
    } else {
      storage.save("user", result);
      window.location.reload();
    }
  } catch (error) {
    alert(`Ooops there been an error${error}`);
  }
};
