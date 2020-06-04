export const RoundTwoDecimals = (number) => {
  if (typeof number !== "number") number = Number(number);
  return Math.round((number + Number.EPSILON) * 100) / 100;
};

const StringIsNumber = (value) => isNaN(Number(value)) === false;

export const EnumToObject = (enumme) => {
  return Object.keys(enumme)
    .filter(StringIsNumber)
    .map((key) => enumme[key]);
};
