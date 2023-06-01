import React, { useState, useContext } from "react"
import { TrainersContext } from "contexts/Trainers"
import { makeAppropiatePayment } from "helpers/payments"
import { createBoulderPurchase } from "services/Finances/Boulderpurchases.service"
import { searchPartner, createPartner } from "services/Partners/Partner.service"
import { searchKid, createKid } from "services/Partners/Kids.service"
import {
  getLessonScheduleByDay,
  createLessonPurchase,
  updateSchedule,
  createLessonSchedule,
} from "services/Trainers/agenda.service"
import Icon from "components/UI/Assets/Icon"
import ModalForm from "components/UI/ModalForm"
import Autocomplete from "@components/UI/Autocomplete"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import { KidsInterface } from "interfaces/partners/Kids"
import { LessonTypesInterface } from "interfaces/lessons/Calendar"
import { months, day, month, year } from "const/time"
import SearchBar from "@components/UI/SearchBar"
import ModalAlert from "components/UI/ModalAlert"
import getWeekNumber from "../../Helpers/getWeekNumber"

import RegisterClient from "./RegisterClient"
import RegisterKid from "./RegisterKid"
import PurchaseData from "./PurchaseData"
import {
  PurchaseButton,
  PurchaseForm,
  Results,
  Client,
  ErrorMessage,
} from "./styles"

