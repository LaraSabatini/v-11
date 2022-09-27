import { createContext, useState } from "react"
// import BoulderPaymentInterface from "interfaces/partners/BoulderPaymentInterface"
import PaymentInterface from "interfaces/partners/PaymentInterface"

export const PaymentsHistory = createContext({
  monthSelected: null,
  setMonthSelected: null,
  dateSelected: null,
  setDateSelected: null,
  paymentsList: null,
  setPaymentsList: null,
  amountOfPartnersByDay: null,
  setAmountOfPartnersByDay: null,
})

const PaymentsHistoryProvider = ({ children }) => {
  const [monthSelected, setMonthSelected] = useState<number>(null)
  const [dateSelected, setDateSelected] = useState<string>("")
  const [paymentsList, setPaymentsList] = useState<PaymentInterface[]>([])

  const [amountOfPartnersByDay, setAmountOfPartnersByDay] = useState<number>(0)

  return (
    <PaymentsHistory.Provider
      value={{
        monthSelected,
        setMonthSelected,
        dateSelected,
        setDateSelected,
        paymentsList,
        setPaymentsList,
        amountOfPartnersByDay,
        setAmountOfPartnersByDay,
      }}
    >
      {children}
    </PaymentsHistory.Provider>
  )
}

export default PaymentsHistoryProvider
