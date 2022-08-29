import { createContext, useState, useRef } from "react"
import PartnerInterface from "interfaces/partners/PartnerInterface"

export const PartnersContext = createContext({
  filterSelected: null,
  setFilterSelected: null,
  filters: null,
  partners: null,
  setPartners: null,
  partnerSelected: null,
  setPartnerSelected: null,
  timeUnits: null,
  nameRef: null,
  lastNameRef: null,
  identificationRef: null,
  birthDateRef: null,
  emailRef: null,
  paidTimeRef: null,
  paidTimeUnitRef: null,
  trainertRef: null,
  modalSuccess: null,
  setModalSuccess: null,
  modalError: null,
  setModalError: null,
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
      birth_date: "1990-09-22",
      email: "juanperez@gmail.com",
      membership_start_date: "2022-08-01",
      membership_time_paid: "8 meses",
      payment_expire_date: "2023-04-01",
      payment_is_active: true,
      created_by: 1,
      trainer_id: null,
      free_pass: 1,
    },
    {
      id: 2,
      name: "Marta",
      last_name: "Juanes",
      identification_number: "42302327",
      birth_date: "1990-09-22",
      email: "martajuanes@gmail.com",
      membership_start_date: "2022-08-01",
      membership_time_paid: "1 mes",
      payment_expire_date: "2022-09-01",
      payment_is_active: false,
      created_by: 2,
      trainer_id: 4,
      free_pass: 1,
    },
  ])

  const [partnerSelected, setPartnerSelected] = useState<number>(null)

  // CREATE
  const timeUnits = [
    {
      id: 1,
      display_name: "Dia/s",
    },
    {
      id: 2,
      display_name: "Mes/es",
    },
    {
      id: 3,
      display_name: "Año/s",
    },
  ]

  const nameRef = useRef(null)
  const lastNameRef = useRef(null)
  const identificationRef = useRef(null)
  const birthDateRef = useRef(null)
  const emailRef = useRef(null)
  const paidTimeRef = useRef(null)
  const paidTimeUnitRef = useRef(null)
  const trainertRef = useRef(null)

  const [modalSuccess, setModalSuccess] = useState<{
    status: string
    icon: string
    title: string
    content: string
  } | null>(null)

  const [modalError, setModalError] = useState<{
    status: string
    icon: string
    title: string
    content: string
  } | null>(null)

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
        timeUnits,
        nameRef,
        lastNameRef,
        identificationRef,
        birthDateRef,
        emailRef,
        paidTimeRef,
        paidTimeUnitRef,
        trainertRef,
        modalSuccess,
        setModalSuccess,
        modalError,
        setModalError,
      }}
    >
      {children}
    </PartnersContext.Provider>
  )
}

export default PartnersProvider
