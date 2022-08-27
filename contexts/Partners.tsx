import { createContext, useState } from "react"
import PartnerInterface from "interfaces/partners/PartnerInterface"

export const PartnersContext = createContext({
  filterSelected: null,
  setFilterSelected: null,
  filters: null,
  partners: null,
  setPartners: null,
  partnerSelected: null,
  setPartnerSelected: null,
})

const PartnersProvider = ({ children }) => {
  const [filterSelected, setFilterSelected] = useState<string>("all")
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

  const [partners, setPartners] = useState<PartnerInterface[]>([
    {
      id: 1,
      name: "Juan",
      last_name: "Perez",
      identification_number: "42302327",
      bith_date: "1990-09-22",
      email: "juanperez@gmail.com",
      membership_start_date: "2022-08-01",
      membership_time_paid: "8 meses",
      payment_expire_date: "2023-04-01",
      payment_is_active: true,
      created_by: 1,
      trainer_id: null,
      free_pass: true,
    },
    {
      id: 2,
      name: "Marta",
      last_name: "Juanes",
      identification_number: "42302327",
      bith_date: "1990-09-22",
      email: "martajuanes@gmail.com",
      membership_start_date: "2022-08-01",
      membership_time_paid: "1 mes",
      payment_expire_date: "2022-09-01",
      payment_is_active: false,
      created_by: 2,
      trainer_id: 4,
      free_pass: true,
    },
  ])

  const [partnerSelected, setPartnerSelected] = useState<number>(null)

  return (
    <PartnersContext.Provider
      value={{
        filterSelected,
        setFilterSelected,
        filters,
        partners,
        setPartners,
        partnerSelected,
        setPartnerSelected,
      }}
    >
      {children}
    </PartnersContext.Provider>
  )
}

export default PartnersProvider
