import * as url from "../api/constant.js";
import { apiCall } from "../api/api.js";
import * as storage from "../storage/index.js";

/**
 *  Deletes a listing from the backend using the listing id.
 * then redirects the user to the home page.
 * @param {number} id
 * @example
 * //Example usage:
 * deleteListing(id);
 *
 */
export const deleteListing = (id) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  apiCall(url.BASE + url.LISTINGS + `/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storage.get("token")}`,
      "X-Noroff-Api-Key": apiKey,
    },
  })
    .then(() => {
      window.location.href = "../../../index.html";
    })
    .catch((error) => {
      alert.log(error);
    });
};
