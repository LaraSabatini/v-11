import React, { useContext, useState } from "react"
import { useRouter } from "next/router"
// DATA STORAGE & TYPES
import {
  createPartnerAction,
  searchPartnerAction,
  editPartnerAction,
} from "helpers/partners"
import {
  makeAppropiatePayment,
  createBoulderPurchaseAction,
} from "helpers/payments"
import { createLessonPurchaseAction } from "helpers/lessons"
import PartnersProvider from "contexts/Partners"
import trainerTexts from "strings/trainers.json"
import generalTexts from "strings/general.json"
import { Lessons } from "@contexts/Lessons"
import { day, month, year, months } from "const/time"
import yesOrNoArr from "const/fixedVariables"
import { cleanPartnerData } from "utils"
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

      //  eslint-disable-next-line no-await-in-loop
      const createLessonPurchaseCall = await createLessonPurchaseAction({
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
      })
      success = createLessonPurchaseCall
    }
    return success
  }

  const createBoulderPurchaseCallFunc = async () => {
    let success: boolean = false

    const createBoulderPurchaseCall = await createBoulderPurchaseAction({
      id: 0,
      date: `${day}-${month}-${year}`,
      item_id: 4,
      item_name: `${trainerTexts.lessons}`,
      amount_of_items: amountOfLessons,
      profit: finalPrice,
      payment_method_id: paymentMethodSelected.id,
      created_by: parseInt(localStorage.getItem("id"), 10),
    })
    success = createBoulderPurchaseCall

    if (paymentMethodSelected.id === 2) {
      const makePayment = await makeAppropiatePayment(
        paymentUserSelected.id,
        finalPrice,
        {
          id: 0,
          user_id: paymentUserSelected.id,
          user_name: paymentUserSelected.display_name,
          date: `${day}-${month}-${year}`,
          month: months.filter(m => m.id === parseInt(`${month}`, 10))[0]
            .display_name,
          month_id: parseInt(`${month}`, 10),
          total_profit: finalPrice,
          created_by: parseInt(localStorage.getItem("id"), 10),
        },
      )
      success = makePayment
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
        const editPartnerCall = await editPartnerAction({
          ...clientSelected,
          is_student: `${yesOrNoArr[0].display_name}`,
        })
        success = editPartnerCall
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
      const seeDuplicated = await searchPartnerAction(
        newPartnerData.identification_number,
      )
      if (seeDuplicated.data.length > 0) {
        setIdentificationError(true)
        canShowModalError = false
      } else {
        canShowModalError = true
        setIdentificationError(false)

        const formatName = cleanPartnerData(newPartnerData.name)
        const formatLastName = cleanPartnerData(newPartnerData.last_name)

        const createPartnerCall = await createPartnerAction({
          ...newPartnerData,
          name: formatName,
          last_name: formatLastName,
        })
        if (createPartnerCall.success) {
          const pur = await createLessonPurchaseFunc(
            createPartnerCall.partnerId,
            formatName,
            formatLastName,
          )
          success = pur
        }

        if (paid) {
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
