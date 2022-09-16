import { createContext, useState } from "react"
import PaymentHistoryInterface from "interfaces/partners/PaymentHistoryInterface"

export const PaymentsHistory = createContext({
  months: null,
  monthSelected: null,
  setMonthSelected: null,
  dateSelected: null,
  setDateSelected: null,
  paymentsList: null,
  setPaymentsList: null,
})

const PaymentsHistoryProvider = ({ children }) => {
  const months = [
    {
      id: 1,
      display_name: "Enero",
    },
    {
      id: 2,
      display_name: "Febrero",
    },
    {
      id: 3,
      display_name: "Marzo",
    },
    {
      id: 4,
      display_name: "Abril",
    },
    {
      id: 5,
      display_name: "Mayo",
    },
    {
      id: 6,
      display_name: "Junio",
    },
    {
      id: 7,
      display_name: "Julio",
    },
    {
      id: 8,
      display_name: "Agosto",
    },
    {
      id: 9,
      display_name: "Septiembre",
    },
    {
      id: 10,
      display_name: "Octubre",
    },
    {
      id: 11,
      display_name: "Noviembre",
    },
    {
      id: 12,
      display_name: "Diciembre",
    },
  ]

  const [monthSelected, setMonthSelected] = useState<number>(null)
  const [dateSelected, setDateSelected] = useState<string>("")
  const [paymentsList, setPaymentsList] = useState<PaymentHistoryInterface[]>(
    [],
  )

  return (
    <PaymentsHistory.Provider
      value={{
        months,
        monthSelected,
        setMonthSelected,
        dateSelected,
        setDateSelected,
        paymentsList,
        setPaymentsList,
      }}
    >
      {children}
    </PaymentsHistory.Provider>
  )
}

export default PaymentsHistoryProvider
