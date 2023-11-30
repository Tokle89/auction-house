export const apiCall = async (url, fetchOptions) => {
  try {
    const response = await fetch(url, fetchOptions);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};
