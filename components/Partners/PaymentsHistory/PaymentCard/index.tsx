import React, { useState, useContext, useEffect } from "react"
import searchPartner from "services/Partners/SearchPartner.service"
import { PartnersContext } from "contexts/Partners"
import PartnerInterface from "interfaces/partners/PartnerInterface"
import TextButton from "components/UI/TextButton"
import {
  Card,
  Name,
  Tags,
  Student,
  FreePass,
  Day,
  CardHead,
  FirstData,
  DaysLeft,
  Section,
  ButtonContainer,
  Date,
} from "./styles"

interface PaymentCardInterface {
  partner_name: string
  partner_last_name: string
  combo: number
  time_paid: number
  time_paid_unit: number
  clases_paid: number
  // trainer_name: string
  payment_expire_date: string
  date: string
  onClickEdit: () => void
}

const PaymentCard = ({
  partner_name,
  partner_last_name,
  combo,
  time_paid,
  time_paid_unit,
  clases_paid,
  // trainer_name,
  payment_expire_date,
  date,
  onClickEdit,
}: PaymentCardInterface) => {
  const { combos } = useContext(PartnersContext)

  const [active, setActive] = useState<boolean>(false)
  const [comboSelected, setComboSelected] = useState<{
    id: number
    name: string
    price_cash: number
    price_mp: number
    details: string
  }>()
  const [partner, setPartner] = useState<PartnerInterface>()

  const filterCombo = () => {
    const searchCombo = combos.filter(c => c.id === combo)
    if (searchCombo.length) {
      setComboSelected(searchCombo[0])
    }
  }

  const getPartnerData = async () => {
    const data = await searchPartner(partner_name, 1)
    setPartner(data.data[0])
  }

  useEffect(() => {
    getPartnerData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partner_name])

  useEffect(() => {
    if (combo !== 0) {
      filterCombo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combo])

  return (
    <Card>
      <CardHead
        onClick={() => {
          setActive(!active)
        }}
      >
        <Name>
          {partner_name} {partner_last_name}
        </Name>
        <Tags>
          <Tags>
            {partner !== undefined && (
              <>
                {partner.is_student !== 0 && <Student>Alumno</Student>}
                {partner.free_pass !== 0 && <FreePass>Pase Libre</FreePass>}
                {partner.free_pass === 0 && partner.is_student === 0 && (
                  <Day>Dia</Day>
                )}
              </>
            )}
          </Tags>
        </Tags>
      </CardHead>
      {/* DIAS RESTANTES => time_paid_unit === 1 */}
      {/* SI SE SUMAN O RESTAN dias => PUT time_paid */}
      {/* FECHA DE VENCIMIENTO => time_paid_unit === 2 || combo === 1 */}
      {active && (
        <>
          <FirstData>
            <Section>
              <p>Dias restantes</p>
              <DaysLeft>
                <p>{time_paid_unit === 1 ? time_paid : "-"}</p>
              </DaysLeft>
            </Section>
            <Section>
              <p>Vencimiento de pago</p>
              <Date>
                {payment_expire_date !== "" ? payment_expire_date : "-"}
              </Date>
            </Section>
            <Section>
              <p>Profesor</p>
              <Date>{partner.is_student !== 0 ? "Guillermo" : "-"}</Date>
            </Section>
          </FirstData>
          <FirstData>
            <Section>
              <p>
                Pago actual
                <span> ({date})</span>
              </p>
              <span>{comboSelected !== undefined && comboSelected.name}</span>
              <span>
                {time_paid !== 0 && time_paid} {time_paid_unit === 1 && "Dia/s"}
                {time_paid_unit === 2 && "Mes/es"}
              </span>
              <span>{clases_paid !== 0 && `${clases_paid} clases`}</span>
            </Section>
          </FirstData>
          <ButtonContainer>
            <TextButton content="Editar" cta onClick={() => onClickEdit()} />
          </ButtonContainer>
        </>
      )}
    </Card>
  )
}

export default PaymentCard
