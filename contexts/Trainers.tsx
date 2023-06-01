import { createContext, useState, useMemo } from "react"
import {
  LessonTypesInterface,
  LessonPurchaseInterface,
} from "interfaces/lessons/Calendar"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import { KidsInterface } from "interfaces/partners/Kids"

export const TrainersContext = createContext(null)

function TrainersProvider({ children }) {
  const [lessonTypes, setLessonTypes] = useState<LessonTypesInterface[]>([])

  const [readyToPay, setReadyToPay] = useState<boolean>(false)

  const [newKid, setNewKid] = useState<KidsInterface>({
    name: "",
    last_name: "",
    birthdate: "",
    identification: "",
    tutor_name: "",
    tutor_last_name: "",
    tutor_identification: "",
    phone: "",
    member_since: "",
  })

  const [newPartner, setNewPartner] = useState<PartnerInterface>({
    name: "",
    last_name: "",
    identification_number: "",
    birth_date: "",
    email: "",
    phone: "",
    subs: 0,
    membership_start_date: "",
    created_by: 0,
    free_pass: 0,
    is_student: "SI",
  })

  const [lessonPurchase, setLessonPurchase] = useState<
    LessonPurchaseInterface[]
  >(null)

  const [datesSelected, setDatesSelected] = useState<
    {
      date: string
      hour: {
        id: number
        display_name: string
      }
    }[]
  >([])

  const [mpUserSelected, setMpUserSelected] = useState<{
    id: number
    display_name: string
  } | null>(null)
  const [paymentMethodSelected, setPaymentMethodSelected] = useState<number>(1)

  const [finalPrice, setFinalPrice] = useState<number>(0)

  const value = useMemo(
    () => ({
      lessonTypes,
      setLessonTypes,
      newKid,
      setNewKid,
      lessonPurchase,
      setLessonPurchase,
      datesSelected,
      setDatesSelected,
      readyToPay,
      setReadyToPay,
      newPartner,
      setNewPartner,
      finalPrice,
      setFinalPrice,
      mpUserSelected,
      setMpUserSelected,
      paymentMethodSelected,
      setPaymentMethodSelected,
    }),

    [
      lessonTypes,
      newKid,
      lessonPurchase,
      datesSelected,
      readyToPay,
      newPartner,
      finalPrice,
      mpUserSelected,
      paymentMethodSelected,
    ],
  )

  return (
    <TrainersContext.Provider value={value}>
      {children}
    </TrainersContext.Provider>
  )
}

export default TrainersProvider
