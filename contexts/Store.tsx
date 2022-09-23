import { createContext, useState, useRef } from "react"
import ProductInterface from "interfaces/store/ProductInterface"

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
  months: null,
  monthSelected: null,
  setMonthSelected: null,
  dateSelected: null,
  setDateSelected: null,
  paymentMethods: null,
  paymentFilter: null,
  setPaymentFilter: null,
})

const StoreProvider = ({ children }) => {
  const [productsList, setProductsList] = useState<ProductInterface[]>([])

  const [categories, setCategories] = useState<
    {
      id: number
      name: string
    }[]
  >([])

  const [brands, setBrands] = useState<
    {
      id: number
      name: string
    }[]
  >([])

  const [currentPage, setCurrentPage] = useState<number>(1)

  const [filterSelected, setFilterSelected] = useState<number | null>(null)

  const [triggerListUpdate, setTriggerListUpdate] = useState<number>(1)

  const [openTypeMenu, setOpenTypeMenu] = useState<boolean>(false)
  const [openBrandMenu, setOpenBrandMenu] = useState<boolean>(false)

  const [
    autoCompleteCategoriesValues,
    setAutoCompleteCategoriesValues,
  ] = useState<{ id: number; display_name: string }[]>()
  const [autoCompleteBrandsValues, setAutoCompleteBrandsValues] = useState<
    { id: number; display_name: string }[]
  >()

  const months = [
    {
      id: 1,
      display_name: "Enero",
    },
    {
      id: 2,
      display_name: "Febrero",
    },
    {
      id: 3,
      display_name: "Marzo",
    },
    {
      id: 4,
      display_name: "Abril",
    },
    {
      id: 5,
      display_name: "Mayo",
    },
    {
      id: 6,
      display_name: "Junio",
    },
    {
      id: 7,
      display_name: "Julio",
    },
    {
      id: 8,
      display_name: "Agosto",
    },
    {
      id: 9,
      display_name: "Septiembre",
    },
    {
      id: 10,
      display_name: "Octubre",
    },
    {
      id: 11,
      display_name: "Noviembre",
    },
    {
      id: 12,
      display_name: "Diciembre",
    },
  ]

  const [monthSelected, setMonthSelected] = useState<number>(null)

  const today = new Date()
  const getDay = today.getDate()
  const getMonth = today.getMonth()
  const year = today.getFullYear()

  const day = getDay > 9 ? getDay : `0${getDay}`
  const month = getMonth + 1 > 9 ? getMonth + 1 : `0${getMonth + 1}`

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
  const [purchase, setPurchase] = useState<
    {
      product_id: number
      product_name: string
      product_amount: number
      final_price: number
    }[]
  >([])

  const [purchaseChange, setPurchaseChange] = useState<number>(1)
  const [executeCleanPurchase, setExecuteCleanPurchase] = useState<number>(1)

  const selectFilter = (category_id: number) => {
    setFilterSelected(category_id)
  }

  const paymentMethods = [
    { id: 1, name: "Efectivo" },
    { id: 2, name: "MP" },
  ]

  const [paymentFilter, setPaymentFilter] = useState<number>(1)

  // CREATE *************************************

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

  const nameRef = useRef(null)
  const brandsRef = useRef(null)
  const categoriesRef = useRef(null)
  const costRef = useRef(null)
  const marginRef = useRef(null)
  const stockRef = useRef(null)

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
        months,
        monthSelected,
        setMonthSelected,
        dateSelected,
        setDateSelected,
        paymentMethods,
        paymentFilter,
        setPaymentFilter,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
