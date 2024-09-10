export const toBoolean = (input: string | undefined) => {
  if (input?.toLowerCase() === "true") return true;
  return false;
};

export const condenseAddress = (address: string) => {
  const condensed = `${address.slice(0, 6)}...${address.slice(
    address?.length - 4,
  )}`;

  return condensed;
};
