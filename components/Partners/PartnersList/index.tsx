import React, { useContext, useState, useEffect } from "react"
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

interface PartnerListInterface {
  data: PartnerInterface[]
  goPrev: () => void
  goNext: () => void
}

const PartnersList = ({ data, goPrev, goNext }: PartnerListInterface) => {
  const { partnerSelected, setPartnerSelected, currentPage } = useContext(
    PartnersContext,
  )

  const [paymentIsActive, setPaymentIsActive] = useState<boolean[]>([])

  const selectPartner = (partner: number) => {
    if (partnerSelected === null || partnerSelected !== partner) {
      setPartnerSelected(partner)
    } else if (partnerSelected === partner) {
      setPartnerSelected(null)
    }
  }

  const checkPaymentActiveness = () => {
    const booleanArr = []
    const today = new Date()

    data.map(expirement => {
      const str = expirement.payment_expire_date
      const [day, month, year] = str.split("/")
      const date = new Date(+year, parseInt(month, 10) - 1, +day)

      return booleanArr.push(date > today)
    })

    setPaymentIsActive(booleanArr)
  }

  useEffect(() => {
    checkPaymentActiveness()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <Container>
      <ScrollView height={500}>
        <ListContainer>
          {data.length > 0 ? (
            data.map((partner: PartnerInterface, index: number) => {
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
                  <PaymentActive active={paymentIsActive[index]}>
                    {paymentIsActive[index]
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
