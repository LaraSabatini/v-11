import { createContext, useState, useRef } from "react"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import TrainerInterface from "interfaces/trainers/TrainerInterface"
import PricesInterface from "interfaces/partners/PricesInterface"
import CombosInterface from "interfaces/partners/CombosInterface"
import PaymentInterface from "interfaces/partners/PaymentInterface"

export const PartnersContext = createContext({
  filterSelected: null,
  setFilterSelected: null,
  filters: null,
  partners: null,
  setPartners: null,
  partnerSelected: null,
  setPartnerSelected: null,
  timeUnits: null,
  nameRef: null,
  lastNameRef: null,
  identificationRef: null,
  birthDateRef: null,
  emailRef: null,
  paidTimeRef: null,
  paidTimeUnitRef: null,
  trainertRef: null,
  modalSuccess: null,
  setModalSuccess: null,
  modalError: null,
  setModalError: null,
  currentPage: null,
  setCurrentPage: null,
  detailState: null,
  setDetailState: null,
  trainersList: null,
  setTrainersList: null,
  hasChanges: null,
  setHasChanges: null,
  modalHasChanges: null,
  setModalHasChanges: null,
  triggerListUpdate: null,
  setTriggerListUpdate: null,
  newPartnerData: null,
  setNewPartnerData: null,
  comboRef: null,
  clasesRef: null,
  paymentRef: null,
  paidTime: null,
  setPaidTime: null,
  paidTimeUnit: null,
  setPaidTimeUnit: null,
  combos: null,
  setCombos: null,
  paymentMethods: null,
  setPaymentMethods: null,
  comboSelected: null,
  setComboSelected: null,
  amountOfClases: null,
  setAmountOfClases: null,
  isChecked: null,
  setIsChecked: null,
  prices: null,
  setPrices: null,
  finalPrice: null,
  setFinalPrice: null,
  paymentMethodSelected: null,
  setPaymentMethodSelected: null,
  partnerPayments: null,
  setPartnerPayments: null,
  addPaymentModal: null,
  setAddPaymentModal: null,
  createModal: null,
  setCreateModal: null,
  trainerSelected: null,
  setTrainerSelected: null,
  cleanStates: null,
  phoneRef: null,
  wantsSubscription: null,
  setWantsSubscription: null,
  scheduleList: null,
  setScheduleList: null,
  setScheduleSelected: null,
  scheduleSelected: null,
})

