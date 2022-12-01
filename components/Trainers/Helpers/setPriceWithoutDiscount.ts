import PricesInterface from "interfaces/partners/PricesInterface"

const setPriceWithoutDiscount = (
  amountOfLessons: number,
  paymentMethodSelected: number,
  prices: PricesInterface[],
) => {
  let price: number = 0
  if (amountOfLessons === 4) {
    price =
      paymentMethodSelected === 1 ? prices[4].price_cash : prices[4].price_mp
  } else if (amountOfLessons === 8) {
    price =
      paymentMethodSelected === 1 ? prices[5].price_cash : prices[5].price_mp
  } else {
    price =
      paymentMethodSelected === 1
        ? prices[3].price_cash * amountOfLessons
        : prices[3].price_mp * amountOfLessons
  }
  return price
}

export default setPriceWithoutDiscount
