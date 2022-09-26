import React, { useState, useEffect, useContext } from "react"
// SERVICES
import { getSchedule } from "services/Trainers/Schedule.service"
import { getClasesPaid } from "services/Partners/PartnerPayments.service"
import { Clases } from "contexts/Clases"
// DATA STORAGE & TYPES
import texts from "strings/trainers.json"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
// COMPONENTS & STYLING
import Header from "components/UI/Header"
import ScrollView from "components/UI/ScrollView"
import ClasesCard from "./ClasesCard"
import {
  Container,
  Title,
  SectionsButtons,
  Section,
  CardsContainer,
  FiltersContainer,
  FilterButton,
} from "./styles"

function TrainersView() {
  const {
    setSchedule,
    clasesPurchased,
    setClasesPurchased,
    schedule,
    filterSelected,
    setFilterSelected,
    triggerListUpdate,
  } = useContext(Clases)

  const [sectionSelected, setSectionSelected] = useState<{
    section: string
    id: number
  }>({
    section: `${texts.students}`,
    id: 1,
  })

  const cleanDataForStorage = (purchases: ClasesPurchasedInterface[]) => {
    const newPurchasesList = purchases
    newPurchasesList.map((purchase, index) => {
      const cleanedValueForDaysAndHours = purchase.days_and_hours
        .split(",")
        .map((lesson: string) => parseInt(lesson, 10))
      newPurchasesList[index].days_and_hours = cleanedValueForDaysAndHours
      return 0
    })

    if (filterSelected !== null) {
      const lessonsFiltered = newPurchasesList.filter(
        purchase => purchase.days_and_hours.indexOf(filterSelected) !== -1,
      )
      setClasesPurchased(lessonsFiltered)
    } else {
      setClasesPurchased(newPurchasesList)
    }
  }

  const fillData = async () => {
    const scheduleDataCall = await getSchedule()
    setSchedule(scheduleDataCall.data)

    const lessonsPaidCall = await getClasesPaid()
    const assignValues = lessonsPaidCall.data.filter(
      (payment: ClasesPurchasedInterface) => payment.days_and_hours !== "",
    )

    cleanDataForStorage(assignValues)
  }

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSelected, triggerListUpdate])

  return (
    <>
      <Header />
      <Container>
        <SectionsButtons>
          <Section
            onClick={() =>
              setSectionSelected({ section: `${texts.students}`, id: 1 })
            }
            selected={sectionSelected.id === 1}
          >
            Alumnos
          </Section>
          <Section
            onClick={() =>
              setSectionSelected({ section: `${texts.calendar}`, id: 2 })
            }
            selected={sectionSelected.id === 2}
          >
            {texts.calendar}
          </Section>
        </SectionsButtons>

        <Title>
          <div>
            {texts.trainers}
            <span> / {sectionSelected.section}</span>
          </div>
          {sectionSelected.id === 1 && (
            <FiltersContainer>
              {schedule.length &&
                schedule.map(
                  (uniqueSchedule: {
                    id: number
                    day_and_hour: string
                    max_students: number
                  }) => (
                    <FilterButton
                      key={uniqueSchedule.id}
                      selected={filterSelected === uniqueSchedule.id}
                      onClick={() => setFilterSelected(uniqueSchedule.id)}
                    >
                      {uniqueSchedule.day_and_hour}
                    </FilterButton>
                  ),
                )}
              <FilterButton
                onClick={() => setFilterSelected(null)}
                selected={filterSelected === null}
              >
                {texts.all}
              </FilterButton>
            </FiltersContainer>
          )}
        </Title>
        {sectionSelected.id === 1 && (
          <ScrollView height={550}>
            <CardsContainer>
              {clasesPurchased.length > 0 &&
                clasesPurchased.map(lesson => (
                  <ClasesCard key={lesson.id} data={lesson} />
                ))}
            </CardsContainer>
          </ScrollView>
        )}
      </Container>
    </>
  )
}

export default TrainersView
