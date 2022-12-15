import React, { useContext } from "react"
import { PartnersContext } from "contexts/Partners"
import partnerTexts from "strings/partners.json"
import yesOrNoArr from "const/fixedVariables"
import clientFilters from "const/partners"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import Pagination from "components/UI/Pagination"
import {
  Container,
  Paginator,
  NoPartnersView,
  ClientsContainer,
  FiltersRow,
  Tab,
  Line,
  InfoRow,
  FullName,
  PartnerNumber,
  Type,
  Identification,
  MemberSince,
  ClientList,
  ClientRow,
} from "./styles"

interface PartnerListInterface {
  goPrev: () => void
  goNext: () => void
}

function ListView({ goPrev, goNext }: PartnerListInterface) {
  const {
    partnerSelected,
    setPartnerSelected,
    currentPage,
    hasChanges,
    setModalHasChanges,
    setDetailState,
    totalPages,
    partners,
    filterSelected,
    setFilterSelected,
  } = useContext(PartnersContext)

  const selectPartner = (partner: number) => {
    if (partnerSelected === null || partnerSelected !== partner) {
      setPartnerSelected(partner)
    } else if (partnerSelected === partner) {
      setPartnerSelected(null)
    }
  }

  const selectFilter = (type: string) => {
    if (filterSelected === "all" || filterSelected !== type) {
      setFilterSelected(type)
      setPartnerSelected(null)
    } else if (filterSelected === type) {
      setFilterSelected("all")
      setPartnerSelected(null)
    }
  }

  return (
    <Container>
      <ClientsContainer>
        <FiltersRow>
          {clientFilters &&
            clientFilters.map((filter: { value: string; text: string }) => {
              return (
                <Tab
                  key={filter.value}
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
                </Tab>
              )
            })}
          <Line filterSelected={filterSelected} />
        </FiltersRow>
        <InfoRow>
          <FullName>{partnerTexts.infoTable.full_name}</FullName>
          <PartnerNumber className="tag">
            {partnerTexts.infoTable.number}
          </PartnerNumber>
          <Type type="">{partnerTexts.infoTable.type}</Type>
          <Identification>
            {partnerTexts.infoTable.identificationNumber}
          </Identification>
          <MemberSince>{partnerTexts.infoTable.member_since}</MemberSince>
        </InfoRow>
        <ClientRow>
          {partners.length > 0 ? (
            partners.map((partner: PartnerInterface) => {
              return (
                <ClientList
                  key={partner.id}
                  isSelected={partnerSelected === partner.id}
                  onClick={() => {
                    if (hasChanges) {
                      setModalHasChanges(true)
                    } else {
                      selectPartner(partner.id)
                      setDetailState("view")
                    }
                  }}
                >
                  <FullName>
                    {partner.name} {partner.last_name}
                  </FullName>
                  <PartnerNumber>{partner.id}</PartnerNumber>
                  {partner.is_student ===
                    `${yesOrNoArr[0].display_name.toUpperCase()}` &&
                    partner.free_pass !== 0 && (
                      <Type type="free-pass">
                        {partnerTexts.infoTable.studentAndFreePass}
                      </Type>
                    )}
                  {partner.is_student ===
                    `${yesOrNoArr[1].display_name.toUpperCase()}` &&
                    partner.free_pass !== 0 && (
                      <Type type="free-pass">{partnerTexts.free_pass}</Type>
                    )}
                  {partner.is_student ===
                    `${yesOrNoArr[0].display_name.toUpperCase()}` &&
                    partner.free_pass === 0 && (
                      <Type type="student">{partnerTexts.student}</Type>
                    )}
                  {partner.free_pass === 0 &&
                    partner.is_student ===
                      `${yesOrNoArr[1].display_name.toUpperCase()}` && (
                      <Type type="day">{partnerTexts.day}</Type>
                    )}
                  <Identification>
                    {partner.identification_number}
                  </Identification>
                  <MemberSince>{partner.membership_start_date}</MemberSince>
                </ClientList>
              )
            })
          ) : (
            <NoPartnersView>{partnerTexts.no_more}</NoPartnersView>
          )}
        </ClientRow>
      </ClientsContainer>
      <Paginator>
        <Pagination
          totalPages={totalPages}
          onClickNext={() => {
            if (hasChanges) {
              setModalHasChanges(true)
            } else {
              goNext()
              setDetailState("view")
            }
          }}
          onClickBack={() => {
            if (hasChanges) {
              setModalHasChanges(true)
            } else {
              goPrev()
              setDetailState("view")
            }
          }}
          setPage={currentPage}
        />
      </Paginator>
    </Container>
  )
}

export default ListView
