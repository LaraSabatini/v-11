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
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
