import React, { useContext, useEffect, useState } from "react"
import { PartnersContext } from "contexts/Partners"
import getPartners from "services/GetPartnerts.service"
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
  PaymentActive,
  PartnerNumber,
  Tags,
  Student,
  FreePass,
  IconContainer,
  Paginator,
  Navigate,
  NoPartnersView,
} from "./styles"

const PartnersList = () => {
  const {
    partners,
    setPartners,
    partnerSelected,
    setPartnerSelected,
  } = useContext(PartnersContext)

  const [currentPage, setCurrentPage] = useState<number>(1)

  const selectPartner = (partner: number) => {
    if (partnerSelected === null || partnerSelected !== partner) {
      setPartnerSelected(partner)
    } else if (partnerSelected === partner) {
      setPartnerSelected(null)
    }
  }

  const getData = async () => {
    const partnersList = await getPartners(currentPage)
    setPartners(partnersList.data)
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

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

  return (
    <Container>
      <ScrollView height={500}>
        <ListContainer>
          {partners.length > 0 ? (
            partners.map((partner: PartnerInterface) => {
              return (
                <ListItem onClick={() => selectPartner(partner.id)}>
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
            })
          ) : (
            <NoPartnersView>{texts.no_more}</NoPartnersView>
          )}
        </ListContainer>
      </ScrollView>
      <Paginator>
        <Navigate onClick={goPrev}>
          <Tooltip title={texts.prev}>
            <Icon icon="IconArrowLeft" />
          </Tooltip>
        </Navigate>
        {currentPage}
        <Navigate onClick={goNext}>
          <Tooltip title={texts.next} placement="top-start">
            <Icon icon="IconArrowRight" />
          </Tooltip>
        </Navigate>
      </Paginator>
    </Container>
  )
}

export default PartnersList
