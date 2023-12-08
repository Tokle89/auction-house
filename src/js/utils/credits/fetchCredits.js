import * as storage from "../../storage/index.js";
import * as url from "../../api/constant.js";
import { apiCall } from "../../api/api.js";

export const fetchCredits = (name) => {
  const fetchOptions = {
    method: "GET",
    headers: {
      application: "application/json",
      Authorization: `Bearer ${storage.get("token")}`,
    },
  };

  apiCall(
    url.BASE + url.PROFILE + `/${name}` + url.profileParams,
    fetchOptions,
  ).then(({ credits }) => {
    return credits;
  });
};
