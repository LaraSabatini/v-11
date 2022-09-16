import React, { useState, useContext, useEffect } from "react"
import { PartnersContext } from "contexts/Partners"
import Icon from "components/UI/Assets/Icon"
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
  id: number
  time_paid: number
  time_paid_unit: number
  clases_paid: number
  payment_expire_date: string
  date: string
  onClickEdit: () => void
  onClickRemoveDays: () => void
  onClickRemoveClases: () => void
  confirmChange: (e) => void
  cancelChange: () => void
}

const PaymentCard = ({
  partner_name,
  partner_last_name,
  combo,
  time_paid,
  time_paid_unit,
  clases_paid,
  payment_expire_date,
  date,
  onClickEdit,
  onClickRemoveDays,
  onClickRemoveClases,
  id,
  confirmChange,
  cancelChange,
}: PaymentCardInterface) => {
  const { combos } = useContext(PartnersContext)
  const [changes, setChanges] = useState<boolean>(false)

  const [active, setActive] = useState<boolean>(false)
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

  const [variableValues, setVariableValues] = useState([
    { name: "clases", value: clases_paid },
    { name: "days", value: time_paid_unit === 1 ? time_paid : 0 },
  ])

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
          <>
            {clases_paid > 0 && <Student>Alumno</Student>}
            {time_paid_unit === 2 && <FreePass>Pase Libre</FreePass>}
            {time_paid_unit === 1 && <Day>Dia</Day>}
          </>
        </Tags>
      </CardHead>
      {active && (
        <>
          <FirstData>
            <Section>
              <p>Dias restantes</p>
              <DaysLeft>
                <button
                  className="remove"
                  type="button"
                  onClick={() => {
                    onClickRemoveDays()
                    setChanges(true)
                    setVariableValues([
                      { name: "clases", value: variableValues[0].value },
                      { name: "days", value: variableValues[1].value - 1 },
                    ])
                  }}
                >
                  <Icon icon="IconLess" />
                </button>
                {/* <p>{time_paid_unit === 1 ? time_paid : 0}</p> */}
                <p>{variableValues[1].value}</p>
              </DaysLeft>
            </Section>
            {/*  */}
            <Section>
              <p>Clases restantes</p>
              <DaysLeft>
                <button
                  className="remove"
                  type="button"
                  onClick={() => {
                    onClickRemoveClases()
                    setChanges(true)
                    setVariableValues([
                      { name: "clases", value: clases_paid - 1 },
                      {
                        name: "days",
                        value: variableValues[1].value,
                      },
                    ])
                  }}
                >
                  <Icon icon="IconLess" />
                </button>
                <p>{variableValues[0].value}</p>
              </DaysLeft>
            </Section>
            <Section>
              <p>Vencimiento de pago</p>
              <Date>
                {payment_expire_date !== "" ? payment_expire_date : "-"}
              </Date>
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
            <TextButton
              disabled={changes === false}
              content="Confirmar"
              onClick={() => {
                confirmChange(id)
                setChanges(false)
              }}
            />
            <TextButton
              content="Cancelar"
              disabled={changes === false}
              onClick={() => {
                setChanges(false)
                cancelChange()
                setVariableValues([
                  { name: "clases", value: clases_paid },
                  { name: "days", value: time_paid_unit === 1 ? time_paid : 0 },
                ])
              }}
            />
          </ButtonContainer>
        </>
      )}
    </Card>
  )
}

export default PaymentCard
