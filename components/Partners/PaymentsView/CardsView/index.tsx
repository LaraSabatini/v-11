import React, { useContext, useEffect, useState } from "react"
import { getEarningsByDate } from "services/Partners/PartnerPayments.service"
import { PaymentsHistory } from "contexts/PaymentsHistory"
import { CardContainer, Card } from "./styles"

const CardsView = () => {
  const { dateSelected, setDateSelected } = useContext(PaymentsHistory)
  const [cardsList, setCardsList] = useState([])

  const today = new Date()
  const getDay = today.getDate()
  const getMonth = today.getMonth()
  const year = today.getFullYear()

  const day = getDay > 9 ? getDay : `0${getDay}`
  const month = getMonth + 1 > 9 ? getMonth + 1 : `0${getMonth + 1}`

  const actualDate = `${day}-${month}-${year}`
  const customDate =
    dateSelected !== "" && dateSelected.replace("/", "-").replace("/", "-")

  setDateSelected(actualDate)

  const fillData = async () => {
    const data = await getEarningsByDate(
      dateSelected !== "" ? customDate : actualDate,
    )
    setCardsList(data.data)
  }

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateSelected])

  const [comboPurchased, setComboPurchased] = useState<{
    amount: number
    price_cash: number
    price_mp: number
  }>({
    amount: 0,
    price_cash: 0,
    price_mp: 0,
  })

  const [clasesPurchased, setClasesPurchased] = useState<{
    amount: number
    price_cash: number
    price_mp: number
  }>({
    amount: 0,
    price_cash: 0,
    price_mp: 0,
  })

  const [daysPurchased, setDaysPurchased] = useState<{
    amount: number
    price_cash: number
    price_mp: number
  }>({
    amount: 0,
    price_cash: 0,
    price_mp: 0,
  })

  const [monthsPurchased, setMonthsPurchased] = useState<{
    amount: number
    price_cash: number
    price_mp: number
  }>({
    amount: 0,
    price_cash: 0,
    price_mp: 0,
  })

  const structureData = () => {
    const searchCombos = cardsList.filter(card => card.combo !== 0)
    if (searchCombos.length > 0) {
      const combosObj = {
        amount: searchCombos.length,
        price_cash: 0,
        price_mp: 0,
      }
      searchCombos.map(combo => {
        combosObj.price_cash =
          combo.payment_method_id === 1
            ? combosObj.price_cash + combo.price_paid
            : combosObj.price_cash + 0
        combosObj.price_mp =
          combo.payment_method_id === 2
            ? combosObj.price_mp + combo.price_paid
            : combosObj.price_mp + 0
        return 0
      })
      setComboPurchased(combosObj)
    }

    const searchClases = cardsList.filter(card => card.clases_paid !== 0)
    if (searchClases.length > 0) {
      const clasesObj = {
        amount: 0,
        price_cash: 0,
        price_mp: 0,
      }
      searchClases.map(clases => {
        clasesObj.price_cash =
          clases.payment_method_id === 1
            ? clasesObj.price_cash + clases.price_paid
            : clasesObj.price_cash + 0
        clasesObj.price_mp =
          clases.payment_method_id === 2
            ? clasesObj.price_mp + clases.price_paid
            : clasesObj.price_mp + 0
        clasesObj.amount += clases.clases_paid
        return 0
      })
      setClasesPurchased(clasesObj)
    }

    const searchDays = cardsList.filter(card => card.time_paid_unit === 1)
    if (searchDays.length > 0) {
      const daysObj = {
        amount: 0,
        price_cash: 0,
        price_mp: 0,
      }
      searchDays.map(days => {
        daysObj.price_cash =
          days.payment_method_id === 1
            ? daysObj.price_cash + days.price_paid
            : daysObj.price_cash + 0
        daysObj.price_mp =
          days.payment_method_id === 2
            ? daysObj.price_mp + days.price_paid
            : daysObj.price_mp + 0
        daysObj.amount += days.time_paid === 0 ? 1 : days.time_paid
        return 0
      })
      setDaysPurchased(daysObj)
    }

    const searchMonths = cardsList.filter(card => card.time_paid_unit === 2)
    if (searchMonths.length > 0) {
      const monthsObj = {
        amount: 0,
        price_cash: 0,
        price_mp: 0,
      }
      searchMonths.map(months => {
        monthsObj.price_cash =
          months.payment_method_id === 1
            ? monthsObj.price_cash + months.price_paid
            : monthsObj.price_cash + 0
        monthsObj.price_mp =
          months.payment_method_id === 2
            ? monthsObj.price_mp + months.price_paid
            : monthsObj.price_mp + 0
        monthsObj.amount += months.time_paid
        return 0
      })
      setMonthsPurchased(monthsObj)
    }
  }

  useEffect(() => {
    if (cardsList.length > 0) {
      structureData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsList])

  return (
    <CardContainer>
      <Card>
        <p>COMBOS</p>
        <span>Cantidad: {comboPurchased.amount}</span>
        <span>
          Caja Efectivo: <b>$ {comboPurchased.price_cash}</b>
        </span>
        <span>
          Caja MP: <b>$ {comboPurchased.price_mp}</b>
        </span>
      </Card>
      <Card>
        <p>CLASES</p>
        <span>Cantidad: {clasesPurchased.amount}</span>
        <span>
          Caja Efectivo: <b>$ {clasesPurchased.price_cash}</b>
        </span>
        <span>
          Caja MP: <b>$ {clasesPurchased.price_mp}</b>
        </span>
      </Card>
      <Card>
        <p>DIA</p>
        <span>Cantidad: {daysPurchased.amount}</span>
        <span>
          Caja Efectivo: <b>$ {daysPurchased.price_cash}</b>
        </span>
        <span>
          Caja MP: <b>$ {daysPurchased.price_mp}</b>
        </span>
      </Card>
      <Card>
        <p>MES</p>
        <span>Cantidad: {monthsPurchased.amount}</span>
        <span>
          Caja Efectivo: <b>$ {monthsPurchased.price_cash}</b>
        </span>
        <span>
          Caja MP: <b>$ {monthsPurchased.price_mp}</b>
        </span>
      </Card>
    </CardContainer>
  )
}

export default CardsView
