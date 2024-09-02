import { apiCall } from "../api/api.js";
import * as url from "../api/constant.js";
import * as storage from "../storage/index.js";

/**
 * Handles the login form submission.
 */
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

/**
 * Checks if the user has previously checked the "Remember me" checkbox
 * and if so, fills in the login form with the saved credentials.
 */
export const loginCredentials = () => {
  const loginCred = storage.get("loginCred");

  if (loginCred) {
    const [email, password] = document.querySelectorAll("#login-form input");
    email.value = loginCred.email;
    password.value = loginCred.password;
  }
};

/**
 *  Makes an API call to the given URL with the given options and returns the result as a JSON object.
 * And saves the token and user data in the local storage.
 * Redirects the user to the profile page.
 *
 * If there are errors, an alert is shown to the user  with the error message.
 *
 * @param {HTMLInputElement} email - The email input field.
 * @param {HTMLInputElement} password - The password input field.
 *
 * @example
 * //Example usage:
 * const fetchOptions = {
 * method: "POST",
 * headers: {
 * "Content-Type": "application/json",
 * },
 * body: JSON.stringify({ email: email.value, password: password.value }),
 * };
 *
 * loginUser(email, password)
 */
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
      let { accessToken, name, email, avatar } = result.data;
      storage.save("user", {
        name: name,
        email: email,
        avatar: avatar,
      });

      storage.save("token", accessToken);

      window.location.replace("../../../profile/");
    }
  });
};
