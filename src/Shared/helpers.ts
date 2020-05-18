export const RoundTwoDecimals = (number) => {
  if (typeof number !== "number") number = Number(number);
  return Math.round((number + Number.EPSILON) * 100) / 100;
};
