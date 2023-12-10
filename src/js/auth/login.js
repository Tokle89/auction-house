import { apiCall } from "../api/api.js";
import * as url from "../api/constant.js";
import * as storage from "../storage/index.js";

export const handleLogin = () => {
  event.preventDefault();

  const [email, password, checkbox] = event.target.elements;

  if (checkbox.checked) {
    storage.save("loginCred", {
      email: email.value,
      password: password.value,
    });
  }

  loginUser(email, password);
};

export const loginCredentials = () => {
  const loginCred = storage.get("loginCred");

  if (loginCred) {
    const [email, password] = document.querySelectorAll("#login-form input");
    email.value = loginCred.email;
    password.value = loginCred.password;
  }
};

const loginUser = (email, password) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.value, password: password.value }),
  };

  apiCall(url.BASE + url.LOGIN, fetchOptions).then((result) => {
    if (result.errors) {
      console.log(result.errors[0]);
      alert(result.errors[0].message);
    } else {
      let { accessToken, name, email, avatar, credits } = result;
      storage.save("token", accessToken);
      storage.save("user", {
        name: name,
        email: email,
        avatar: avatar,
        credit: credits,
      });
      window.location.replace("../../../profile/");
    }
  });
};