function PurchaseLesson({
  lessonTypes,
}: {
  lessonTypes: LessonTypesInterface[]
}) {
  const {
    setDatesSelected,
    setLessonPurchase,
    setReadyToPay,
    setNewKid,
    newKid,
    newPartner,
    datesSelected,
    paymentMethodSelected,
    finalPrice,
    mpUserSelected,
  } = useContext(TrainersContext)

  const lessonOptions: { id: number; display_name: string }[] = []

  const today = `${day}-${month}-${year}`

  lessonTypes.forEach(type =>
    lessonOptions.push({ id: type.id, display_name: type.name }),
  )

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [successModal, setSuccessModal] = useState<boolean>(false)
  const [duplicationError, setDuplicationError] = useState<boolean>(false)

  const [
    typeOfLessonSelected,
    setTypeOfLessonSelected,
  ] = useState<LessonTypesInterface>(null)
  const [isRegistered, setIsRegistered] = useState<boolean>(null)
  const [clientSelected, setClientSelected] = useState<{
    id: number
    name: string
  }>(null)

  const [partnerSearch, setPartnerSearch] = useState<string>("")
  const [partnerSearchResults, setPartnerSearchResults] = useState<
    PartnerInterface[] | KidsInterface[]
  >([])

  const hasToRegister = !isRegistered && isRegistered !== null

  const registerPartner = async () => {
    const req =
      typeOfLessonSelected.value === "kids"
        ? await createKid(newKid)
        : await createPartner(newPartner)
    if (req.message.status === 200) {
      setClientSelected({
        id: req.message.partnerId,
        name:
          typeOfLessonSelected.value === "kids" ? newKid.name : newPartner.name,
      })
    }
  }

  const validateIdentificationFunction = async () => {
    const isKid = typeOfLessonSelected.value === "kids"

    const validateIdentification = isKid
      ? await searchKid(newKid.identification, 1)
      : await searchPartner(newPartner.identification_number, 1)
    const identificationNumber = isKid
      ? newKid.identification
      : newPartner.identification_number

    if (validateIdentification.data.length > 0) {
      const filterIdentifications = isKid
        ? validateIdentification.data.filter(
            (partner: KidsInterface) =>
              partner.identification === identificationNumber,
          )
        : validateIdentification.data.filter(
            (partner: PartnerInterface) =>
              partner.identification_number === identificationNumber,
          )
      if (filterIdentifications.length > 0) {
        setDuplicationError(true)
      } else {
        setDuplicationError(false)
        registerPartner()
      }
    } else {
      setDuplicationError(false)
      registerPartner()
    }
  }

  const registerClient = (e: any) => {
    e.preventDefault()

    validateIdentificationFunction()
  }

  const addOneMonth = (dateString: string): string => {
    const [dateDay, dateMonth, dateYear] = dateString.split("-").map(Number)
    const date = new Date(dateYear, dateMonth - 1, dateDay) // JavaScript months are zero-based

    date.setMonth(date.getMonth() + 1)

    const newDay = date.getDate()
    const newMonth = date.getMonth() + 1 // Adjust for zero-based months
    const newYear = date.getFullYear()

    return `${newDay
      .toString()
      .padStart(2, "0")}-${newMonth
      .toString()
      .padStart(2, "0")}-${newYear.toString()}`
  }

  const purchase = async (e: any) => {
    e.preventDefault()
    let success = false

    const createPurchase = await createBoulderPurchase({
      amount_of_items: datesSelected.length,
      date: today,
      id: 0,
      item_id: 4,
      item_name: "Clases",
      payment_method_id: paymentMethodSelected,
      profit: finalPrice,
      created_by: parseInt(localStorage.getItem("id"), 10),
    })

    success = createPurchase.message.status === 200

    if (paymentMethodSelected === 2) {
      const digitalPayment = await makeAppropiatePayment(
        mpUserSelected.id,
        finalPrice,
        {
          id: 0,
          user_id: mpUserSelected.id,
          user_name: mpUserSelected.display_name,
          date: today,
          month: months.filter(m => m.id === parseInt(`${month}`, 10))[0]
            .display_name,
          month_id: parseInt(`${month}`, 10),
          total_profit: finalPrice,
          created_by: parseInt(localStorage.getItem("id"), 10),
        },
      )
      success = digitalPayment.status === 200
    }

    datesSelected.forEach(
      async (date: {
        date: string
        hour: {
          id: number
          display_name: string
        }
      }) => {
        const purchaseBody = {
          id: 0,
          clientId: clientSelected.id,
          paidDay: today,
          paymentMethod: paymentMethodSelected,
          pricePaid: finalPrice / datesSelected.length,
          paymentExpireDate: addOneMonth(today),
          createdBy: parseInt(localStorage.getItem("id"), 10),
        }
        const createLessonPurchaseReq = await createLessonPurchase(purchaseBody)
        success = createPurchase.message.status === 200

        const handleSchedule = await getLessonScheduleByDay(
          date.date.replaceAll("/", "-"),
        )

        const findSameType = handleSchedule.data?.filter(
          lesson =>
            lesson.type === typeOfLessonSelected.value &&
            parseInt(lesson.hourRange, 10) === date.hour.id,
        )

        if (handleSchedule.data.length === 0 || findSameType.length === 0) {
          const weekId = getWeekNumber(date.date.replaceAll("/", "-")).week

          const scheduleBody = {
            id: 0,
            date: date.date.replaceAll("/", "-"),
            weekId,
            hourRange: `${date.hour.id}`,
            type: typeOfLessonSelected.value,
            purchaseIds: JSON.stringify([createLessonPurchaseReq.message.id]),
          }
          const createLessonScheduleReq = await createLessonSchedule(
            scheduleBody,
          )
          success = createLessonScheduleReq.message.status === 200
        } else {
          const newArrayOfIds = JSON.parse(findSameType[0].purchaseIds)
          const scheduleBody = {
            ...findSameType[0],
            purchaseIds: JSON.stringify([
              ...newArrayOfIds,
              createLessonPurchaseReq.message.id,
            ]),
          }
          const updateScheduleReq = await updateSchedule(scheduleBody)
          success = updateScheduleReq.message.status === 200
        }
      },
    )
    setSuccessModal(success)
  }

  const searchPartnerInDB = async (e: any) => {
    e.preventDefault()
    if (typeOfLessonSelected.value === "kids") {
      const req = await searchKid(partnerSearch, 1)
      setPartnerSearchResults(req.data)
    } else {
      const req = await searchPartner(partnerSearch, 1)
      setPartnerSearchResults(req.data)
    }
  }

  const cleanStates = () => {
    setIsRegistered(null)
    setTypeOfLessonSelected(null)
    setClientSelected(null)
    setPartnerSearchResults([])
    setPartnerSearch("")
    setDatesSelected([])
    setLessonPurchase(null)
    setReadyToPay(false)
    setNewKid({
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
  }

  return (
    <div>
      {successModal && (
        <ModalAlert
          success
          message={{
            status: "success",
            icon: "IconCheckModal",
            title: "Excelente",
            content: "La compra se ha registrado con exito",
          }}
          closeModal={() => {
            setSuccessModal(false)
            setOpenModal(false)
            cleanStates()
          }}
          closeRefresh={() => {
            cleanStates()
            setSuccessModal(false)
            setOpenModal(false)
          }}
        />
      )}
      {openModal && (
        <ModalForm
          title="Comprar clases"
          cancelButtonContent="Cancelar"
          submitButtonContent={
            hasToRegister && clientSelected === null ? "Registrar" : "Comprar"
          }
          submit={e => {
            if (hasToRegister && clientSelected === null) {
              registerClient(e)
            } else {
              purchase(e)
            }
          }}
          cancelFunction={() => {
            setOpenModal(false)
            cleanStates()
          }}
        >
          <PurchaseForm>
            <div className="horizontal">
              <Autocomplete
                label="Tipo de clase"
                options={lessonOptions}
                width={200}
                onChangeProps={e => {
                  const lessonType = lessonTypes.filter(
                    lesson => lesson.id === e.id,
                  )
                  setTypeOfLessonSelected(lessonType[0])
                }}
              />
              {typeOfLessonSelected !== null && (
                <Autocomplete
                  width={200}
                  label="Cliente ingresado al sistema"
                  options={[
                    { id: 1, display_name: "Si" },
                    { id: 2, display_name: "No" },
                  ]}
                  onChangeProps={e => setIsRegistered(e.id === 1)}
                />
              )}
            </div>
            {!isRegistered &&
              isRegistered !== null &&
              clientSelected === null && (
                <>
                  {typeOfLessonSelected.value === "kids" ? (
                    <RegisterKid />
                  ) : (
                    <RegisterClient />
                  )}
                </>
              )}
            {duplicationError && (
              <ErrorMessage>
                Ya existe un cliente registrado con estos datos
              </ErrorMessage>
            )}

            {isRegistered && isRegistered !== null && clientSelected === null && (
              <div>
                <SearchBar
                  searchValue={partnerSearch}
                  onChangeSearch={e => {
                    if (e.target.value === "") {
                      setPartnerSearch("")
                    } else {
                      setPartnerSearch(e.target.value)
                    }
                  }}
                  width={250}
                  enterSearch={searchPartnerInDB}
                />
                {partnerSearchResults.length > 0 && (
                  <Results>
                    {partnerSearchResults.map(partner => (
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                      <Client
                        key={partner.id}
                        onClick={() =>
                          setClientSelected({
                            id: partner.id,
                            name: `${partner.name} ${partner.last_name}`,
                          })
                        }
                        selected={partner.id === clientSelected?.id}
                      >
                        - {partner.name} {partner.last_name}
                      </Client>
                    ))}
                  </Results>
                )}
              </div>
            )}
            {clientSelected !== null && typeOfLessonSelected !== null && (
              <>
                <Client>
                  Cliente: <b>{clientSelected.name} </b>
                  <button type="button" onClick={() => setClientSelected(null)}>
                    <Icon icon="IconMenuOff" />
                  </button>
                </Client>
                <PurchaseData
                  clientSelected={clientSelected}
                  isNew={!isRegistered && isRegistered !== null}
                  type={typeOfLessonSelected}
                />
              </>
            )}
          </PurchaseForm>
        </ModalForm>
      )}
      <PurchaseButton type="button" onClick={() => setOpenModal(true)}>
        <Icon icon="IconAdd" color="#fff" />
      </PurchaseButton>
    </div>
  )
}

export default PurchaseLesson
