/* eslint-disable no-console */
import React, { useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
// SERVICES
import getTrainers from "services/Trainers/GetTrainers.service"
import { getPrices } from "services/Partners/Prices.service"
// DATA STORAGE & TYPES
import texts from "strings/trainers.json"
import { Clases } from "contexts/Clases"
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
  }

  const executePurchase = e => {
    e.preventDefault()
    console.log("ejecutar pur")
    // createLessonPurchase
    // getPrices
    // chequear cuantas compro por condicional de precios
    // createPartnerPayment
    // digital payments => searchByUserAndDate
    //    si existe    => updateDigitalPayment
    //    si no existe => createDigitalPayment
    //
    //
    // EVALUAR QUE paid SEA TRUE !!!!
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
