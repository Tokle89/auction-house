import * as storage from "../../storage/index.js";
import * as url from "../../api/constant.js";
import { apiCall } from "../../api/api.js";

export const fetchCredits = async (name) => {
  const fetchOptions = {
    method: "GET",
    headers: {
      application: "application/json",
      Authorization: `Bearer ${storage.get("token")}`,
    },
  };

  try {
    const { credits } = await apiCall(
      url.BASE + url.PROFILE + `/${name}`,
      fetchOptions,
    );

    return credits;
  } catch (error) {
    console.log(error);
  }
};
