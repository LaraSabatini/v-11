import { createContext, useState, useRef } from "react"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
import TrainerInterface from "interfaces/trainers/TrainerInterface"
import PartnerInterface from "interfaces/partners/PartnerInterface"

export const Clases = createContext({
  clasesPurchasedByWeek: null,
  setClasesPurchasedByWeek: null,
  currentWeekNumber: null,
  setCurrentWeekNumber: null,
  weekNumberSelected: null,
  setWeekNumberSelected: null,
  purchasesSelected: null,
  setPurchasesSelected: null,
  newPurchases: null,
  setNewPurchases: null,
  clientRef: null,
  birthDateRef: null,
  trainersList: null,
  setTrainersList: null,
  amountOfLessonsRef: null,
  trainerSelectedRef: null,
  amountOfLessons: null,
  setAmountOfLessons: null,
  lessonRef: null,
  datesSelected: null,
  setDatesSelected: null,
  prices: null,
  setPrices: null,
  paymentMethodSelected: null,
  setPaymentMethodSelected: null,
  paid: null,
  setPaid: null,
  clientSelected: null,
  setClientSelected: null,
  finalPrice: null,
  setFinalPrice: null,
  paymentUserSelected: null,
  setPaymentUserSelected: null,
  newPartnerData: null,
  setNewPartnerData: null,
  clientIsRegistered: null,
  setClientIsRegistered: null,
  shiftRef: null,
  paysNowRef: null,
  paymentMethodRef: null,
  paymentUserRef: null,
  trainerSelected: null,
  setTrainerSelected: null,
})

const ClasesProvider = ({ children }) => {
  const [clasesPurchasedByWeek, setClasesPurchasedByWeek] = useState<
    ClasesPurchasedInterface[]
  >([])

  const [currentWeekNumber, setCurrentWeekNumber] = useState<number | null>(
    null,
  )
  const [weekNumberSelected, setWeekNumberSelected] = useState<number | null>(
    null,
  )

  const [purchasesSelected, setPurchasesSelected] = useState<number[]>([])

  // BUY LESSONS ********************************
  const [newPurchases, setNewPurchases] = useState<ClasesPurchasedInterface[]>(
    null,
  )

  const [trainersList, setTrainersList] = useState<TrainerInterface[]>([])

  const clientRef = useRef(null)
  const birthDateRef = useRef(null)
  const amountOfLessonsRef = useRef(null)
  const trainerSelectedRef = useRef(null)
  const lessonRef = useRef(null)
  const shiftRef = useRef(null)
  const paysNowRef = useRef(null)
  const paymentMethodRef = useRef(null)
  const paymentUserRef = useRef(null)

  const [amountOfLessons, setAmountOfLessons] = useState<number>(0)

  const [datesSelected, setDatesSelected] = useState<
    {
      id: number
      date: string
      shift: "AM" | "PM"
    }[]
  >([])

  const [prices, setPrices] = useState<
    { id: number; name: string; price_cash: number; price_mp: number }[]
  >([])

  const [paymentMethodSelected, setPaymentMethodSelected] = useState<{
    id: number
    display_name: string
  }>(null)

  const [paymentUserSelected, setPaymentUserSelected] = useState<{
    id: number
    display_name: string
  }>(null)

  const [paid, setPaid] = useState<boolean>(null)

  const [clientSelected, setClientSelected] = useState<PartnerInterface | null>(
    null,
  )

  const [finalPrice, setFinalPrice] = useState<number>(0)

  const [newPartnerData, setNewPartnerData] = useState<PartnerInterface>({
    id: 0,
    name: "",
    last_name: "",
    identification_number: "",
    birth_date: "",
    email: "",
    subs: 0,
    phone: "",
    membership_start_date: "",
    created_by: null,
    free_pass: 0,
    is_student: "SI",
  })

  const [clientIsRegistered, setClientIsRegistered] = useState<boolean>(null)

  const [trainerSelected, setTrainerSelected] = useState<{
    id: number
    display_name: string
  }>(null)

  return (
    <Clases.Provider
      value={{
        clasesPurchasedByWeek,
        setClasesPurchasedByWeek,
        currentWeekNumber,
        setCurrentWeekNumber,
        weekNumberSelected,
        setWeekNumberSelected,
        purchasesSelected,
        setPurchasesSelected,
        newPurchases,
        setNewPurchases,
        clientRef,
        birthDateRef,
        trainersList,
        setTrainersList,
        amountOfLessonsRef,
        trainerSelectedRef,
        amountOfLessons,
        setAmountOfLessons,
        lessonRef,
        datesSelected,
        setDatesSelected,
        prices,
        setPrices,
        paymentMethodSelected,
        setPaymentMethodSelected,
        paid,
        setPaid,
        clientSelected,
        setClientSelected,
        finalPrice,
        setFinalPrice,
        paymentUserSelected,
        setPaymentUserSelected,
        newPartnerData,
        setNewPartnerData,
        clientIsRegistered,
        setClientIsRegistered,
        shiftRef,
        paysNowRef,
        paymentMethodRef,
        paymentUserRef,
        trainerSelected,
        setTrainerSelected,
      }}
    >
      {children}
    </Clases.Provider>
  )
}

export default ClasesProvider
