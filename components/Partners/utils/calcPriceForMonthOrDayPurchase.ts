import PricesInterface from "interfaces/partners/PricesInterface"

const calcPriceMonthOrDay = (
  paidTimeUnit: number,
  paidTime: number,
  paymentMethodSelected: number,
  prices: PricesInterface[],
) => {
  let finalProfit = 0
  if (paidTimeUnit === 1) {
    if (paidTime === 8) {
      finalProfit =
        paymentMethodSelected === 1 ? prices[1].price_cash : prices[1].price_mp
    } else if (paidTime === 4) {
      finalProfit =
        paymentMethodSelected === 1 ? prices[6].price_cash : prices[6].price_mp
    } else {
      finalProfit =
        paymentMethodSelected === 1
          ? paidTime * prices[0].price_cash
          : paidTime * prices[0].price_mp
    }
  } else {
    finalProfit =
      paymentMethodSelected === 1
        ? paidTime * prices[2].price_cash
        : paidTime * prices[2].price_mp
  }

  return finalProfit
}

export default calcPriceMonthOrDay
