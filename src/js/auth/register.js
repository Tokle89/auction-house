import { apiCall } from "../api/api.js";
import * as url from "../api/constant.js";

export const handleRegister = () => {
  event.preventDefault();

  const [username, email, password, avatar] = event.target.elements;

  registerUser(username, email, password, avatar);
};

const registerUser = (username, email, password, avatar) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: username.value,
      email: email.value,
      password: password.value,
      avatar: avatar.value,
    }),
  };

  apiCall(url.BASE + url.REGISTER, fetchOptions)
    .then((result) => {
      console.log(result);
    })
    .then(() => {
      window.location.replace("../../../auth/login/?registration=true");
    })
    .catch((error) => {
      console.log(error);
    });
};
