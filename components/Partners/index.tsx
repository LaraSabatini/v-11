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
import ModalAlert from "components/UI/ModalAlert"
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
  SearchBarContainer,
} from "./styles"

function PartnersView() {
  const {
    filterSelected,
    setFilterSelected,
    filters,
    partnerSelected,
    modalSuccess,
    setModalSuccess,
    modalError,
    setModalError,
    setPartners,
    currentPage,
    setCurrentPage,
    partners,
    hasChanges,
    setModalHasChanges,
    setDetailState,
  } = useContext(PartnersContext)

  const [createModal, setCreateModal] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>("")
  const [triggerListUpdate, setTriggerListUpdate] = useState<number>(1)

  const selectFilter = (type: string) => {
    if (filterSelected === "all" || filterSelected !== type) {
      setFilterSelected(type)
    } else if (filterSelected === type) {
      setFilterSelected("all")
    }
  }

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
      {modalSuccess !== null && (
        <ModalAlert
          success
          message={modalSuccess}
          closeRefresh={() => {
            setTriggerListUpdate(triggerListUpdate + 1)
            setModalSuccess(null)
          }}
        />
      )}
      {modalError !== null && (
        <ModalAlert
          success={false}
          message={modalError}
          closeRefresh={() => {
            setModalError(null)
          }}
        />
      )}
      <Header />
      <Content>
        <HeadContent>
          <Title>{texts.title}</Title>
          <FiltersContainer>
            {filters &&
              filters.map((filter: { value: string; text: string }) => {
                return (
                  <Filter
                    selected={filterSelected === filter.value}
                    onClick={() => {
                      if (hasChanges) {
                        setModalHasChanges(true)
                      } else {
                        setDetailState("view")
                        selectFilter(filter.value)
                      }
                    }}
                  >
                    {filter.text}
                  </Filter>
                )
              })}
          </FiltersContainer>
        </HeadContent>
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
      </Content>
      {createModal && (
        <CreatePartner cancelCreate={() => setCreateModal(false)} />
      )}
    </Container>
  )
}

export default PartnersView
