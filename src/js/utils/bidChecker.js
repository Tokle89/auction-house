/**
 *  Checks the minimum bid against the latest bid.
 * if there are no bids, the minimum bid is 1.
 * @param {array} bids
 * @returns {number} - The minimum bid.
 * @example
 * //Example usage:
 * minBid(bids);
 */

export const minBid = (bids) => {
  console.log(bids);
  if (bids.length > 0) {
    const latestBid = findLatestBid(bids);
    return latestBid.amount + 1;
  } else {
    return 1;
  }
};

/**
 *  Sorts the bids by amount, and returns the latest bid.
 * @param {array} bids
 * @returns  {object} - The latest bid.
 * @example
 * //Example usage:
 * findLatestBid(bids);
 *
 */
export const findLatestBid = (bids) => {
  let latestBid = bids.sort((a, b) => b.amount - a.amount)[0];
  return latestBid;
};
