import { createContext, useState, useRef } from "react"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import TrainerInterface from "interfaces/trainers/TrainerInterface"

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

  // CREATE *************************************************************
  const [newPartnerData, setNewPartnerData] = useState<PartnerInterface>({
    id: 0,
    name: "",
    last_name: "",
    identification_number: "",
    birth_date: "",
    email: "",
    membership_start_date: "",
    membership_time_paid: "",
    payment_expire_date: "",
    payment_is_active: 0,
    created_by: null,
    trainer_id: null,
    free_pass: 0,
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
    {
      id: 3,
      display_name: "Año/s",
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

  const [combos, setCombos] = useState<{ id: number; display_name: string }[]>([
    { id: 1, display_name: "combo 1" },
  ])

  const [paymentMethods, setPaymentMethods] = useState<
    { id: number; display_name: string }[]
  >([
    { id: 1, display_name: "Efectivo" },
    { id: 2, display_name: "MP" },
  ])

  const [comboSelected, setComboSelected] = useState<number>()

  const [amountOfClases, setAmountOfClases] = useState<number>()

  const [isChecked, setIsChecked] = useState<boolean>(false)

  // EDIT *************************************************************

  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [modalHasChanges, setModalHasChanges] = useState<boolean>(false)

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
      }}
    >
      {children}
    </PartnersContext.Provider>
  )
}

export default PartnersProvider
