import { createContext, useState, useRef } from "react"
import ProductInterface from "interfaces/store/ProductInterface"
import { day, month, year } from "const/fixedVariables"
import DefaultInterface from "interfaces/components/DefaultInterface"
import OptionsInterface from "interfaces/store/OptionsInterface"
import TemporalPurchaseInterface from "interfaces/store/TemporalPurchase"
import ModalInterface from "interfaces/components/ModalInterface"

export const StoreContext = createContext({
  productsList: null,
  setProductsList: null,
  categories: null,
  setCategories: null,
  brands: null,
  setBrands: null,
  modalSuccess: null,
  setModalSuccess: null,
  modalError: null,
  setModalError: null,
  nameRef: null,
  brandsRef: null,
  categoriesRef: null,
  costRef: null,
  marginRef: null,
  stockRef: null,
  currentPage: null,
  setCurrentPage: null,
  purchase: null,
  setPurchase: null,
  purchaseChange: null,
  setPurchaseChange: null,
  executeCleanPurchase: null,
  setExecuteCleanPurchase: null,
  filterSelected: null,
  setFilterSelected: null,
  triggerListUpdate: null,
  setTriggerListUpdate: null,
  openTypeMenu: null,
  setOpenTypeMenu: null,
  openBrandMenu: null,
  setOpenBrandMenu: null,
  selectFilter: null,
  searchValueForStock: null,
  setSearchValueForStock: null,
  autoCompleteCategoriesValues: null,
  setAutoCompleteCategoriesValues: null,
  autoCompleteBrandsValues: null,
  setAutoCompleteBrandsValues: null,
  stockChanges: null,
  setStockChanges: null,
  modalStockHasChanges: null,
  setModalStockHasChanges: null,
  monthSelected: null,
  setMonthSelected: null,
  dateSelected: null,
  setDateSelected: null,
  paymentFilter: null,
  setPaymentFilter: null,
  paymentMethodSelected: null,
  setPaymentMethodSelected: null,
  paymentUserSelected: null,
  setPaymentUserSelected: null,
  priceRef: null,
})

const StoreProvider = ({ children }) => {
  const [productsList, setProductsList] = useState<ProductInterface[]>([])

  const [categories, setCategories] = useState<OptionsInterface[]>([])

  const [brands, setBrands] = useState<OptionsInterface[]>([])

  const [currentPage, setCurrentPage] = useState<number>(1)

  const [filterSelected, setFilterSelected] = useState<number | null>(null)

  const [triggerListUpdate, setTriggerListUpdate] = useState<number>(1)

  const [openTypeMenu, setOpenTypeMenu] = useState<boolean>(false)
  const [openBrandMenu, setOpenBrandMenu] = useState<boolean>(false)

  const [
    autoCompleteCategoriesValues,
    setAutoCompleteCategoriesValues,
  ] = useState<DefaultInterface[]>()
  const [autoCompleteBrandsValues, setAutoCompleteBrandsValues] = useState<
    DefaultInterface[]
  >()

  const [monthSelected, setMonthSelected] = useState<number>(null)

  const [dateSelected, setDateSelected] = useState<string>(
    `${day}-${month}-${year}`,
  )

  // STOCK ***********************************
  const [searchValueForStock, setSearchValueForStock] = useState<string>("")

  const [stockChanges, setStockChanges] = useState<boolean>(false)
  const [modalStockHasChanges, setModalStockHasChanges] = useState<boolean>(
    false,
  )

  // BUY *************************************
  const [purchase, setPurchase] = useState<TemporalPurchaseInterface[]>([])

  const [purchaseChange, setPurchaseChange] = useState<number>(1)
  const [executeCleanPurchase, setExecuteCleanPurchase] = useState<number>(1)

  const selectFilter = (category_id: number) => {
    setFilterSelected(category_id)
  }

  const [paymentFilter, setPaymentFilter] = useState<number>(null)

  // CREATE *************************************

  const [modalSuccess, setModalSuccess] = useState<ModalInterface | null>(null)

  const [modalError, setModalError] = useState<ModalInterface | null>(null)

  const nameRef = useRef(null)
  const brandsRef = useRef(null)
  const categoriesRef = useRef(null)
  const costRef = useRef(null)
  const marginRef = useRef(null)
  const stockRef = useRef(null)
  const priceRef = useRef(null)

  const [paymentMethodSelected, setPaymentMethodSelected] = useState<number>(1)
  const [
    paymentUserSelected,
    setPaymentUserSelected,
  ] = useState<DefaultInterface | null>(null)

  return (
    <StoreContext.Provider
      value={{
        productsList,
        setProductsList,
        categories,
        setCategories,
        brands,
        setBrands,
        modalSuccess,
        setModalSuccess,
        modalError,
        setModalError,
        nameRef,
        brandsRef,
        categoriesRef,
        costRef,
        marginRef,
        stockRef,
        currentPage,
        setCurrentPage,
        purchase,
        setPurchase,
        purchaseChange,
        setPurchaseChange,
        executeCleanPurchase,
        setExecuteCleanPurchase,
        filterSelected,
        setFilterSelected,
        triggerListUpdate,
        setTriggerListUpdate,
        openTypeMenu,
        setOpenTypeMenu,
        openBrandMenu,
        setOpenBrandMenu,
        selectFilter,
        searchValueForStock,
        setSearchValueForStock,
        autoCompleteCategoriesValues,
        setAutoCompleteCategoriesValues,
        autoCompleteBrandsValues,
        setAutoCompleteBrandsValues,
        stockChanges,
        setStockChanges,
        modalStockHasChanges,
        setModalStockHasChanges,
        monthSelected,
        setMonthSelected,
        dateSelected,
        setDateSelected,
        paymentFilter,
        setPaymentFilter,
        paymentMethodSelected,
        setPaymentMethodSelected,
        paymentUserSelected,
        setPaymentUserSelected,
        priceRef,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
