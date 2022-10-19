import React, { useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
// SERVICES
import {
  searchPartner,
  getPartners,
  getStudents,
  getFreePassPartners,
} from "services/Partners/Partner.service"
// DATA STORAGE & TYPES
import partnerTexts from "strings/partners.json"
import generalTexts from "strings/general.json"
import { PartnersContext } from "contexts/Partners"
import PartnerInterface from "interfaces/partners/PartnerInterface"
// COMPONENTS & STYLING
import theme from "theme/index"
import Icon from "components/UI/Assets/Icon"
import SearchBar from "components/UI/SearchBar"
import Tooptip from "components/UI/Tooltip"
import Header from "components/UI/Header"
import Modals from "./Modals"
import PartnersList from "./PartnersList"
import PartnerDetails from "./PartnerDetails"
import CreatePartner from "./CreatePartner"
import Filters from "./Filters"
import Prices from "./Prices"
import {
  Container,
  Title,
  Content,
  HeadContent,
  AddPartner,
  MainButton,
  ListAndDetailContainer,
  SearchBarContainer,
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
    setPartnerSelected,
  } = useContext(PartnersContext)

  const router = useRouter()

  const [searchValue, setSearchValue] = useState<string>("")
  const [searchResults, setSearchResults] = useState<PartnerInterface[]>([])

  const setPartnerList = async () => {
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

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      setPartnerSelected(null)
    }
  }

  const goNext = () => {
    if (partners.length > 0) {
      setCurrentPage(currentPage + 1)
      setPartnerSelected(null)
    }
  }

  useEffect(() => {
    if (searchResults.length === 0) {
      setPartnerList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSelected, currentPage, triggerListUpdate, searchResults])

  const search = async () => {
    if (searchValue.length >= 3) {
      setFilterSelected("all")
      setPartnerSelected(null)

      const executeSearch = await searchPartner(searchValue, 1)

      setSearchResults(executeSearch.data)
    } else {
      setSearchResults([])
    }
  }

  useEffect(() => {
    search()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  return (
    <Container>
      <Modals />
      <Header />
      <Content>
        <HeadContent>
          <Title>
            {generalTexts.sections.home}{" "}
            <span>
              {" "}
              /{" "}
              {router.query.prices === "true"
                ? `${generalTexts.sections.prices}`
                : `${generalTexts.sections.home}`}
            </span>
          </Title>
          {router.query.clients === "true" && <Filters />}
        </HeadContent>

        {router.query.clients === "true" && (
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
              <PartnersList
                data={searchResults.length === 0 ? partners : searchResults}
                goNext={goNext}
                goPrev={goPrev}
              />
              {partnerSelected !== null ? (
                <PartnerDetails />
              ) : (
                <div style={{ width: "440px" }} />
              )}
            </ListAndDetailContainer>
          </>
        )}
        {router.query.prices === "true" && <Prices />}
        {router.query.clients === "true" && (
          <MainButton>
            <Tooptip title={partnerTexts.mainButton}>
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
