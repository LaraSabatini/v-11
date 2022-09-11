import React, { useContext, useState, useEffect } from "react"
import texts from "strings/partners.json"
import getFreePassPartners from "services/Partners/GetFreePass.service"
import searchPartner from "services/Partners/SearchPartner.service"
import getStudents from "services/Partners/GetStudents.service"
import getPartners from "services/Partners/GetPartners.service"
import { PartnersContext } from "contexts/Partners"
import Icon from "components/UI/Assets/Icon"
import SearchBar from "components/UI/SearchBar"
import Tooptip from "components/UI/Tooltip"
import theme from "theme/index"
import Header from "components/UI/Header"
import AddPayment from "./PaymentsHistory/AddPayment"
import Modals from "./Modals"
import PartnersList from "./PartnersList"
import PartnerDetails from "./PartnerDetails"
import CreatePartner from "./CreatePartner"
import Filters from "./Filters"
import PaymentsHistory from "./PaymentsHistory"
import {
  Container,
  Title,
  Content,
  HeadContent,
  AddPartner,
  MainButton,
  ListAndDetailContainer,
  SearchBarContainer,
  Section,
  SectionsButtons,
} from "./styles"

function PartnersView() {
  const {
    filterSelected,
    setFilterSelected,
    partnerSelected,
    setPartners,
    currentPage,
    setCurrentPage,
    partners,
    hasChanges,
    setModalHasChanges,
    setDetailState,
    triggerListUpdate,
  } = useContext(PartnersContext)

  const [sectionSelected, setSectionSelected] = useState<{
    section: string
    id: number
  }>({
    section: "Clientes",
    id: 1,
  })

  const [createModal, setCreateModal] = useState<boolean>(false)
  const [addPaymentModal, setAddPaymentModal] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>("")

  const setPartnerList = async () => {
    if (searchValue.length === 0) {
      if (filterSelected === "all") {
        const data = await getPartners(currentPage)
        setPartners(data.data)
      } else if (filterSelected === "students") {
        const data = await getStudents(currentPage)
        setPartners(data.data)
      } else {
        const data = await getFreePassPartners(currentPage)
        setPartners(data.data)
      }
    }
  }

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goNext = () => {
    if (partners.length > 0) {
      setCurrentPage(currentPage + 1)
    }
  }

  const searchPartnerInDB = async () => {
    setFilterSelected("all")

    if (searchValue.length > 2) {
      const executeSearch = await searchPartner(searchValue, 1)
      setPartners(executeSearch.data)
    } else if (searchValue.length === 0) {
      const data = await getPartners(1)
      setPartners(data.data)
    }
  }

  useEffect(() => {
    searchPartnerInDB()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  useEffect(() => {
    setPartnerList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSelected, currentPage, searchValue, triggerListUpdate])

  return (
    <Container>
      <Modals />
      <Header />
      <Content>
        <SectionsButtons>
          <Section
            onClick={() => {
              if (hasChanges) {
                setModalHasChanges(true)
              } else {
                setSectionSelected({ section: "Clientes", id: 1 })
              }
            }}
            selected={sectionSelected.id === 1}
          >
            Clientes
          </Section>
          <Section
            onClick={() => {
              if (hasChanges) {
                setModalHasChanges(true)
              } else {
                setSectionSelected({ section: "Historial de pagos", id: 2 })
              }
            }}
            selected={sectionSelected.id === 2}
          >
            Historial de pagos
          </Section>
        </SectionsButtons>
        <HeadContent>
          <Title>
            {texts.title} <span> / {sectionSelected.section}</span>
          </Title>
          {sectionSelected.id === 1 && <Filters />}
        </HeadContent>

        {sectionSelected.id === 1 && (
          <>
            <SearchBarContainer
              onClick={() => {
                if (hasChanges) {
                  setModalHasChanges(true)
                } else {
                  setDetailState("view")
                }
              }}
            >
              <SearchBar
                searchValue={searchValue}
                onChangeSearch={e => setSearchValue(e.target.value)}
                width={250}
              />
            </SearchBarContainer>
            <ListAndDetailContainer>
              <PartnersList data={partners} goNext={goNext} goPrev={goPrev} />
              {partnerSelected !== null && <PartnerDetails />}
            </ListAndDetailContainer>
          </>
        )}
        {sectionSelected.id === 2 && <PaymentsHistory />}

        <MainButton>
          <Tooptip title={texts.mainButton}>
            <AddPartner
              onClick={() => {
                if (hasChanges) {
                  setModalHasChanges(true)
                } else {
                  setDetailState("view")
                  if (sectionSelected.id === 1) {
                    setCreateModal(true)
                  } else {
                    setAddPaymentModal(true)
                  }
                }
              }}
            >
              <Icon color={theme.colors.white} icon="IconAdd" />
            </AddPartner>
          </Tooptip>
        </MainButton>
      </Content>
      {createModal && (
        <CreatePartner cancelCreate={() => setCreateModal(false)} />
      )}
      {addPaymentModal && (
        <AddPayment cancelCreate={() => setAddPaymentModal(false)} />
      )}
    </Container>
  )
}

export default PartnersView
