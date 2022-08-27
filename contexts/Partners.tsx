import { createContext, useState } from "react"

export const PartnersContext = createContext({
  filterSelected: null,
  setFilterSelected: null,
  filters: null,
})

const PartnersProvider = ({ children }) => {
  const [filterSelected, setFilterSelected] = useState<string>(null)
  const filters = [
    {
      value: "students",
      text: "Alumnos",
    },
    {
      value: "free-pass",
      text: "Pase Libre",
    },
    {
      value: "all",
      text: "Todos",
    },
  ]

  return (
    <PartnersContext.Provider
      value={{
        filterSelected,
        setFilterSelected,
        filters,
      }}
    >
      {children}
    </PartnersContext.Provider>
  )
}

export default PartnersProvider
