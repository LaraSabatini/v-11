import { createContext, useState } from "react"
import ProductsPurchasedByDateInterface from "interfaces/finances/StorePurchases"

export const Finances = createContext({
  cajaFilterSelected: null,
  setCajaFilterSelected: null,
  cajaFilters: null,
  cajaDateSelected: null,
  setCajaDateSelected: null,
  actualDate: null,
  productsPurchasedByDate: null,
  setProductsPurchasedByDate: null,
})

const FinancesProvider = ({ children }) => {
  // CAJA ******************************************************
  const [cajaFilterSelected, setCajaFilterSelected] = useState<{
    id: number
    filter: string
  }>({
    id: 4,
    filter: "Caja completa",
  })
  const cajaFilters = [
    {
      id: 1,
      filter: "Productos",
    },
    {
      id: 2,
      filter: "Boulder",
    },
    {
      id: 3,
      filter: "Caja MP x Usuario",
    },
    {
      id: 4,
      filter: "Caja completa",
    },
  ]

  const today = new Date()
  const getDay = today.getDate()
  const getMonth = today.getMonth()
  const year = today.getFullYear()

  const day = getDay > 9 ? getDay : `0${getDay}`
  const month = getMonth + 1 > 9 ? getMonth + 1 : `0${getMonth + 1}`

  const actualDate = `${day}-${month}-${year}`
  const [cajaDateSelected, setCajaDateSelected] = useState<string>(actualDate)

  // CAJA PRODUCTOS
  const [productsPurchasedByDate, setProductsPurchasedByDate] = useState<
    ProductsPurchasedByDateInterface[]
  >([])

  return (
    <Finances.Provider
      value={{
        cajaFilterSelected,
        setCajaFilterSelected,
        cajaFilters,
        cajaDateSelected,
        setCajaDateSelected,
        actualDate,
        productsPurchasedByDate,
        setProductsPurchasedByDate,
      }}
    >
      {children}
    </Finances.Provider>
  )
}

export default FinancesProvider
