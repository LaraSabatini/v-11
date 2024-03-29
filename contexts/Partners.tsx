import { createContext, useState, useRef, useMemo } from "react"
import { day, month, year } from "const/time"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import CombosInterface from "interfaces/partners/CombosInterface"
import PaymentInterface from "interfaces/partners/PaymentInterface"
import ModalInterface from "interfaces/components/ModalInterface"
import DefaultInterface from "interfaces/components/DefaultInterface"
import PricesInterface from "interfaces/partners/PricesInterface"

export const PartnersContext = createContext(null)

function PartnersProvider({ children }) {
  const [filterSelected, setFilterSelected] = useState<string>("all")

  const [partners, setPartners] = useState<PartnerInterface[]>([])

  const [partnerSelected, setPartnerSelected] = useState<number>(null)

  const [currentPage, setCurrentPage] = useState<number>(1)

  const [detailState, setDetailState] = useState<"view" | "edit">("view")

  const [triggerListUpdate, setTriggerListUpdate] = useState<number>(1)

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

  const nameRef = useRef(null)
  const lastNameRef = useRef(null)
  const identificationRef = useRef(null)
  const birthDateRef = useRef(null)
  const emailRef = useRef(null)
  const paidTimeRef = useRef(null)
  const paidTimeUnitRef = useRef(null)
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

  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [usesDay, setUsesDay] = useState<boolean>(true)

  const [wantsSubscription, setWantsSubscription] = useState<boolean>(false)

  const [finalPrice, setFinalPrice] = useState<number>(0)

  const [paymentMethodSelected, setPaymentMethodSelected] = useState<number>(1)

  const [dateSelectedToStart, setDateSelectedToStart] = useState<string>(
    `${day}-${month}-${year}`,
  )

  // EDIT *************************************************************

  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [modalHasChanges, setModalHasChanges] = useState<boolean>(false)

  // PAYMENTS ******************************
  const [activeEdition, setActiveEdition] = useState<PaymentInterface>()
  const [newValues, setNewValues] = useState<PaymentInterface>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculatePrice = (prices: PricesInterface) => {
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
        if (paidTime === 1 && paidTimeUnit.id === 1) {
          price += prices !== undefined && prices[0]?.price_cash
        } else if (paidTime === 8 && paidTimeUnit.id === 1) {
          price += prices[1].price_cash
        } else if (paidTime === 4 && paidTimeUnit.id === 1) {
          price += prices[6].price_cash
        } else if (paidTime === 1 && paidTimeUnit.id === 2) {
          price += prices[2].price_cash
        } else {
          // eslint-disable-next-line no-lonely-if
          if (paidTimeUnit.id === 1) {
            price += prices[0].price_cash * paidTime
          } else {
            price += prices[2].price_cash * paidTime
          }
        }
      }

      setFinalPrice(price)
    } else if (paymentMethodSelected === 2) {
      let price = 0
      if (comboSelected !== null && comboSelected !== undefined) {
        const comboDigital = combos.filter(combo => combo.id === comboSelected)
        price += comboDigital[0].price_mp
      }
      if (
        paidTime !== null &&
        paidTime !== 0 &&
        paidTimeUnit !== undefined &&
        paidTimeUnit.id !== null
      ) {
        if (paidTime === 1 && paidTimeUnit.id === 1) {
          price += prices[0].price_mp
        } else if (paidTime === 8 && paidTimeUnit.id === 1) {
          price += prices[1].price_mp
        } else if (paidTime === 1 && paidTimeUnit.id === 2) {
          price += prices[2].price_mp
        } else if (paidTime === 4 && paidTimeUnit.id === 1) {
          price += prices[6].price_mp
        } else {
          // eslint-disable-next-line no-lonely-if
          if (paidTimeUnit.id === 1) {
            price += prices[0].price_mp * paidTime
          } else {
            price += prices[2].price_mp * paidTime
          }
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

  const [totalPages, setTotalPages] = useState<number>(1)
  const [searchValue, setSearchValue] = useState<string>("")
  const [safeModal, setSafeModal] = useState<boolean>(false)
  const [updatePaymentModal, setUpdatePaymentModal] = useState<boolean>(false)

  const [
    paymentUserSelected,
    setPaymentUserSelected,
  ] = useState<DefaultInterface>(null)

  const [
    disableCreatePartnerFormButton,
    setDisableCreatePartnerFormButton,
  ] = useState<boolean>(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cleanStates = () => {
    setModalSuccess(null)
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
    setIsChecked(false)
    setFinalPrice(0)
    setPaymentMethodSelected(1)
    setCreateModal(false)
    setModalErrorAddDays(null)
    setUsesDay(true)
    setUpdatePaymentModal(false)
    setSafeModal(false)
    setSearchValue("")
  }

  const value = useMemo(
    () => ({
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
      modalSuccess,
      setModalSuccess,
      modalError,
      setModalError,
      currentPage,
      setCurrentPage,
      detailState,
      setDetailState,
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
      finalPrice,
      setFinalPrice,
      paymentMethodSelected,
      setPaymentMethodSelected,
      createModal,
      setCreateModal,
      cleanStates,
      phoneRef,
      wantsSubscription,
      setWantsSubscription,
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
      disableCreatePartnerFormButton,
      setDisableCreatePartnerFormButton,
      dateSelectedToStart,
      setDateSelectedToStart,
      totalPages,
      setTotalPages,
      searchValue,
      setSearchValue,
      safeModal,
      setSafeModal,
      updatePaymentModal,
      setUpdatePaymentModal,
    }),
    [
      isChecked,
      filterSelected,
      partners,
      partnerSelected,
      modalSuccess,
      modalError,
      currentPage,
      detailState,
      hasChanges,
      modalHasChanges,
      triggerListUpdate,
      newPartnerData,
      paidTime,
      paidTimeUnit,
      combos,
      comboSelected,
      finalPrice,
      paymentMethodSelected,
      createModal,
      cleanStates,
      wantsSubscription,
      activeEdition,
      newValues,
      calculatePrice,
      modalErrorAddDays,
      usesDay,
      paymentUserSelected,
      disableCreatePartnerFormButton,
      dateSelectedToStart,
      totalPages,
      searchValue,
      safeModal,
      updatePaymentModal,
    ],
  )

  return (
    <PartnersContext.Provider value={value}>
      {children}
    </PartnersContext.Provider>
  )
}

export default PartnersProvider
