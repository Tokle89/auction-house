const loginParagraph = document.getElementById("login-paragraph");

/**
 * Displays a message to the user if they have successfully registered. The message is displayed on the login page if the user is redirected from the registration page.
 * @example
 * //Example usage:
 * displayRegisteredMsg();
 */
export const displayRegisteredMsg = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const isRegistered = urlParams.get("registration");

  if (isRegistered) {
    loginParagraph.innerText =
      "You have successfully registered. Please login to continue.";
    loginParagraph.classList.add("text-secondary");
  }
};
