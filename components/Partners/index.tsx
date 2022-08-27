import React, { useContext } from "react"
import texts from "strings/partners.json"
import { PartnersContext } from "contexts/Partners"
import Icon from "components/UI/Assets/Icon"
import Tooptip from "components/UI/Tooltip"
import theme from "theme/index"
import Header from "components/UI/Header"
import PartnersList from "./PartnersList"
import {
  Container,
  Title,
  Content,
  FiltersContainer,
  Filter,
  HeadContent,
  AddPartner,
  MainButton,
} from "./styles"

function PartnersView() {
  const { filterSelected, setFilterSelected, filters } =
    useContext(PartnersContext)

  const selectFilter = (type: string) => {
    if (filterSelected === null || filterSelected !== type) {
      setFilterSelected(type)
    } else if (filterSelected === type) {
      setFilterSelected("all")
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <HeadContent>
          <Title>{texts.title}</Title>
          <FiltersContainer>
            {filters &&
              filters.map((filter: { value: string; text: string }) => {
                return (
                  <Filter
                    onClick={() => selectFilter(filter.value)}
                    selected={filterSelected === filter.value}
                  >
                    {filter.text}
                  </Filter>
                )
              })}
          </FiltersContainer>
        </HeadContent>
        <PartnersList />
        <MainButton>
          <Tooptip title={texts.mainButton}>
            <AddPartner>
              <Icon color={theme.colors.white} icon="IconAdd" />
            </AddPartner>
          </Tooptip>
        </MainButton>
      </Content>
    </Container>
  )
}

export default PartnersView
