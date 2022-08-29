import React, { useContext, useState } from "react"
import texts from "strings/partners.json"
import { PartnersContext } from "contexts/Partners"
import Icon from "components/UI/Assets/Icon"
import Tooptip from "components/UI/Tooltip"
import theme from "theme/index"
import Header from "components/UI/Header"
import PartnersList from "./PartnersList"
import PartnerDetails from "./PartnerDetails"
import CreatePartner from "./CreatePartner"
import {
  Container,
  Title,
  Content,
  FiltersContainer,
  Filter,
  HeadContent,
  AddPartner,
  MainButton,
  ListAndDetailContainer,
} from "./styles"

function PartnersView() {
  const {
    filterSelected,
    setFilterSelected,
    filters,
    partnerSelected,
  } = useContext(PartnersContext)

  const [createModal, setCreateModal] = useState<boolean>(false)

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
        <ListAndDetailContainer>
          <PartnersList />
          {partnerSelected !== null && <PartnerDetails />}
        </ListAndDetailContainer>
        <MainButton>
          <Tooptip title={texts.mainButton}>
            <AddPartner onClick={() => setCreateModal(true)}>
              <Icon color={theme.colors.white} icon="IconAdd" />
            </AddPartner>
          </Tooptip>
        </MainButton>
      </Content>
      {createModal && (
        <CreatePartner cancelCreate={() => setCreateModal(false)} />
      )}
    </Container>
  )
}

export default PartnersView
