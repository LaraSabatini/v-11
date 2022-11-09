import React, { useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
// DATA STORAGE & TYPES
import { searchPartnerAction, getCombosAction } from "helpers/partners"
import partnerTexts from "strings/partners.json"
import generalTexts from "strings/general.json"
import { PartnersContext } from "contexts/Partners"
// COMPONENTS & STYLING
import theme from "theme/index"
import Icon from "components/UI/Assets/Icon"
import PopOver from "components/UI/PopOver"
import SearchBar from "components/UI/SearchBar"
import Tooptip from "components/UI/Tooltip"
import Header from "components/UI/Header"
import NoPermissionsView from "components/UI/NoPermitsView"
import { Title, HeadContent } from "theme/globalComponentStyles"
import Modals from "./Modals"
import PartnersList from "./PartnersList"
import PartnerDetails from "./PartnerDetails"
import CreatePartner from "./CreatePartner"
import Filters from "./Filters"
import Prices from "./Prices"
import setPartnerList from "./helpers/setPartnersList"
import {
  Container,
  Content,
  AddPartner,
  MainButton,
  ListAndDetailContainer,
  SearchBarContainer,
  HelpContainer,
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
    setCombos,
  } = useContext(PartnersContext)

  const router = useRouter()

  const getPermissions = localStorage.getItem("permissions")
  const permissions = JSON.parse(getPermissions)[0].sections[0].sub_sections

  const partnerActions = permissions[0].actions
  const canViewClients = permissions[0].view
  const pricesSection = permissions[1]

  const [searchValue, setSearchValue] = useState<string>("")
  const [totalPages, setTotalPages] = useState<number>(1)

  const [popOverView, setPopOverView] = useState<boolean>(false)

  const getPartnersList = async () => {
    const data = await setPartnerList(filterSelected, currentPage)
    setPartners(data.list)
    setTotalPages(data.numberOfPages)
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

    const executeSearch = await searchPartnerAction(searchValue)
    setPartners(executeSearch.data)
  }

  useEffect(() => {
    getPartnersList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSelected, currentPage, triggerListUpdate, canViewClients])

  const getCombosData = async () => {
    const combosData = await getCombosAction()
    setCombos(combosData)
  }

  useEffect(() => {
    getCombosData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          {Object.keys(router.query)[0] === "clients" && canViewClients && (
            <Filters />
          )}
        </HeadContent>

        {Object.keys(router.query)[0] === "clients" && canViewClients && (
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
                onChangeSearch={e => {
                  if (e.target.value === "") {
                    getPartnersList()
                    setSearchValue("")
                  } else {
                    setSearchValue(e.target.value)
                  }
                }}
                width={250}
                enterSearch={searchPartnerInDB}
              />
              <HelpContainer onClick={() => setPopOverView(!popOverView)}>
                <PopOver
                  title={generalTexts.search.title}
                  description={generalTexts.search.description}
                  view={popOverView}
                />
                <Icon icon="IconHelp" />
              </HelpContainer>
            </SearchBarContainer>
            <ListAndDetailContainer>
              <PartnersList
                totalPages={totalPages}
                data={partners}
                goNext={goNext}
                goPrev={goPrev}
              />
              {partnerSelected !== null ? (
                <PartnerDetails permits={partnerActions} />
              ) : (
                <div style={{ width: "440px" }} />
              )}
            </ListAndDetailContainer>
          </>
        )}
        {Object.keys(router.query)[0] === "clients" && !canViewClients && (
          <NoPermissionsView />
        )}

        {Object.keys(router.query)[0] === "prices" && pricesSection.view && (
          <Prices canEdit={pricesSection.actions.edit} />
        )}

        {Object.keys(router.query)[0] === "prices" && !pricesSection.view && (
          <NoPermissionsView />
        )}

        {Object.keys(router.query)[0] === "clients" && canViewClients && (
          <MainButton>
            <Tooptip
              title={
                partnerActions.create
                  ? `${partnerTexts.mainButton}`
                  : `${generalTexts.permits.action_title}`
              }
            >
              <AddPartner
                disabled={!partnerActions.create}
                onClick={() => {
                  if (partnerActions.create) {
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
