const loginParagraph = document.getElementById("login-paragraph");

export const displayRegisteredMsg = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const isRegistered = urlParams.get("registration");

  if (isRegistered) {
    loginParagraph.innerText =
      "You have successfully registered. Please login to continue.";
    loginParagraph.classList.add("text-secondary");
  }
};
