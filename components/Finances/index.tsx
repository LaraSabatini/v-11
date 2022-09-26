import React, { useState } from "react"
// COMPONENTS & STYLING
import Header from "components/UI/Header"
import Bills from "./Bills"
import Caja from "./Caja"
import Earnings from "./Earnings"
import WorkingHours from "./WorkingHours"
import FiltersCaja from "./Caja/Filters"
import {
  MainContainer,
  Content,
  SectionButtonsContainer,
  Section,
  Title,
  HeadContent,
} from "./styles"

const FinancesView = () => {
  const [sectionSelected, setSectionSelected] = useState<{
    section: string
    id: number
  }>({
    section: "Ganancias diarias (Boulder)",
    id: 1,
  })

  const sections = [
    {
      section: "Ganancias diarias (Boulder)",
      id: 1,
    },
    {
      section: "Gastos",
      id: 2,
    },
    {
      section: "Horas de trabajo",
      id: 3,
    },
    {
      section: "Ingresos",
      id: 4,
    },
  ]

  return (
    <MainContainer>
      <Header />
      <Content>
        <SectionButtonsContainer>
          {sections.map((section: { section: string; id: number }) => (
            <Section
              onClick={() => {
                setSectionSelected(section)
              }}
              selected={sectionSelected.id === section.id}
            >
              {section.section}
            </Section>
          ))}
        </SectionButtonsContainer>
        <HeadContent>
          <Title>
            Finanzas <span> / {sectionSelected.section}</span>
          </Title>
          {sectionSelected.id === 1 && <FiltersCaja />}
        </HeadContent>
        {sectionSelected.id === 1 && <Caja />}
        {sectionSelected.id === 2 && <Bills />}
        {sectionSelected.id === 3 && <WorkingHours />}
        {sectionSelected.id === 4 && <Earnings />}
      </Content>
    </MainContainer>
  )
}

export default FinancesView
