import React, { useContext, useEffect, useState } from "react"
import { getEarningsByDate } from "services/Partners/PartnerPayments.service"
import { PaymentsHistory } from "contexts/PaymentsHistory"

const CardsView = () => {
  const { dateSelected } = useContext(PaymentsHistory)
  const [cardsList, setCardsList] = useState()
  // POR CARTA
  /*
        ITEM
        CANTIDAD DE COMPRAS
        GANANCIA CASH
        GANANCIA MP
        FECHA
  */

  const today = new Date()
  const getDay = today.getDate()
  const getMonth = today.getMonth()
  const year = today.getFullYear()

  const day = getDay > 9 ? getDay : `0${getDay}`
  const month = getMonth + 1 > 9 ? getMonth + 1 : `0${getMonth + 1}`

  const actualDate = `${day}-${month}-${year}`

  const fillData = async () => {
    const data = await getEarningsByDate(
      dateSelected !== "" ? dateSelected : actualDate,
    )
    setCardsList(data.data)
  }

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateSelected])

  // eslint-disable-next-line no-console
  console.log("CARDS LIST", cardsList)

  // PRODUCTS => 12 && 13

  return <div>CardsView</div>
}

export default CardsView
