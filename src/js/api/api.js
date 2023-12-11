/**
 * Makes an API call to the given URL with the given options
 * and returns the result as a JSON object.
 * @param {string} url - The URL to make the API call to.
 * @param {object | null} fetchOptions - The options to pass to the fetch call.
 * @returns {Promise<object>} - The result of the API call as a JSON object.
 *
 * @example
 * //Example usage:
 * const fetchOptions = {
 *  method: "POST",
 * headers: {
 * "Content-Type": "application/json",
 * },
 * body: JSON.stringify({ email: email.value, password: password.value }),
 * };
 *
 * apiCall(url.BASE + url.LOGIN, fetchOptions)
 */
export const apiCall = (url, fetchOptions) =>
  fetch(url, fetchOptions)
    .then((response) => {
      const result = response.json();
      return result;
    })
    .catch((error) => console.log(error));
