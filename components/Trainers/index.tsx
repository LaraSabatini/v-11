/* eslint-disable no-console */
import React, {
  useState,
  // useEffect, useContext }
} from "react"
import Header from "components/UI/Header"
// import { Clases } from "contexts/Clases"
// import { getSchedule } from "services/Trainers/Schedule.service"
// import { getClasesPaid } from "services/Partners/GetPartnerPayments.service"
import ClasesCard from "./ClasesCard"
import {
  Container,
  Title,
  SectionsButtons,
  Section,
  CardsContainer,
} from "./styles"

function TrainersView() {
  // const {
  // clasesPurchased,
  // setClasesPurchased,
  // schedule,
  // setSchedule,
  // } = useContext(Clases)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [purchasesList, setPurchasesList] = useState<
    {
      id: number
      partner_id: number
      partner_name: string
      partner_last_name: string
      combo: number
      time_paid: number
      time_paid_unit: number
      clases_paid: number
      payment_method_id: number
      payment_method_name: string
      price_paid: number
      date: string
      payment_expire_date: string
      days_and_hours: string
    }[]
  >([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sectionSelected, setSectionSelected] = useState<{
    section: string
    id: number
  }>({
    section: "Clases",
    id: 1,
  })

  // const fillData = async () => {
  //   const data = await getClasesPaid()
  //   setPurchasesList(data.data)

  //   const scheduleData = await getSchedule()
  //   setSchedule(scheduleData.data)

  // const assignValues = data.data.filter(
  //   payment => payment.days_and_hours !== "",
  // )
  // }

  // useEffect(() => {
  //   fillData()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <>
      <Header />
      <Container>
        <SectionsButtons>
          <Section selected={sectionSelected.id === 1}>Clases</Section>
        </SectionsButtons>
        <Title>
          Profesores
          <span> / {sectionSelected.section}</span>
        </Title>
        <CardsContainer>
          <ClasesCard />
        </CardsContainer>
      </Container>
    </>
  )
}

export default TrainersView
