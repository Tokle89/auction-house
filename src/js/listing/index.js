import * as storage from "../storage/index.js";
import * as url from "../api/constant.js";
import { apiCall } from "../api/api.js";

/**
 *  Sends a listing to the backend, and redirects the user to the listing page. Handles both the create and edit listing forms.
 *  shows an alert to the user if something goes wrong.
 * @param {string} method
 * @param {number} id
 * @param {string} title
 * @param {string} description
 * @param {Array} tags
 * @param {string} endsAt
 * @param {Array} media
 * @example
 * //Example usage:
 * sendListing(method, id, title, description, tags, endsAt, media);
 */

export const sendListing = (
  method,
  id,
  title,
  description,
  tags,
  endsAt,
  media,
) => {
  try {
    const fetchOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storage.get("token")}`,
      },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        endsAt: endsAt,
        tags: tags,
        media: media,
      }),
    };
    let newUrl = url.BASE + url.LISTINGS;

    if (id) {
      newUrl = url.BASE + url.LISTINGS + `/${id}`;
    }

    apiCall(newUrl, fetchOptions).then((result) => {
      console.log(result);
      if (result.errors) {
        alert(result.errors[0].message);
      } else {
        window.location.replace(`../../../listing/?id=${result.id}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
