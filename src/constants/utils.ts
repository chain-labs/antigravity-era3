export const toBoolean = (input: string | undefined) => {
  if (input?.toLowerCase() === "true") return true;
  return false;
};
