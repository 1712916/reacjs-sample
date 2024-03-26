export function moneyFormat(money) {
  return new Intl.NumberFormat("vi-VN").format(money);
}
