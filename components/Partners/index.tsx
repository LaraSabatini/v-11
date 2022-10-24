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
// COMPONENTS & STYLING
import theme from "theme/index"
import Icon from "components/UI/Assets/Icon"
import SearchBar from "components/UI/SearchBar"
import Tooptip from "components/UI/Tooltip"
import Header from "components/UI/Header"
import NoPermissionsView from "components/UI/NoPermitsView"
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

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections
  const routeName = router.pathname.slice(1, router.pathname.length)

  const sectionPermissions = permissions.filter(
    section => section.name === routeName,
  )[0]

  const routeQuery = Object.keys(router.query)[0]

  const queryClients = routeQuery === "clients"
  const queryPrices = routeQuery === "prices"

  const canCreatePartner = sectionPermissions.sub_sections.filter(
    subSection => subSection.name === "clients",
  )[0].actions.create

  const canViewClients = sectionPermissions.sub_sections.filter(
    subSection => subSection.name === "clients",
  )[0].view

  const canViewPrices = sectionPermissions.sub_sections.filter(
    subSection => subSection.name === "prices",
  )[0].view

  const [searchValue, setSearchValue] = useState<string>("")

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

  const searchPartnerInDB = async () => {
    setFilterSelected("all")
    setPartnerSelected(null)

    const executeSearch = await searchPartner(searchValue, 1)
    setPartners(executeSearch.data)
  }

  useEffect(() => {
    if (queryClients && canViewClients) {
      if (searchValue.length >= 3) {
        searchPartnerInDB()
      } else {
        setPartnerList()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterSelected,
    currentPage,
    searchValue,
    triggerListUpdate,
    queryClients,
    canViewClients,
  ])

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
          {queryClients && canViewClients && <Filters />}
        </HeadContent>

        {queryClients && canViewClients && (
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
                <PartnerDetails
                  permits={
                    sectionPermissions.sub_sections.filter(
                      subSection => subSection.name === "clients",
                    )[0].actions
                  }
                />
              ) : (
                <div style={{ width: "440px" }} />
              )}
            </ListAndDetailContainer>
          </>
        )}
        {queryClients && !canViewClients && <NoPermissionsView />}

        {queryPrices && canViewPrices && <Prices />}

        {queryPrices && !canViewPrices && <NoPermissionsView />}

        {queryClients && canViewClients && (
          <MainButton>
            <Tooptip
              title={
                canCreatePartner
                  ? `${partnerTexts.mainButton}`
                  : `${generalTexts.permits.action_title}`
              }
            >
              <AddPartner
                disabled={!canCreatePartner}
                onClick={() => {
                  if (canCreatePartner) {
                    if (hasChanges) {
                      setModalHasChanges(true)
                    } else {
                      setDetailState("view")
                      setCreateModal(true)
                    }
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
