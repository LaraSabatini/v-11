import React, { useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
// SERVICES
import { getPrices } from "services/Partners/Prices.service"
import { createLessonPurchase } from "services/Trainers/LessonsPurchased.service"
import { createBoulderPurchase } from "services/Finances/Bouderpurchases.service"
import {
  createDigitalPayment,
  searchDigitalPaymentByUserAndDate,
  updateDigitalPayment,
} from "services/Finances/DigitalPayments.service"
import {
  createPartner,
  searchPartner,
  editPartner,
} from "services/Partners/Partner.service"
// DATA STORAGE & TYPES
import PartnersProvider from "contexts/Partners"
import trainerTexts from "strings/trainers.json"
import generalTexts from "strings/general.json"
import { Lessons } from "@contexts/Lessons"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
import { day, month, year, months } from "const/time"
import yesOrNoArr from "const/fixedVariables"
import cleanPartnerData from "utils/cleanPartnerData"
import PartnerPaymentsHistoryInterface from "interfaces/finances/PartnerPaymentsHistory"
import MPUserPayment from "interfaces/finances/MPUserPayments"
// COMPONENTS & STYLING
import NoPermissionsView from "components/UI/NoPermitsView"
import Header from "components/UI/Header"
import Icon from "components/UI/Assets/Icon"
import Modals from "./Modals"
import CalendarView from "./CalendarView"
import StudentsView from "./StudentsView"
import CreatePurchaseModal from "./Forms/CreatePurchase"
import EditLessonDate from "./Forms/EditLessonDate"
import {
  Container,
  Title,
  PurchaseButton,
  ButtonContainer,
  EditButton,
} from "./styles"

function TrainersView() {
  const {
    purchaseSelected,
    setPrices,
    clientIsRegistered,
    paid,
    amountOfLessons,
    datesSelected,
    clientSelected,
    finalPrice,
    paymentMethodSelected,
    paymentUserSelected,
    newPartnerData,
    setIdentificationError,
    cleanStates,
    setModalSuccess,
    setModalError,
    buyedCombo,
    setDisablePurchaseButton,
  } = useContext(Lessons)
  const router = useRouter()

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections[1]

  const canViewCalendar = permissions.sub_sections[0].view
  const canViewStudents = permissions.sub_sections[1].view

  const calendarActions = permissions.sub_sections[0].actions

  const [editLessonDateView, setEditLessonDateView] = useState<boolean>(false)
  const [
    createLessonPurchaseView,
    setCreateLessonPurchaseView,
  ] = useState<boolean>(false)

  const cancelPurchase = e => {
    e.preventDefault()
    setCreateLessonPurchaseView(false)
    cleanStates()
  }

  const createLessonPurchaseFunc = async (
    partnerId: number,
    partnerName: string,
    partnerLastName: string,
  ) => {
    let success = false
    for (let i = 0; i < amountOfLessons; i += 1) {
      const lessonDay = `${datesSelected[i].date.slice(6, 10)}-${datesSelected[
        i
      ].date.slice(3, 5)}-${datesSelected[i].date.slice(0, 2)}`
      const currentDate = new Date(lessonDay)
      const startDate = new Date(currentDate.getFullYear(), 0, 1)
      const days = Math.floor(
        (currentDate.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000),
      )
      const weekNumber = Math.ceil(days / 7)

      const body: ClasesPurchasedInterface = {
        id: 0,
        lesson_date: `${datesSelected[i].date.slice(0, 2)}-${datesSelected[
          i
        ].date.slice(3, 5)}-${datesSelected[i].date.slice(6, 10)}`,
        shift: datesSelected[i].shift,
        partner_id: partnerId,
        partner_name: partnerName,
        partner_last_name: partnerLastName,
        trainer_id: 0,
        trainer_name: "",
        week_id: weekNumber,
        paid:
          paid || buyedCombo
            ? `${yesOrNoArr[0].display_name}`
            : `${yesOrNoArr[1].display_name}`,
        day_id: currentDate.getDay(),
        final_price: finalPrice / amountOfLessons,
        payment_method_id:
          paymentMethodSelected !== null ? paymentMethodSelected.id : 0,
        paid_day: paid ? `${day}-${month}-${year}` : "",
        created_by: parseInt(localStorage.getItem("id"), 10),
      }

      //  eslint-disable-next-line no-await-in-loop
      const createLessonPurchaseCall = await createLessonPurchase(body)
      success =
        createLessonPurchaseCall.message ===
        "Lesson purchase created successfully"
    }
    return success
  }

  const createBoulderPurchaseCallFunc = async () => {
    let success: boolean = false

    const boulderPurchaseBody: PartnerPaymentsHistoryInterface = {
      id: 0,
      date: `${day}-${month}-${year}`,
      item_id: 4,
      item_name: `${trainerTexts.lessons}`,
      amount_of_items: amountOfLessons,
      profit: finalPrice,
      payment_method_id: paymentMethodSelected.id,
      created_by: parseInt(localStorage.getItem("id"), 10),
    }

    const createBoulderPurchaseCall = await createBoulderPurchase(
      boulderPurchaseBody,
    )
    success =
      createBoulderPurchaseCall.message === "bouderPayment created successfully"

    if (paymentMethodSelected.id === 2) {
      const searchIfExists = await searchDigitalPaymentByUserAndDate(
        paymentUserSelected.id,
        `${day}-${month}-${year}`,
      )

      if (searchIfExists.data.length > 0) {
        const digitalPaymentBody: MPUserPayment = {
          id: searchIfExists.data[0].id,
          user_id: searchIfExists.data[0].user_id,
          user_name: searchIfExists.data[0].user_name,
          date: searchIfExists.data[0].date,
          month: searchIfExists.data[0].month,
          month_id: searchIfExists.data[0].month_id,
          total_profit: searchIfExists.data[0].total_profit + finalPrice,
          created_by: parseInt(localStorage.getItem("id"), 10),
        }

        const editDigitalPayment = await updateDigitalPayment(
          digitalPaymentBody,
        )

        success = editDigitalPayment.message === "payment updated successfully"
      } else {
        const digitalPaymentBody: MPUserPayment = {
          id: 0,
          user_id: paymentUserSelected.id,
          user_name: paymentUserSelected.display_name,
          date: `${day}-${month}-${year}`,
          month: months.filter(m => m.id === parseInt(`${month}`, 10))[0]
            .display_name,
          month_id: parseInt(`${month}`, 10),
          total_profit: finalPrice,
          created_by: parseInt(localStorage.getItem("id"), 10),
        }

        const createDigitalPaymentCall = await createDigitalPayment(
          digitalPaymentBody,
        )
        success =
          createDigitalPaymentCall.message === "payment created successfully"
      }
    }
    return success
  }

  const executePurchase = async e => {
    e.preventDefault()
    setDisablePurchaseButton(true)

    let success: boolean = false
    let canShowModalError = true

    if (clientIsRegistered) {
      canShowModalError = true

      if (clientSelected.is_student === `${yesOrNoArr[1].display_name}`) {
        const bodyEditPartner = {
          ...clientSelected,
          is_student: `${yesOrNoArr[0].display_name}`,
        }

        const editPartnerCall = await editPartner(bodyEditPartner)
        success = editPartnerCall.message === "partner updated successfully"
      }

      const createPur = await createLessonPurchaseFunc(
        clientSelected.id,
        clientSelected.name,
        clientSelected.last_name,
      )

      success = createPur

      if (paid && !buyedCombo) {
        const boulderPurchase = await createBoulderPurchaseCallFunc()
        success = boulderPurchase && createPur
      }
    } else {
      const seeDuplicated = await searchPartner(
        newPartnerData.identification_number,
        1,
      )
      if (seeDuplicated.data.length > 0) {
        setIdentificationError(true)
        canShowModalError = false
      } else {
        canShowModalError = true
        setIdentificationError(false)

        const formatName = cleanPartnerData(newPartnerData.name)
        const formatLastName = cleanPartnerData(newPartnerData.last_name)

        const createBody = {
          ...newPartnerData,
          name: formatName,
          last_name: formatLastName,
        }

        const createPartnerCall = await createPartner(createBody)
        if (createPartnerCall.message === "partner created successfully") {
          const pur = await createLessonPurchaseFunc(
            createPartnerCall.partnerId,
            formatName,
            formatLastName,
          )
          success = pur
        }

        if (paid && !buyedCombo) {
          const boulderPurchase = await createBoulderPurchaseCallFunc()
          success = boulderPurchase
        }
      }
    }

    if (success) {
      setModalSuccess({
        status: "success",
        icon: "IconCheckModal",
        title: `${generalTexts.modalTitles.success}`,
        content: `${trainerTexts.createPurchase.successModal.content}`,
      })
      setCreateLessonPurchaseView(false)
    }
    if (canShowModalError && !success) {
      setModalError({
        status: "alert",
        icon: "IconExclamation",
        title: `${generalTexts.modalTitles.error}`,
        content: `${trainerTexts.createPurchase.errorModal.content}`,
      })
      setCreateLessonPurchaseView(false)
    }
  }

  const fillData = async () => {
    const pricesCall = await getPrices()
    setPrices(pricesCall.data)
  }

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <PartnersProvider>
        <Header />
      </PartnersProvider>
      <Modals />
      <Container>
        <Title>
          <div>
            {generalTexts.sections.trainers}
            <span>
              {" "}
              /{" "}
              {router.query.students === "true"
                ? `${trainerTexts.students}`
                : `${trainerTexts.calendar}`}
            </span>
          </div>
        </Title>
        {router.query.calendar === "true" && canViewCalendar && (
          <CalendarView />
        )}
        {router.query.calendar === "true" && !canViewCalendar && (
          <NoPermissionsView />
        )}
        {router.query.students === "true" && canViewStudents && (
          <StudentsView />
        )}
        {router.query.students === "true" && !canViewStudents && (
          <NoPermissionsView />
        )}

        {canViewCalendar && (
          <ButtonContainer>
            {router.query.calendar === "true" && (
              <EditButton
                disabled={purchaseSelected === null || !calendarActions.update}
                onClick={() => {
                  if (purchaseSelected !== null && calendarActions.update) {
                    setEditLessonDateView(true)
                  }
                }}
              >
                <Icon icon="IconEdit" color="#fff" />
              </EditButton>
            )}
            <PurchaseButton
              disabledButton={!calendarActions.create}
              onClick={() => {
                if (calendarActions.create) {
                  setCreateLessonPurchaseView(true)
                }
              }}
            >
              <Icon icon="IconAdd" color="#fff" />
            </PurchaseButton>
          </ButtonContainer>
        )}

        {editLessonDateView && (
          <EditLessonDate cancelEdit={() => setEditLessonDateView(false)} />
        )}
        {createLessonPurchaseView && (
          <CreatePurchaseModal
            handleCreatePurchase={executePurchase}
            cancelCreatePurchase={cancelPurchase}
          />
        )}
      </Container>
    </>
  )
}

export default TrainersView
