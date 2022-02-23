export const formatNumberToJPY = (number: number) => {
  const option = { style: "currency", currency: "JPY" };
  const numberFormat = new Intl.NumberFormat("ja-JP", option);
  return numberFormat.format(number);
};
