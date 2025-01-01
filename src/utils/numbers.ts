export function toPersianNumber(num: string): string {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return num.replace(/\d/g, (digit) => persianDigits[Number.parseInt(digit)]);
}

export function formatPrice(price: number): string {
  //   return toPersianNumber(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return toPersianNumber(String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}
