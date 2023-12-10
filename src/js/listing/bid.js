import { apiCall } from "../api/api.js";
import * as url from "../api/constant.js";
import * as storage from "../storage/index.js";

export const handleBid = (id) => {
  event.preventDefault();
  const [amount] = event.target.elements;

  sendBid(id, Number(amount.value));
};

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
        window.location.replace(`../../../listing/?id=${result.id}`);
      }
    },
  );
};
