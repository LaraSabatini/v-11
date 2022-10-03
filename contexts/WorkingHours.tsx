import { createContext, useState } from "react"

export const WorkingHoursContext = createContext({
  actualWeek: null,
  setActualWeek: null,
  weekSelected: null,
  setWeekSelected: null,
})

const WorkingHoursProvider = ({ children }) => {
  const [actualWeek, setActualWeek] = useState<number>(0)
  const [weekSelected, setWeekSelected] = useState<number>(1)

  return (
    <WorkingHoursContext.Provider
      value={{
        actualWeek,
        setActualWeek,
        weekSelected,
        setWeekSelected,
      }}
    >
      {children}
    </WorkingHoursContext.Provider>
  )
}

export default WorkingHoursProvider
