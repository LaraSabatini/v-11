import React, { useContext } from "react"
import texts from "strings/partners.json"
import { PartnersContext } from "contexts/Partners"
import Header from "components/UI/Header"
import {
  Container,
  Title,
  Content,
  FiltersContainer,
  Filter,
  HeadContent,
} from "./styles"

function PartnersView() {
  const { filterSelected, setFilterSelected, filters } =
    useContext(PartnersContext)

  const selectFilter = (type: string) => {
    if (filterSelected === null || filterSelected !== type) {
      setFilterSelected(type)
    } else if (filterSelected === type) {
      setFilterSelected(null)
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
      </Content>
    </Container>
  )
}

export default PartnersView
