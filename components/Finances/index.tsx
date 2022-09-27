import React, { useContext } from "react"
// DATA STORAGE & TYPES
import { Finances } from "contexts/Finances"
import { financesSections } from "const/fixedVariables"
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
  const { sectionSelected, setSectionSelected } = useContext(Finances)

  return (
    <MainContainer>
      <Header />
      <Content>
        <SectionButtonsContainer>
          {financesSections.map((section: { section: string; id: number }) => (
            <Section
              key={section.id}
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
