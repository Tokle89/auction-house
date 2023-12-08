export const apiCall = (url, fetchOptions) =>
  fetch(url, fetchOptions)
    .then((response) => {
      const result = response.json();
      return result;
    })
    .catch((error) => console.log(error));
