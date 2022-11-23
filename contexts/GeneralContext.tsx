import { createContext, useState, useMemo } from "react"
import PricesInterface from "interfaces/partners/PricesInterface"

export const GeneralContext = createContext(null)

function GeneralProvider({ children }) {
  const [users, setUsers] = useState<
    {
      id: number
      name: string
      email: string
    }[]
  >([])

  const [prices, setPrices] = useState<PricesInterface[]>([])
  const [triggerPricesUpdate, setTriggerPricesUpdate] = useState<number>(0)

  const value = useMemo(
    () => ({
      users,
      setUsers,
      prices,
      setPrices,
      triggerPricesUpdate,
      setTriggerPricesUpdate,
    }),
    [users, prices, triggerPricesUpdate],
  )

  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  )
}

export default GeneralProvider
