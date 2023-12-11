import { apiCall } from "../api/api.js";
import * as url from "../api/constant.js";

/**
 * Handles the registration of a new user, and sends the form data to registerUser().
 * @param {object} event - The event object.
 * @param {HTMLInputElement} event.target.elements - The form elements.
 *
 */
export const handleRegister = () => {
  event.preventDefault();

  const [username, email, password, avatar] = event.target.elements;

  registerUser(username, email, password, avatar);
};

/**
 * takes the form data and makes an API call to the given URL with the given options.
 * Registers the user, and redirects the user to the login page.
 * If there are errors, an alert is shown to the user with the error message.
 * @param {HTMLInputElement} username - The username input field.
 * @param {HTMLInputElement} email - The email input field.
 * @param {HTMLInputElement} password - The password input field.
 * @param {HTMLInputElement} avatar - The avatar input field.
 *
 * @example
 * //Example usage:
 * const fetchOptions = {
 * method: "POST",
 * headers: {
 * "Content-Type": "application/json",
 * },
 * body: JSON.stringify({
 * name: username.value,
 * email: email.value,
 *  password: password.value,
 * avatar: avatar.value,
 * }),
 * };
 * registerUser(username, email, password, avatar)
 */
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
      if (result.errors) {
        alert(result.errors[0].message);
      } else {
        window.location.replace("../../../auth/login/?registration=true");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
