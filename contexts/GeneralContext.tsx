import { createContext, useState, useMemo } from "react"

export const GeneralContext = createContext(null)

function GeneralProvider({ children }) {
  const [users, setUsers] = useState<
    {
      id: number
      name: string
      email: string
    }[]
  >([])

  const value = useMemo(
    () => ({
      users,
      setUsers,
    }),
    [users],
  )

  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  )
}

export default GeneralProvider
