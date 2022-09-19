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
  activeEdition: null,
  setActiveEdition: null,
  newValues: null,
  setNewValues: null,
  calculatePrice: null,
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
    is_student: "NO",
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

  const [paidTime, setPaidTime] = useState<number>(1)
  const [paidTimeUnit, setPaidTimeUnit] = useState<{
    id: number
    display_name: string
  }>({
    id: 1,
    display_name: "Dia/s",
  })

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

  const [paymentMethodSelected, setPaymentMethodSelected] = useState<number>(1)

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
      is_student: "NO",
    })
    setPaidTime(1)
    setPaidTimeUnit({
      id: 1,
      display_name: "Dia/s",
    })
    setComboSelected(undefined)
    setAmountOfClases(0)
    setIsChecked(false)
    setFinalPrice(0)
    setPaymentMethodSelected(1)
    setCreateModal(false)
  }

  // PAYMENTS ******************************
  const [activeEdition, setActiveEdition] = useState<PaymentInterface>()
  const [newValues, setNewValues] = useState<PaymentInterface>(null)

  const calculatePrice = () => {
    if (paymentMethodSelected === 1) {
      let price = 0
      if (comboSelected !== null && comboSelected !== undefined) {
        const comboCash = combos.filter(combo => combo.id === comboSelected)
        price += comboCash[0].price_cash
      }
      if (
        paidTime !== null &&
        paidTime !== 0 &&
        paidTimeUnit !== undefined &&
        paidTimeUnit.id !== null
      ) {
        //   si paga un dia
        if (paidTime === 1 && paidTimeUnit.id === 1) {
          price += prices[0]?.price_cash
        } else if (paidTime === 8 && paidTimeUnit.id === 1) {
          // si paga 8 dias
          price += prices[1].price_cash
        } else if (paidTime === 1 && paidTimeUnit.id === 2) {
          // si paga un mes
          price += prices[2].price_cash
        } else {
          // eslint-disable-next-line no-lonely-if
          if (paidTimeUnit.id === 1) {
            //   si paga X dias
            price += prices[0].price_cash * paidTime
          } else {
            //   si paga X meses
            price += prices[2].price_cash * paidTime
          }
        }
      }
      if (amountOfClases !== undefined) {
        if (amountOfClases === 1) {
          price += prices[3].price_cash
        } else if (amountOfClases === 4) {
          price += prices[4].price_cash
        } else if (amountOfClases === 8) {
          price += prices[5].price_cash
        } else {
          // si no son ni 1 ni 4 ni 8
          price += prices[3].price_cash * amountOfClases
        }
      }
      setFinalPrice(price)
    } else if (paymentMethodSelected === 2) {
      let price = 0
      if (comboSelected !== null && comboSelected !== undefined) {
        const comboCash = combos.filter(combo => combo.id === comboSelected)
        price += comboCash[0].price_mp
      }
      if (
        paidTime !== null &&
        paidTime !== 0 &&
        paidTimeUnit !== undefined &&
        paidTimeUnit.id !== null
      ) {
        //   si paga un dia
        if (paidTime === 1 && paidTimeUnit.id === 1) {
          price += prices[0].price_mp
        } else if (paidTime === 8 && paidTimeUnit.id === 1) {
          // si paga 8 dias
          price += prices[1].price_mp
        } else if (paidTime === 1 && paidTimeUnit.id === 2) {
          // si paga un mes
          price += prices[2].price_mp
        } else {
          // eslint-disable-next-line no-lonely-if
          if (paidTimeUnit.id === 1) {
            //   si paga X dias
            price += prices[0].price_mp * paidTime
          } else {
            //   si paga X meses
            price += prices[2].price_mp * paidTime
          }
        }
      }
      if (amountOfClases !== undefined) {
        if (amountOfClases === 1) {
          price += prices[3].price_mp
        } else if (amountOfClases === 4) {
          price += prices[4].price_mp
        } else if (amountOfClases === 8) {
          price += prices[5].price_mp
        } else {
          // si no son ni 1 ni 4 ni 8
          price += prices[3].price_mp * amountOfClases
        }
      }
      setFinalPrice(price)
    } else {
      setFinalPrice(0)
    }
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
        activeEdition,
        setActiveEdition,
        newValues,
        setNewValues,
        calculatePrice,
      }}
    >
      {children}
    </PartnersContext.Provider>
  )
}

export default PartnersProvider
