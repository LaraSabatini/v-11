import React, { useContext } from "react"
import { PartnersContext } from "contexts/Partners"
import texts from "strings/partners.json"
import ScrollView from "components/UI/ScrollView"
import Icon from "components/UI/Assets/Icon"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import theme from "theme"
import {
  ListContainer,
  ListItem,
  Name,
  Container,
  PaymentActive,
  PartnerNumber,
  Tags,
  Student,
  FreePass,
  IconContainer,
} from "./styles"

const PartnersList = () => {
  const { partners, partnerSelected, setPartnerSelected } =
    useContext(PartnersContext)

  const selectPartner = (partner: number) => {
    if (partnerSelected === null || partnerSelected !== partner) {
      setPartnerSelected(partner)
    } else if (partnerSelected === partner) {
      setPartnerSelected(null)
    }
  }

  return (
    <Container>
      <ScrollView height={500}>
        <ListContainer>
          {partners &&
            partners.map((partner: PartnerInterface) => {
              return (
                <ListItem onClick={() => selectPartner(partner.id)}>
                  <Name>
                    {partner.name} {partner.last_name}
                  </Name>
                  <PartnerNumber>N°: {partner.id}</PartnerNumber>
                  <Tags>
                    {partner.trainer_id !== null && (
                      <Student>{texts.student}</Student>
                    )}
                    {partner.free_pass !== null && (
                      <FreePass>{texts.free_pass}</FreePass>
                    )}
                  </Tags>
                  <PaymentActive active={partner.payment_is_active}>
                    {partner.payment_is_active
                      ? `${texts.active_payment}`
                      : `${texts.expired_payment}`}
                  </PaymentActive>
                  <IconContainer active={partnerSelected === partner.id}>
                    <Icon icon="IconArrowRight" color={theme.colors.primary} />
                  </IconContainer>
                </ListItem>
              )
            })}
        </ListContainer>
      </ScrollView>
    </Container>
  )
}

export default PartnersList
