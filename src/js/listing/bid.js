import { apiCall } from "../api/api.js";
import * as url from "../api/constant.js";
import * as storage from "../storage/index.js";
import { updateCredit } from "../utils/credits/credits.js";

/**
 *  Adds an event listener to the bid form, and calls the handleBid function when the form is submitted.
 * and sends the form data to the sendBid function.
 * @param {number} id
 * @example
 * //Example usage:
 * bidForm(id);
 */
export const handleBid = (id) => {
  event.preventDefault();
  const [amount] = event.target.elements;

  sendBid(id, Number(amount.value));
};

/**
 *  Sends the  listing bid to the backend, and redirects the user to the listing page.
 * updates the user credits, and shows an alert if the bid is invalid.
 * @param {number} id
 * @param {number} amount
 * @example
 * //Example usage:
 * sendBid(id, amount);
 */
const sendBid = (id, amount) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storage.get("token")}`,
    },
    body: JSON.stringify({
      amount: amount,
    }),
  };
  apiCall(url.BASE + url.LISTINGS + `/${id}/bids`, fetchOptions).then(
    (result) => {
      if (result.errors) {
        alert(result.errors[0].message);
      } else {
        updateCredit();
        setTimeout(() => {
          window.location.replace(`../../../listing/?id=${result.id}`);
        }, 400);
      }
    },
  );
};