const PartnersProvider = ({ children }) => {
  const [filterSelected, setFilterSelected] = useState<string>("all")
  const filters = [
    {
      value: "students",
      text: "Alumnos",
    },
    {
      value: "free-pass",
      text: "Pase Libre",
    },
    {
      value: "all",
      text: "Todos",
    },
  ]

  const [partners, setPartners] = useState<PartnerInterface[]>([])

  const [partnerSelected, setPartnerSelected] = useState<number>(null)

  const [currentPage, setCurrentPage] = useState<number>(1)

  const [detailState, setDetailState] = useState<"view" | "edit">("view")

  const [triggerListUpdate, setTriggerListUpdate] = useState<number>(1)

  const [partnerPayments, setPartnerPayments] = useState<PaymentInterface[]>([])

  const [createModal, setCreateModal] = useState<boolean>(false)

  // CREATE *************************************************************
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
    is_student: 0,
  })

  const timeUnits = [
    {
      id: 1,
      display_name: "Dia/s",
    },
    {
      id: 2,
      display_name: "Mes/es",
    },
  ]

  const [trainersList, setTrainersList] = useState<TrainerInterface[]>([])

  const nameRef = useRef(null)
  const lastNameRef = useRef(null)
  const identificationRef = useRef(null)
  const birthDateRef = useRef(null)
  const emailRef = useRef(null)
  const paidTimeRef = useRef(null)
  const paidTimeUnitRef = useRef(null)
  const trainertRef = useRef(null)
  const comboRef = useRef(null)
  const clasesRef = useRef(null)
  const paymentRef = useRef(null)
  const phoneRef = useRef(null)

  const [modalSuccess, setModalSuccess] = useState<{
    status: string
    icon: string
    title: string
    content: string
  } | null>(null)

  const [modalError, setModalError] = useState<{
    status: string
    icon: string
    title: string
    content: string
  } | null>(null)

  const [paidTime, setPaidTime] = useState<number>(0)
  const [paidTimeUnit, setPaidTimeUnit] = useState<{
    id: number
    display_name: string
  }>()

  const [combos, setCombos] = useState<CombosInterface[]>([])

  const [paymentMethods, setPaymentMethods] = useState<
    { id: number; display_name: string }[]
  >([
    { id: 1, display_name: "Efectivo" },
    { id: 2, display_name: "MP" },
  ])

  const [comboSelected, setComboSelected] = useState<number>()

  const [amountOfClases, setAmountOfClases] = useState<number>()

  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [wantsSubscription, setWantsSubscription] = useState<boolean>(false)

  const [prices, setPrices] = useState<PricesInterface[]>([])
  const [finalPrice, setFinalPrice] = useState<number>(0)

  const [paymentMethodSelected, setPaymentMethodSelected] = useState<number>(
    null,
  )

  const [addPaymentModal, setAddPaymentModal] = useState<boolean>(false)

  const [trainerSelected, setTrainerSelected] = useState<{
    id: number
    display_name: string
  }>()

  const [scheduleList, setScheduleList] = useState<{
    id: number
    display_name: string
  }>()

  const [scheduleSelected, setScheduleSelected] = useState<number[]>([])

  // EDIT *************************************************************

  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [modalHasChanges, setModalHasChanges] = useState<boolean>(false)

  const cleanStates = () => {
    setScheduleSelected([])
    setModalSuccess(null)
    setAddPaymentModal(false)
    setModalError(null)
    setPartnerSelected(null)
    setNewPartnerData({
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
      is_student: 0,
    })
    setPaidTime(0)
    setPaidTimeUnit(undefined)
    setComboSelected(undefined)
    setAmountOfClases(0)
    setIsChecked(false)
    setFinalPrice(0)
    setPaymentMethodSelected(null)
    setCreateModal(false)
  }

  return (
    <PartnersContext.Provider
      value={{
        isChecked,
        setIsChecked,
        filterSelected,
        setFilterSelected,
        filters,
        partners,
        setPartners,
        partnerSelected,
        setPartnerSelected,
        timeUnits,
        nameRef,
        lastNameRef,
        identificationRef,
        birthDateRef,
        emailRef,
        paidTimeRef,
        paidTimeUnitRef,
        trainertRef,
        modalSuccess,
        setModalSuccess,
        modalError,
        setModalError,
        currentPage,
        setCurrentPage,
        detailState,
        setDetailState,
        trainersList,
        setTrainersList,
        hasChanges,
        setHasChanges,
        modalHasChanges,
        setModalHasChanges,
        triggerListUpdate,
        setTriggerListUpdate,
        newPartnerData,
        setNewPartnerData,
        comboRef,
        clasesRef,
        paymentRef,
        paidTime,
        setPaidTime,
        paidTimeUnit,
        setPaidTimeUnit,
        combos,
        setCombos,
        paymentMethods,
        setPaymentMethods,
        comboSelected,
        setComboSelected,
        amountOfClases,
        setAmountOfClases,
        prices,
        setPrices,
        finalPrice,
        setFinalPrice,
        paymentMethodSelected,
        setPaymentMethodSelected,
        partnerPayments,
        setPartnerPayments,
        addPaymentModal,
        createModal,
        setCreateModal,
        setAddPaymentModal,
        trainerSelected,
        setTrainerSelected,
        cleanStates,
        phoneRef,
        wantsSubscription,
        setWantsSubscription,
        scheduleList,
        setScheduleList,
        scheduleSelected,
        setScheduleSelected,
      }}
    >
      {children}
    </PartnersContext.Provider>
  )
}

export default PartnersProvider
