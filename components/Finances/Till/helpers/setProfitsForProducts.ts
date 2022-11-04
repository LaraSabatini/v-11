import ProductsPurchasedByDateInterface from "interfaces/finances/StorePurchases"

const setProfitsForProducts = (
  productsPurchasedByDate: ProductsPurchasedByDateInterface[],
) => {
  const profits = {
    cash: 0,
    digital: 0,
  }

  const profitsCash = productsPurchasedByDate.filter(
    (purchase: ProductsPurchasedByDateInterface) =>
      purchase.payment_method_id === 1,
  )
  const profitsDigital = productsPurchasedByDate.filter(
    (purchase: ProductsPurchasedByDateInterface) =>
      purchase.payment_method_id === 2,
  )

  profitsCash.map((purchase: ProductsPurchasedByDateInterface) => {
    profits.cash += purchase.profit
    return {}
  })

  profitsDigital.map((purchase: ProductsPurchasedByDateInterface) => {
    profits.digital += purchase.profit
    return {}
  })

  return profits
}

export default setProfitsForProducts
