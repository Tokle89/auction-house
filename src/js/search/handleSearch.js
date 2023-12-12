/**
 * Handle search submit, and redirect to search page
 * @return {void}
 * example
 * //Example usage:
 * handleSearchSubmit();
 */
export const handleSearchSubmit = () => {
  event.preventDefault();
  const [input] = event.target.elements;
  const query = input.value;
  window.location.href = `../../../index.html?query=${query}`;
};
