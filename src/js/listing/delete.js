import * as url from "../api/constant.js";
import { apiCall } from "../api/api.js";
import * as storage from "../storage/index.js";

export const deleteListing = (id) => {
  apiCall(url.BASE + url.LISTINGS + `/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storage.get("token")}`,
    },
  })
    .then(() => {
      window.location.href = "../../../index.html";
    })
    .catch((error) => {
      console.log(error);
    });
};
