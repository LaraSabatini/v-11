import React, { useContext } from "react"
import { PartnersContext } from "contexts/Partners"
import partnerTexts from "strings/partners.json"
import yesOrNoArr from "const/fixedVariables"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import theme from "theme/index"
import ScrollView from "components/UI/ScrollView"
import Pagination from "components/UI/Pagination"
import Icon from "components/UI/Assets/Icon"
import {
  ListContainer,
  ListItem,
  Container,
  Tags,
  Student,
  FreePass,
  IconContainer,
  Paginator,
  NoPartnersView,
  Day,
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
  } = useContext(PartnersContext)

  const selectPartner = (partner: number) => {
    if (partnerSelected === null || partnerSelected !== partner) {
      setPartnerSelected(partner)
    } else if (partnerSelected === partner) {
      setPartnerSelected(null)
    }
  }

  return (
    <Container>
      <ScrollView height={450}>
        <ListContainer>
          {partners.length > 0 ? (
            partners.map((partner: PartnerInterface) => {
              return (
                <ListItem
                  key={partner.id}
                  onClick={() => {
                    if (hasChanges) {
                      setModalHasChanges(true)
                    } else {
                      selectPartner(partner.id)
                      setDetailState("view")
                    }
                  }}
                >
                  <p className="name">
                    {partner.name} {partner.last_name}
                  </p>
                  <p className="partnerNumber">N°: {partner.id}</p>
                  <Tags>
                    {partner.is_student ===
                      `${yesOrNoArr[0].display_name.toUpperCase()}` && (
                      <Student>{partnerTexts.student}</Student>
                    )}
                    {partner.free_pass !== 0 && (
                      <FreePass>{partnerTexts.free_pass}</FreePass>
                    )}
                    {partner.free_pass === 0 &&
                      partner.is_student ===
                        `${yesOrNoArr[1].display_name.toUpperCase()}` && (
                        <Day>{partnerTexts.day}</Day>
                      )}
                  </Tags>

                  <IconContainer active={partnerSelected === partner.id}>
                    <Icon icon="IconArrowRight" color={theme.colors.primary} />
                  </IconContainer>
                </ListItem>
              )
            })
          ) : (
            <NoPartnersView>{partnerTexts.no_more}</NoPartnersView>
          )}
        </ListContainer>
      </ScrollView>
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
