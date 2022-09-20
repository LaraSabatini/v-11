import { createContext, useState } from "react"

export const Clases = createContext({
  clasesPurchased: null,
  setClasesPurchased: null,
  schedule: null,
  setSchedule: null,
})

const ClasesProvider = ({ children }) => {
  const [clasesPurchased, setClasesPurchased] = useState([])

  const [schedule, setSchedule] = useState<
    {
      id: number
      day_and_hour: string
      max_students: number
    }[]
  >([])

  return (
    <Clases.Provider
      value={{
        clasesPurchased,
        setClasesPurchased,
        schedule,
        setSchedule,
      }}
    >
      {children}
    </Clases.Provider>
  )
}

export default ClasesProvider
