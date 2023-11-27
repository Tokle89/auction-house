export const apiCall = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (response.ok) {
      return result;
    } else return response.statusText;
  } catch (error) {
    console.log(error);
  }
};
