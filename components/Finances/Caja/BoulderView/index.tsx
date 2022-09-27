import React, { useContext } from "react"
// DATA STORAGE & TYPES
import { Finances } from "contexts/Finances"

const BoulderView = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { boulderProductsPurchasedByDate, partnerPaymentsByDate } = useContext(
    Finances,
  )

  /*
    VISTA POR:
    DIA           => (boulderProductsPurchasedByDate && partnerPaymentsByDate)
    MES           => (partnerPaymentsByDate)
    COMBO         => (partnerPaymentsByDate)
    CLASES        => (partnerPaymentsByDate)
    ZAPATILLAS    => (boulderProductsPurchasedByDate)
  */

  return <div>BoulderView</div>
}

export default BoulderView
