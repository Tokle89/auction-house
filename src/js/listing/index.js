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

export const sendListing = (method, id, title, description, tags, endsAt, media) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  try {
    const fetchOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storage.get("token")}`,
        "X-Noroff-Api-Key": apiKey,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        endsAt: endsAt.toISOString(),
        tags: tags,
        media: media,
      }),
    };

    let newUrl = url.BASE + url.LISTINGS;
    if (id) {
      newUrl = url.BASE + url.LISTINGS + `/${id}`;
    }

    apiCall(newUrl, fetchOptions).then((result) => {
      if (result.errors) {
        alert(result.errors[0].message);
      } else {
        window.location.replace(`../../../listing/?id=${result.data.id}`);
        return result;
      }
    });
  } catch (error) {
    console.log(error);
  }
};
