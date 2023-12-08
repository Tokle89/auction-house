export const minBid = (bids) => {
  if (bids.length > 0) {
    const latestBid = bids[bids.length - 1];
    return latestBid.amount + 1;
  } else {
    return 1;
  }
};
