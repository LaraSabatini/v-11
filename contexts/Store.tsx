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

  // STOCK ***********************************
  const [searchValueForStock, setSearchValueForStock] = useState<string>("")

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
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
