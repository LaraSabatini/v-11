import React, { useContext } from "react"
import { PartnersContext } from "contexts/Partners"
import texts from "strings/partners.json"
import ScrollView from "components/UI/ScrollView"
import Tooltip from "components/UI/Tooltip"
import Icon from "components/UI/Assets/Icon"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import theme from "theme"
import {
  ListContainer,
  ListItem,
  Name,
  Container,
  PartnerNumber,
  Tags,
  Student,
  FreePass,
  IconContainer,
  Paginator,
  Navigate,
  NoPartnersView,
  Day,
} from "./styles"

interface PartnerListInterface {
  data: PartnerInterface[]
  goPrev: () => void
  goNext: () => void
}

const PartnersList = ({ data, goPrev, goNext }: PartnerListInterface) => {
  const {
    partnerSelected,
    setPartnerSelected,
    currentPage,
    hasChanges,
    setModalHasChanges,
    setDetailState,
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
          {data.length > 0 ? (
            data.map((partner: PartnerInterface) => {
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
                  <Name>
                    {partner.name} {partner.last_name}
                  </Name>
                  <PartnerNumber>N°: {partner.id}</PartnerNumber>
                  <Tags>
                    {partner.trainer_id !== 0 && (
                      <Student>{texts.student}</Student>
                    )}
                    {partner.free_pass !== 0 && (
                      <FreePass>{texts.free_pass}</FreePass>
                    )}
                    {partner.free_pass === 0 && partner.trainer_id === 0 && (
                      <Day>Dia</Day>
                    )}
                  </Tags>

                  <IconContainer active={partnerSelected === partner.id}>
                    <Icon icon="IconArrowRight" color={theme.colors.primary} />
                  </IconContainer>
                </ListItem>
              )
            })
          ) : (
            <NoPartnersView>{texts.no_more}</NoPartnersView>
          )}
        </ListContainer>
      </ScrollView>
      <Paginator>
        <Navigate
          onClick={() => {
            if (hasChanges) {
              setModalHasChanges(true)
            } else {
              goPrev()
              setDetailState("view")
            }
          }}
        >
          <Tooltip title={texts.prev}>
            <Icon icon="IconArrowLeft" />
          </Tooltip>
        </Navigate>
        {currentPage}
        <Navigate
          onClick={() => {
            if (hasChanges) {
              setModalHasChanges(true)
            } else {
              goNext()
              setDetailState("view")
            }
          }}
        >
          <Tooltip title={texts.next} placement="top-start">
            <Icon icon="IconArrowRight" />
          </Tooltip>
        </Navigate>
      </Paginator>
    </Container>
  )
}

export default PartnersList
