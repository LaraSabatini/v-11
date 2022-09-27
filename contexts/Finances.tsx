import { createContext, useState } from "react"
import ProductsPurchasedByDateInterface from "interfaces/finances/StorePurchases"
import ProductInterface from "interfaces/store/ProductInterface"
import { day, month, year } from "const/fixedVariables"

export const Finances = createContext({
  cajaFilterSelected: null,
  setCajaFilterSelected: null,
  cajaDateSelected: null,
  setCajaDateSelected: null,
  actualDate: null,
  productsPurchasedByDate: null,
  setProductsPurchasedByDate: null,
  boulderProductsPurchasedByDate: null,
  setBoulderProductsPurchasedByDate: null,
  productList: null,
  setProductList: null,
  partnerPaymentsByDate: null,
  setPartnerPaymentsByDate: null,
  sectionSelected: null,
  setSectionSelected: null,
})

const FinancesProvider = ({ children }) => {
  // CAJA ******************************************************
  const [cajaFilterSelected, setCajaFilterSelected] = useState<{
    id: number
    filter: string
  }>({
    id: 2,
    filter: "Boulder",
  })

  const actualDate = `${day}-${month}-${year}`

  const [cajaDateSelected, setCajaDateSelected] = useState<string>(actualDate)

  // CAJA PRODUCTOS
  const [productsPurchasedByDate, setProductsPurchasedByDate] = useState<
    ProductsPurchasedByDateInterface[]
  >([])

  // CAJA BOULDER
  const [
    boulderProductsPurchasedByDate,
    setBoulderProductsPurchasedByDate,
  ] = useState<ProductsPurchasedByDateInterface[]>([])

  const [partnerPaymentsByDate, setPartnerPaymentsByDate] = useState<
    ProductsPurchasedByDateInterface[]
  >([])

  const [productList, setProductList] = useState<ProductInterface[]>([])

  const [sectionSelected, setSectionSelected] = useState<{
    section: string
    id: number
  }>({
    section: "Ganancias (Boulder)",
    id: 1,
  })

  return (
    <Finances.Provider
      value={{
        cajaFilterSelected,
        setCajaFilterSelected,
        cajaDateSelected,
        setCajaDateSelected,
        actualDate,
        productsPurchasedByDate,
        setProductsPurchasedByDate,
        boulderProductsPurchasedByDate,
        setBoulderProductsPurchasedByDate,
        productList,
        setProductList,
        partnerPaymentsByDate,
        setPartnerPaymentsByDate,
        sectionSelected,
        setSectionSelected,
      }}
    >
      {children}
    </Finances.Provider>
  )
}

export default FinancesProvider
