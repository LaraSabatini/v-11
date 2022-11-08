import ProductsPurchasedByDateInterface from "interfaces/finances/StorePurchases"
import financesTexts from "strings/finances.json"

const fillDataForRentedShoes = (
  boulderProductsPurchasedByDate: ProductsPurchasedByDateInterface[],
  boulderPurchasesViewData,
) => {
  const finalEarningsForRentedShoes = {
    storeEarningsCash: 0,
    storeEarningsMP: 0,
    storeShoesRented: 0,
  }

  const filterStorePayments = boulderProductsPurchasedByDate.filter(
    (storePayment: ProductsPurchasedByDateInterface) =>
      storePayment.product_id === 3,
  )

  filterStorePayments.map((payment: ProductsPurchasedByDateInterface) => {
    finalEarningsForRentedShoes.storeShoesRented += payment.amount_of_items
    if (payment.payment_method_id === 1) {
      finalEarningsForRentedShoes.storeEarningsCash += payment.profit
    } else {
      finalEarningsForRentedShoes.storeEarningsMP += payment.profit
    }

    return 0
  })

  const newArray = boulderPurchasesViewData
  newArray[4] = {
    name: `${financesTexts.shoes}`,
    earnings_cash: finalEarningsForRentedShoes.storeEarningsCash,
    earnings_mp: finalEarningsForRentedShoes.storeEarningsMP,
    amount_of_shoes_rented: finalEarningsForRentedShoes.storeShoesRented,
  }

  let finalCash = 0
  newArray.map(item => {
    finalCash += item.earnings_cash
    return 0
  })

  let finalDigital = 0
  newArray.map(item => {
    finalDigital += item.earnings_mp
    return 0
  })

  return {
    boulderPurchasesViewData: newArray,
    finalEarningsBoulder: {
      cash: finalCash,
      mp: finalDigital,
    },
  }
}

export default fillDataForRentedShoes
