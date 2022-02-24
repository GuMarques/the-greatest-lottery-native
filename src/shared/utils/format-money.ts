function convertMoney(price: number): string {
  return price.toFixed(2).replace(".", ",");
}

export default convertMoney;
