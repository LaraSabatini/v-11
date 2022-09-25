import { createContext, useState } from "react"
import ScheduleInterface from "interfaces/trainers/ScheduleInterface"

export const Clases = createContext({
  clasesPurchased: null,
  setClasesPurchased: null,
  schedule: null,
  setSchedule: null,
  filterSelected: null,
  setFilterSelected: null,
  triggerListUpdate: null,
  setTriggerListUpdate: null,
})

const ClasesProvider = ({ children }) => {
  const [clasesPurchased, setClasesPurchased] = useState([])

  const [schedule, setSchedule] = useState<ScheduleInterface[]>([])

  const [filterSelected, setFilterSelected] = useState<number>(null)

  const [triggerListUpdate, setTriggerListUpdate] = useState<number>(1)

  return (
    <Clases.Provider
      value={{
        clasesPurchased,
        setClasesPurchased,
        schedule,
        setSchedule,
        filterSelected,
        setFilterSelected,
        triggerListUpdate,
        setTriggerListUpdate,
      }}
    >
      {children}
    </Clases.Provider>
  )
}

export default ClasesProvider
