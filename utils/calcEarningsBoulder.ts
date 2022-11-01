import { getStorePurchasesByDate } from "services/Store/storePurchases.service"
import { getBoulderPurchaseByDate } from "services/Finances/Bouderpurchases.service"
import ProductsPurchasedByDateInterface from "interfaces/finances/StorePurchases"
import { day, month, year } from "const/time"

const calcEarningsBoulder = async () => {
  const storeData = await getStorePurchasesByDate(`${day}-${month}-${year}`)

  const boulderData = await getBoulderPurchaseByDate(`${day}-${month}-${year}`)

  const filterBoulderStoreProducts =
    storeData.data.length > 0
      ? storeData.data.filter(
          (purchase: ProductsPurchasedByDateInterface) =>
            purchase.product_id === 1 ||
            purchase.product_id === 2 ||
            purchase.product_id === 3,
        )
      : []

  const final = {
    cash: 0,
    mp: 0,
  }

  filterBoulderStoreProducts.map(item => {
    if (item.payment_method_id === 1) {
      final.cash += item.profit
    } else {
      final.mp += item.profit
    }
    return {}
  })

  boulderData.data.map(item => {
    if (item.payment_method_id === 1) {
      final.cash += item.profit
    } else {
      final.mp += item.profit
    }
    return {}
  })

  return final
}

export default calcEarningsBoulder
