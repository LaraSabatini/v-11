import { createContext, useState, useRef } from "react"
import generalTexts from "strings/general.json"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import TrainerInterface from "interfaces/trainers/TrainerInterface"
import PricesInterface from "interfaces/partners/PricesInterface"
import CombosInterface from "interfaces/partners/CombosInterface"
import PaymentInterface from "interfaces/partners/PaymentInterface"
import ModalInterface from "interfaces/components/ModalInterface"
import DefaultInterface from "interfaces/components/DefaultInterface"

export const PartnersContext = createContext({
  filterSelected: null,
  setFilterSelected: null,
  partners: null,
  setPartners: null,
  partnerSelected: null,
  setPartnerSelected: null,
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
  paymentRef: null,
  paidTime: null,
  setPaidTime: null,
  paidTimeUnit: null,
  setPaidTimeUnit: null,
  combos: null,
  setCombos: null,
  comboSelected: null,
  setComboSelected: null,
  amountOfLessons: null,
  setAmountOfLessons: null,
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
  modalErrorAddDays: null,
  setModalErrorAddDays: null,
  usesDay: null,
  setUsesDay: null,
  paymentUserSelected: null,
  setPaymentUserSelected: null,
  paymentUserRef: null,
  sectionSelected: null,
  setSectionSelected: null,
})

const PartnersProvider = ({ children }) => {
  const [sectionSelected, setSectionSelected] = useState<{
    section: string
    id: number
  }>({
    section: `${generalTexts.sections.home}`,
    id: 1,
  })

  const [filterSelected, setFilterSelected] = useState<string>("all")

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
  const paymentRef = useRef(null)
  const phoneRef = useRef(null)
  const paymentUserRef = useRef(null)

  const [modalSuccess, setModalSuccess] = useState<ModalInterface | null>(null)

  const [modalError, setModalError] = useState<ModalInterface | null>(null)

  const [paidTime, setPaidTime] = useState<number>(1)
  const [paidTimeUnit, setPaidTimeUnit] = useState<DefaultInterface>({
    id: 1,
    display_name: "Dia/s",
  })

  const [combos, setCombos] = useState<CombosInterface[]>([])

  const [comboSelected, setComboSelected] = useState<number>()

  const [amountOfLessons, setAmountOfLessons] = useState<number>()

  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [usesDay, setUsesDay] = useState<boolean>(true)

  const [wantsSubscription, setWantsSubscription] = useState<boolean>(false)

  const [prices, setPrices] = useState<PricesInterface[]>([])
  const [finalPrice, setFinalPrice] = useState<number>(0)

  const [paymentMethodSelected, setPaymentMethodSelected] = useState<number>(1)

  const [addPaymentModal, setAddPaymentModal] = useState<boolean>(false)

  const [trainerSelected, setTrainerSelected] = useState<DefaultInterface>()

  const [scheduleList, setScheduleList] = useState<DefaultInterface[]>()

  const [scheduleSelected, setScheduleSelected] = useState<number[]>([])

  // EDIT *************************************************************

  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [modalHasChanges, setModalHasChanges] = useState<boolean>(false)

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
          price += prices[0].price_cash
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
      if (amountOfLessons !== undefined) {
        if (amountOfLessons === 1) {
          price += prices[3].price_cash
        } else if (amountOfLessons === 4) {
          price += prices[4].price_cash
        } else if (amountOfLessons === 8) {
          price += prices[5].price_cash
        } else {
          // si no son ni 1 ni 4 ni 8
          price += prices[3].price_cash * amountOfLessons
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
      if (amountOfLessons !== undefined) {
        if (amountOfLessons === 1) {
          price += prices[3].price_mp
        } else if (amountOfLessons === 4) {
          price += prices[4].price_mp
        } else if (amountOfLessons === 8) {
          price += prices[5].price_mp
        } else {
          // si no son ni 1 ni 4 ni 8
          price += prices[3].price_mp * amountOfLessons
        }
      }
      setFinalPrice(price)
    } else {
      setFinalPrice(0)
    }
  }

  const [
    modalErrorAddDays,
    setModalErrorAddDays,
  ] = useState<ModalInterface | null>(null)

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
    setAmountOfLessons(0)
    setIsChecked(false)
    setFinalPrice(0)
    setPaymentMethodSelected(1)
    setCreateModal(false)
    setModalErrorAddDays(null)
  }

  const [
    paymentUserSelected,
    setPaymentUserSelected,
  ] = useState<DefaultInterface>(null)

  return (
    <PartnersContext.Provider
      value={{
        isChecked,
        setIsChecked,
        filterSelected,
        setFilterSelected,
        partners,
        setPartners,
        partnerSelected,
        setPartnerSelected,
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
        paymentRef,
        paidTime,
        setPaidTime,
        paidTimeUnit,
        setPaidTimeUnit,
        combos,
        setCombos,
        comboSelected,
        setComboSelected,
        amountOfLessons,
        setAmountOfLessons,
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
        modalErrorAddDays,
        setModalErrorAddDays,
        usesDay,
        setUsesDay,
        paymentUserSelected,
        setPaymentUserSelected,
        paymentUserRef,
        sectionSelected,
        setSectionSelected,
      }}
    >
      {children}
    </PartnersContext.Provider>
  )
}

export default PartnersProvider
