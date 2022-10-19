import { createContext, useState, useRef } from "react"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
import TrainerInterface from "interfaces/trainers/TrainerInterface"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import { day, month, year } from "const/time"
import ModalInterface from "interfaces/components/ModalInterface"
import LessonsSelectedInterface from "interfaces/trainers/LessonsSelected"
import PricesInterface from "interfaces/partners/PricesInterface"
import DefaultInterface from "interfaces/components/DefaultInterface"

export const Lessons = createContext({
  clasesPurchasedByWeek: null,
  setClasesPurchasedByWeek: null,
  currentWeekNumber: null,
  setCurrentWeekNumber: null,
  weekNumberSelected: null,
  setWeekNumberSelected: null,
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
  identificationError: null,
  setIdentificationError: null,
  modalSuccess: null,
  setModalSuccess: null,
  modalError: null,
  setModalError: null,
  cleanStates: null,
  purchaseSelected: null,
  setPurchaseSelected: null,
  triggerListUpdate: null,
  setTriggerListUpdate: null,
  students: null,
  setStudents: null,
  buyedCombo: null,
  setBuyedCombo: null,
})

const LessonsProvider = ({ children }) => {
  const [clasesPurchasedByWeek, setClasesPurchasedByWeek] = useState<
    ClasesPurchasedInterface[]
  >([])

  const [currentWeekNumber, setCurrentWeekNumber] = useState<number | null>(
    null,
  )
  const [weekNumberSelected, setWeekNumberSelected] = useState<number | null>(
    null,
  )

  const [modalSuccess, setModalSuccess] = useState<ModalInterface | null>(null)

  const [modalError, setModalError] = useState<ModalInterface | null>(null)

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
    LessonsSelectedInterface[]
  >([])

  const [prices, setPrices] = useState<PricesInterface[]>([])

  const [
    paymentMethodSelected,
    setPaymentMethodSelected,
  ] = useState<DefaultInterface>(null)

  const [
    paymentUserSelected,
    setPaymentUserSelected,
  ] = useState<DefaultInterface>(null)

  const [paid, setPaid] = useState<boolean>(null)

  const [buyedCombo, setBuyedCombo] = useState<boolean>(true)

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
    membership_start_date: `${day}/${month}/${year}`,
    created_by: parseInt(localStorage.getItem("id"), 10),
    free_pass: 0,
    is_student: "SI",
  })

  const [clientIsRegistered, setClientIsRegistered] = useState<boolean>(null)

  const [trainerSelected, setTrainerSelected] = useState<DefaultInterface>(null)

  const [identificationError, setIdentificationError] = useState<boolean>(false)

  const [triggerListUpdate, setTriggerListUpdate] = useState<number>(1)

  const cleanStates = () => {
    setNewPurchases(null)
    setAmountOfLessons(0)
    setDatesSelected([])
    setPaymentMethodSelected(null)
    setPaid(null)
    setClientSelected(null)
    setFinalPrice(0)
    setClientIsRegistered(null)
    setModalSuccess(null)
    setModalError(null)
    setTriggerListUpdate(triggerListUpdate + 1)
  }

  // CALENDAR VIEW ********************************
  const [
    purchaseSelected,
    setPurchaseSelected,
  ] = useState<ClasesPurchasedInterface>(null)

  // STUDENTS VIEW
  const [students, setStudents] = useState<PartnerInterface[]>([])

  return (
    <Lessons.Provider
      value={{
        clasesPurchasedByWeek,
        setClasesPurchasedByWeek,
        currentWeekNumber,
        setCurrentWeekNumber,
        weekNumberSelected,
        setWeekNumberSelected,
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
        identificationError,
        setIdentificationError,
        modalSuccess,
        setModalSuccess,
        modalError,
        setModalError,
        cleanStates,
        purchaseSelected,
        setPurchaseSelected,
        triggerListUpdate,
        setTriggerListUpdate,
        students,
        setStudents,
        buyedCombo,
        setBuyedCombo,
      }}
    >
      {children}
    </Lessons.Provider>
  )
}

export default LessonsProvider
