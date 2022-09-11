import React, { useState, useContext, useEffect } from "react"
import { PartnersContext } from "contexts/Partners"
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
  Button,
  DaysLeft,
  Section,
  ButtonContainer,
  Date,
} from "./styles"

interface PaymentCardInterface {
  //   id: number
  //   partner_id: number
  partner_name: string
  partner_last_name: string
  combo: number
  time_paid: number
  time_paid_unit: number
  clases_paid: number
  trainer_id: number
  trainer_name: string
  //   payment_method_id: number
  //   payment_method_name: string
  //   price_paid: number
  //   date: string
  payment_expire_date: string
}

const PaymentCard = ({
  //   id,
  //   partner_id,
  partner_name,
  partner_last_name,
  combo,
  time_paid,
  time_paid_unit,
  clases_paid,
  trainer_id,
  trainer_name,
  //   payment_method_id,
  //   payment_method_name,
  //   price_paid,
  //   date,
  payment_expire_date,
}: PaymentCardInterface) => {
  const { combos } = useContext(PartnersContext)

  const [active, setActive] = useState<boolean>(false)
  const [activeEdition, setActiveEdition] = useState<boolean>(false)
  const [comboSelected, setComboSelected] = useState<{
    id: number
    name: string
    price_cash: number
    price_mp: number
    details: string
  }>()

  const filterCombo = () => {
    const searchCombo = combos.filter(c => c.id === combo)
    if (searchCombo.length) {
      setComboSelected(searchCombo[0])
    }
  }

  useEffect(() => {
    if (combo !== 0) {
      filterCombo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combo])

  return (
    <Card>
      <CardHead onClick={() => setActive(!active)}>
        <Name>
          {partner_name} {partner_last_name}
        </Name>
        <Tags>
          {trainer_id !== 0 && <Student>Alumno</Student>}
          {time_paid_unit === 2 && <FreePass>Pase Libre</FreePass>}
          {time_paid_unit === 1 && <Day>Dia</Day>}
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
                <Button disabled={activeEdition === false} type="button">
                  -
                </Button>
                <p>{time_paid_unit === 1 ? time_paid : "-"}</p>
                <Button disabled={activeEdition === false} type="button">
                  +
                </Button>
              </DaysLeft>
            </Section>
            <Section>
              <p>Vencimiento de pago</p>
              {/* CALCULAR FECHA DE VENC. CON DATE */}
              <Date>{time_paid_unit === 2 ? payment_expire_date : "-"}</Date>
            </Section>
            <Section>
              <p>Profesor</p>
              <Date>{trainer_name.length ? trainer_name : "-"}</Date>
            </Section>
          </FirstData>
          <FirstData>
            <Section>
              <p>Pago actual</p>
              <span>{comboSelected !== undefined && comboSelected.name}</span>
              <span>
                {time_paid !== 0 && time_paid}{" "}
                {time_paid_unit === 1 ? "Dia/s" : "Mes/es"}
              </span>
              <span>{clases_paid !== 0 && `${clases_paid} clases`}</span>
            </Section>
          </FirstData>
          <ButtonContainer>
            {activeEdition && (
              <TextButton
                content="Cancelar"
                onClick={() => setActiveEdition(false)}
              />
            )}
            <TextButton
              content={activeEdition ? "Guardar" : "Editar"}
              cta
              onClick={() => setActiveEdition(true)}
            />
          </ButtonContainer>
        </>
      )}
    </Card>
  )
}

export default PaymentCard
