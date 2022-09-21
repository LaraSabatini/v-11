import React, { useState, useEffect, useContext } from "react"
import Header from "components/UI/Header"
import { Clases } from "contexts/Clases"
import { getSchedule } from "services/Trainers/Schedule.service"
import { getClasesPaid } from "services/Partners/PartnerPayments.service"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
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
    section: "Alumnos",
    id: 1,
  })

  const cleanData = (purchases: ClasesPurchasedInterface[]) => {
    const newArr = purchases

    newArr.map((pur, index) => {
      const newValue = pur.days_and_hours
        .split(",")
        .map(clas => parseInt(clas, 10))
      newArr[index].days_and_hours = newValue
      return 0
    })

    if (filterSelected !== null) {
      const arrFiltered = newArr.filter(
        purchase => purchase.days_and_hours.indexOf(filterSelected) !== -1,
      )
      setClasesPurchased(arrFiltered)
    } else {
      setClasesPurchased(newArr)
    }
  }

  const fillData = async () => {
    const scheduleData = await getSchedule()
    setSchedule(scheduleData.data)

    const data = await getClasesPaid()
    const assignValues = data.data.filter(
      payment => payment.days_and_hours !== "",
    )

    cleanData(assignValues)
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
            onClick={() => setSectionSelected({ section: "Alumnos", id: 1 })}
            selected={sectionSelected.id === 1}
          >
            Alumnos
          </Section>
          <Section
            onClick={() =>
              setSectionSelected({ section: "Calendario Clases", id: 2 })
            }
            selected={sectionSelected.id === 2}
          >
            Calendario Clases
          </Section>
        </SectionsButtons>

        <Title>
          <div>
            Profesores
            <span> / {sectionSelected.section}</span>
          </div>
          {sectionSelected.id === 1 && (
            <FiltersContainer>
              {schedule.length &&
                schedule.map(s => (
                  <FilterButton
                    selected={filterSelected === s.id}
                    onClick={() => setFilterSelected(s.id)}
                  >
                    {s.day_and_hour}
                  </FilterButton>
                ))}
              <FilterButton
                onClick={() => setFilterSelected(null)}
                selected={filterSelected === null}
              >
                Todos
              </FilterButton>
            </FiltersContainer>
          )}
        </Title>
        {sectionSelected.id === 1 && (
          <ScrollView height={550}>
            <CardsContainer>
              {clasesPurchased.length > 0 &&
                clasesPurchased.map(clas => (
                  <ClasesCard key={clas.id} data={clas} />
                ))}
            </CardsContainer>
          </ScrollView>
        )}
      </Container>
    </>
  )
}

export default TrainersView
