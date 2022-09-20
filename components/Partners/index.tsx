import React, { useContext, useState, useEffect } from "react"
import texts from "strings/partners.json"
import {
  searchPartner,
  getPartners,
  getStudents,
  getFreePassPartners,
} from "services/Partners/Partner.service"
import { PartnersContext } from "contexts/Partners"
import PaymentsHistoryProvider from "contexts/PaymentsHistory"
import Icon from "components/UI/Assets/Icon"
import SearchBar from "components/UI/SearchBar"
import Tooptip from "components/UI/Tooltip"
import theme from "theme/index"
import Header from "components/UI/Header"
import Modals from "./Modals"
import PartnersList from "./PartnersList"
import PartnerDetails from "./PartnerDetails"
import CreatePartner from "./CreatePartner"
import Filters from "./Filters"
import Prices from "./Prices"
import PaymentsView from "./PaymentsView"
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
    createModal,
    setCreateModal,
    cleanStates,
  } = useContext(PartnersContext)

  const [sectionSelected, setSectionSelected] = useState<{
    section: string
    id: number
  }>({
    section: "Clientes",
    id: 1,
  })

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
                setSectionSelected({ section: "Precios", id: 3 })
              }
            }}
            selected={sectionSelected.id === 3}
          >
            Precios
          </Section>
          <Section
            onClick={() => {
              if (hasChanges) {
                setModalHasChanges(true)
              } else {
                setSectionSelected({ section: "Historial de pagos", id: 4 })
              }
            }}
            selected={sectionSelected.id === 4}
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
              {partnerSelected !== null ? (
                <PartnerDetails />
              ) : (
                <div style={{ width: "440px" }} />
              )}
            </ListAndDetailContainer>
          </>
        )}
        {sectionSelected.id === 3 && <Prices />}
        {sectionSelected.id === 4 && (
          <PaymentsHistoryProvider>
            <PaymentsView />
          </PaymentsHistoryProvider>
        )}
        {sectionSelected.id === 1 && (
          <MainButton>
            <Tooptip title={texts.mainButton}>
              <AddPartner
                onClick={() => {
                  if (hasChanges) {
                    setModalHasChanges(true)
                  } else {
                    setDetailState("view")
                    setCreateModal(true)
                  }
                }}
              >
                <Icon color={theme.colors.white} icon="IconAdd" />
              </AddPartner>
            </Tooptip>
          </MainButton>
        )}
      </Content>
      {createModal && <CreatePartner cancelCreate={() => cleanStates()} />}
    </Container>
  )
}

export default PartnersView
