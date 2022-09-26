import React, { useContext, useEffect } from "react"
// DATA STORAGE & TYPES
import { Finances } from "contexts/Finances"
// import ProductsPurchasedByDateInterface from "interfaces/finances/StorePurchases"

const BoulderView = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { boulderProductsPurchasedByDate, partnerPaymentsByDate } = useContext(
    Finances,
  )

  // id: number
  // product_id: number
  // product_name: string
  // amount_of_items: number
  // profit: number
  // payment_method_id: number
  // date: string

  const cleanData = () => {
    // const cleanedPaymentsArr: ProductsPurchasedByDateInterface[] = []
    /* FILTRAR POR:
    dias
    mes
    combo
    clases
    */
    //  const amountOfDaysPurchased = ()
  }

  useEffect(() => {
    cleanData()
  }, [partnerPaymentsByDate])

  return <div>BoulderView</div>
}

export default BoulderView
