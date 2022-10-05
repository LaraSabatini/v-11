/* eslint-disable no-console */
import React, { useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
// SERVICES
import getTrainers from "services/Trainers/GetTrainers.service"
import { getPrices } from "services/Partners/Prices.service"
// import { createLessonPurchase } from "services/Trainers/LessonsPurchased.service"
// import {createBoulderPurchase} from 'services/Finances/Bouderpurchases.service'
// import {createDigitalPayment} from 'services/Finances/DigitalPayments.service'
// DATA STORAGE & TYPES
import texts from "strings/trainers.json"
import { Clases } from "contexts/Clases"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
import { day, month, year, months } from "const/fixedVariables"
// COMPONENTS & STYLING
import Header from "components/UI/Header"
import Icon from "components/UI/Assets/Icon"
import CalendarView from "./CalendarView"
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
    purchasesSelected,
    setNewPurchases,
    setTrainersList,
    setPrices,
    setAmountOfLessons,
    setDatesSelected,
    setPaymentMethodSelected,
    setPaid,
    setClientSelected,
    setFinalPrice,
    clientIsRegistered,
    clientRef,
    amountOfLessonsRef,
    trainerSelectedRef,
    lessonRef,
    shiftRef,
    paysNowRef,
    paymentMethodRef,
    paymentUserRef,
    paid,
    setClientIsRegistered,
    amountOfLessons,
    datesSelected,
    clientSelected,
    trainerSelected,
    finalPrice,
    paymentMethodSelected,
    paymentUserSelected,
  } = useContext(Clases)
  const router = useRouter()

  const [editLessonDateView, setEditLessonDateView] = useState<boolean>(false)
  const [
    createLessonPurchaseView,
    setCreateLessonPurchaseView,
  ] = useState<boolean>(false)

  const cancelPurchase = e => {
    e.preventDefault()
    setNewPurchases(null)
    setCreateLessonPurchaseView(false)
    setAmountOfLessons(0)
    setDatesSelected([])
    setPaymentMethodSelected(null)
    setPaid(null)
    setClientSelected(null)
    setFinalPrice(0)
    setClientIsRegistered(null)
  }

  const executePurchase = async e => {
    e.preventDefault()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const success: boolean = false
    // createLessonPurchase
    // createPartnerPayment
    // digital payments => searchByUserAndDate
    //    si existe    => updateDigitalPayment
    //    si no existe => createDigitalPayment
    await clientRef.current?.focus()
    await amountOfLessonsRef.current?.focus()
    await trainerSelectedRef.current?.focus()
    await lessonRef.current?.focus()
    await shiftRef.current?.focus()
    await paysNowRef.current?.focus()

    if (paid) {
      await paymentMethodRef.current?.focus()
      await paymentUserRef.current?.focus()
    }
    await clientRef.current?.focus()

    if (clientIsRegistered) {
      for (let i = 0; i < amountOfLessons; i += 1) {
        const lessonDay = `${datesSelected[i].date.slice(
          6,
          10,
        )}-${datesSelected[i].date.slice(3, 5)}-${datesSelected[i].date.slice(
          0,
          2,
        )}`
        const currentDate = new Date(lessonDay)
        const startDate = new Date(currentDate.getFullYear(), 0, 1)
        const days = Math.floor(
          (currentDate.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000),
        )
        const weekNumber = Math.ceil(days / 7)

        const body: ClasesPurchasedInterface = {
          id: 0,
          lesson_date: datesSelected[i].date,
          shift: datesSelected[i].shift,
          partner_id: clientSelected.id,
          partner_name: clientSelected.name,
          partner_last_name: clientSelected.last_name,
          trainer_id: trainerSelected.id,
          trainer_name: trainerSelected.display_name,
          week_id: weekNumber,
          paid: paid ? "SI" : "NO",
        }
        console.log("lesson pur", body)

        // const createLessonPurchaseCall = await createLessonPurchase(body)
      }
      if (paid) {
        const boulderPurchaseBody: {
          id: number
          date: string
          item_id: number
          item_name: string
          amount_of_items: number
          profit: number
          payment_method_id: number
        } = {
          id: 0,
          date: `${day}-${month}-${year}`,
          item_id: 4,
          item_name: "Clases",
          amount_of_items: amountOfLessons,
          profit: finalPrice,
          payment_method_id: paymentMethodSelected.id,
        }
        console.log("boulder pur", boulderPurchaseBody)
        // const createBoulderPurchaseCall = await createBoulderPurchase(body)

        // create boulder purchase
        if (paymentMethodSelected.id === 2) {
          const digitalPaymentBody: {
            id: number
            user_id: number
            user_name: string
            date: string
            month: string
            month_id: number
            total_profit: number
          } = {
            id: 0,
            user_id: paymentUserSelected.id,
            user_name: paymentUserSelected.display_name,
            date: `${day}-${month}-${year}`,
            month: months.filter(m => m.id === parseInt(`${month}`, 10))[0]
              .display_name,
            month_id: parseInt(`${month}`, 10),
            total_profit: finalPrice,
          }
          console.log("digital payment", digitalPaymentBody)
          // const createDigitalPaymentCall = await createDigitalPayment(digitalPaymentBody)
        }
      }
    }
    // } else {
    // }
  }

  const fillData = async () => {
    const trainersCall = await getTrainers()

    const trainerArr = []
    trainersCall.data.map(trainer =>
      trainerArr.push({
        id: trainer.id,
        display_name: trainer.name,
      }),
    )
    setTrainersList(trainerArr)

    const pricesCall = await getPrices()
    setPrices(pricesCall.data)
  }

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <Container>
        <Title>
          <div>
            {texts.trainers}
            <span>
              {" "}
              /{" "}
              {router.query.students === "true"
                ? "Alumnos"
                : "Calendario de clases"}
            </span>
          </div>
          {router.query.students === "true" && <p>search bar</p>}
        </Title>
        {router.query.students === "true" && <p>ALUMNOS CARDS</p>}
        {router.query.calendar === "true" && <CalendarView />}
        <ButtonContainer>
          <EditButton
            disabled={purchasesSelected !== 0}
            onClick={() => {
              if (purchasesSelected !== 0) {
                setEditLessonDateView(true)
              }
            }}
          >
            <Icon icon="IconEdit" color="#fff" />
          </EditButton>
          <PurchaseButton onClick={() => setCreateLessonPurchaseView(true)}>
            <Icon icon="IconAdd" color="#fff" />
          </PurchaseButton>
        </ButtonContainer>

        {editLessonDateView && <EditLessonDate />}
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
