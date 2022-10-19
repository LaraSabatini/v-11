import { createContext, useState, useMemo } from "react"
import ProductsPurchasedByDateInterface from "interfaces/finances/StorePurchases"
import ProductInterface from "interfaces/store/ProductInterface"
import PartnerPaymentsHistoryInterface from "interfaces/finances/PartnerPaymentsHistory"
import MPUserPayment from "interfaces/finances/MPUserPayments"
import { day, month, year } from "const/time"

export const Finances = createContext({
  tillFilterSelected: null,
  setTillFilterSelected: null,
  tillDateSelected: null,
  setTillDateSelected: null,
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
  boulderPurchasesViewData: null,
  setBoulderPurchasesViewData: null,
  finalEargninsBoulder: null,
  setFinalEargninsBoulder: null,
  digitalPaymentsList: null,
  setDigitalPaymentsList: null,
  totalEarnings: null,
  setTotalEarnings: null,
})

function FinancesProvider({ children }) {
  const [tillFilterSelected, setTillFilterSelected] = useState<{
    id: number
    filter: string
  }>({
    id: 4,
    filter: "Caja completa",
  })

  const [tillDateSelected, setTillDateSelected] = useState<string>(
    `${day}-${month}-${year}`,
  )

  const [productsPurchasedByDate, setProductsPurchasedByDate] = useState<
    ProductsPurchasedByDateInterface[]
  >([])

  const [
    boulderProductsPurchasedByDate,
    setBoulderProductsPurchasedByDate,
  ] = useState<ProductsPurchasedByDateInterface[]>([])

  const [partnerPaymentsByDate, setPartnerPaymentsByDate] = useState<
    PartnerPaymentsHistoryInterface[]
  >([])

  const [productList, setProductList] = useState<ProductInterface[]>([])

  const [sectionSelected, setSectionSelected] = useState<{
    section: string
    id: number
  }>({
    section: "Facturacion Boulder",
    id: 1,
  })

  const [boulderPurchasesViewData, setBoulderPurchasesViewData] = useState([
    {
      name: "Pase Diario",
      earnings_cash: 0,
      earnings_mp: 0,
      amount_of_days_sold: 0,
    },
    {
      name: "Mes",
      earnings_cash: 0,
      earnings_mp: 0,
      amount_of_months_sold: 0,
    },
    {
      name: "Combo",
      earnings_cash: 0,
      earnings_mp: 0,
      amount_of_combos_sold: 0,
    },
    {
      name: "Clases",
      earnings_cash: 0,
      earnings_mp: 0,
      amount_of_lessons_sold: 0,
    },
    {
      name: "Alquiler zapatillas",
      earnings_cash: 0,
      earnings_mp: 0,
      amount_of_shoes_rented: 0,
    },
  ])

  const [finalEargninsBoulder, setFinalEargninsBoulder] = useState<{
    cash: number
    mp: number
  }>({
    cash: 0,
    mp: 0,
  })

  const [digitalPaymentsList, setDigitalPaymentsList] = useState<
    MPUserPayment[]
  >([])

  const [totalEarnings, setTotalEarnings] = useState<{
    cash: number
    mp: number
  }>({
    cash: 0,
    mp: 0,
  })

  const value = useMemo(
    () => ({
      totalEarnings,
      setTotalEarnings,
      digitalPaymentsList,
      setDigitalPaymentsList,
      finalEargninsBoulder,
      setFinalEargninsBoulder,
      boulderPurchasesViewData,
      setBoulderPurchasesViewData,
      tillFilterSelected,
      setTillFilterSelected,
      tillDateSelected,
      setTillDateSelected,
      productsPurchasedByDate,
      setProductsPurchasedByDate,
      boulderProductsPurchasedByDate,
      setBoulderProductsPurchasedByDate,
      partnerPaymentsByDate,
      setPartnerPaymentsByDate,
      productList,
      setProductList,
      sectionSelected,
      setSectionSelected,
    }),
    [
      totalEarnings,
      digitalPaymentsList,
      finalEargninsBoulder,
      boulderPurchasesViewData,
      tillFilterSelected,
      tillDateSelected,
      productsPurchasedByDate,
      boulderProductsPurchasedByDate,
      partnerPaymentsByDate,
      productList,
      sectionSelected,
    ],
  )

  return <Finances.Provider value={value}>{children}</Finances.Provider>
}

export default FinancesProvider
