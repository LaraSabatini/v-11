import { createContext, useState, useRef, useMemo } from "react"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
import TrainerInterface from "interfaces/trainers/TrainerInterface"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import { day, month, year } from "const/time"
import ModalInterface from "interfaces/components/ModalInterface"
import LessonsSelectedInterface from "interfaces/trainers/LessonsSelected"
import DefaultInterface from "interfaces/components/DefaultInterface"

export const Lessons = createContext(null)

function LessonsProvider({ children }) {
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
  const buyedComboRef = useRef(null)
  const nameRef = useRef(null)
  const lastNameRef = useRef(null)
  const identificationNumberRef = useRef(null)

  const [amountOfLessons, setAmountOfLessons] = useState<number>(0)

  const [datesSelected, setDatesSelected] = useState<
    LessonsSelectedInterface[]
  >([])

  const [
    paymentMethodSelected,
    setPaymentMethodSelected,
  ] = useState<DefaultInterface>(null)

  const [
    paymentUserSelected,
    setPaymentUserSelected,
  ] = useState<DefaultInterface>(null)

  const [paid, setPaid] = useState<boolean>(null)

  const [buyedCombo, setBuyedCombo] = useState<boolean>(false)

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

  const [disablePurchaseButton, setDisablePurchaseButton] = useState<boolean>(
    false,
  )

  // NUEVO
  const [
    createLessonPurchaseView,
    setCreateLessonPurchaseView,
  ] = useState<boolean>(false)
  const [editLessonDateView, setEditLessonDateView] = useState<boolean>(false)
  const [searchResults, setSearchResults] = useState<PartnerInterface[]>([])
  const [searchValue, setSearchValue] = useState<string>("")
  const [provisionalSelection, setProvisionalSelection] = useState<{
    date: string
    shift: "AM" | "PM" | ""
  }>({
    date: "",
    shift: "",
  })
  const [cannotAddDate, setCannotAddDate] = useState<boolean>(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setBuyedCombo(false)
    setDisablePurchaseButton(false)
    setIdentificationError(false)
    setSearchValue("")
    setProvisionalSelection({
      date: "",
      shift: "",
    })
  }

  // CALENDAR VIEW ********************************
  const [
    purchaseSelected,
    setPurchaseSelected,
  ] = useState<ClasesPurchasedInterface>(null)

  // STUDENTS VIEW
  const [students, setStudents] = useState<PartnerInterface[]>([])

  const [cleanedLessons, setCleanedLessons] = useState<{
    monday: {
      am: ClasesPurchasedInterface[]
      pm: ClasesPurchasedInterface[]
    }
    tuesday: {
      am: ClasesPurchasedInterface[]
      pm: ClasesPurchasedInterface[]
    }
    wednesday: {
      am: ClasesPurchasedInterface[]
      pm: ClasesPurchasedInterface[]
    }
    thursday: {
      am: ClasesPurchasedInterface[]
      pm: ClasesPurchasedInterface[]
    }
    friday: {
      am: ClasesPurchasedInterface[]
      pm: ClasesPurchasedInterface[]
    }
  }>({
    monday: {
      am: [],
      pm: [],
    },
    tuesday: {
      am: [],
      pm: [],
    },
    wednesday: {
      am: [],
      pm: [],
    },
    thursday: {
      am: [],
      pm: [],
    },
    friday: {
      am: [],
      pm: [],
    },
  })

  const value = useMemo(
    () => ({
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
      buyedComboRef,
      nameRef,
      lastNameRef,
      identificationNumberRef,
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
      disablePurchaseButton,
      setDisablePurchaseButton,
      cleanedLessons,
      setCleanedLessons,
      createLessonPurchaseView,
      setCreateLessonPurchaseView,
      editLessonDateView,
      setEditLessonDateView,
      searchValue,
      setSearchValue,
      searchResults,
      setSearchResults,
      provisionalSelection,
      setProvisionalSelection,
      cannotAddDate,
      setCannotAddDate,
    }),
    [
      clasesPurchasedByWeek,
      currentWeekNumber,
      weekNumberSelected,
      newPurchases,
      trainersList,
      amountOfLessons,
      datesSelected,
      paymentMethodSelected,
      paid,
      clientSelected,
      finalPrice,
      paymentUserSelected,
      newPartnerData,
      clientIsRegistered,
      trainerSelected,
      identificationError,
      modalSuccess,
      modalError,
      cleanStates,
      purchaseSelected,
      triggerListUpdate,
      students,
      buyedCombo,
      disablePurchaseButton,
      cleanedLessons,
      createLessonPurchaseView,
      editLessonDateView,
      searchValue,
      searchResults,
      provisionalSelection,
      cannotAddDate,
    ],
  )

  return <Lessons.Provider value={value}>{children}</Lessons.Provider>
}

export default LessonsProvider
