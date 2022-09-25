import React, { useContext, useState } from "react"
import { Clases } from "contexts/Clases"
import texts from "strings/trainers.json"
import { editPartnerPayment } from "services/Partners/PartnerPayments.service"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
import Icon from "components/UI/Assets/Icon"
import TextButton from "components/UI/TextButton"
import { DaysLeft } from "components/Partners/PartnerDetails/DetailsView/styles"
import { Card, Title, Days, Data, ButtonContainer } from "./styles"

interface ClasesCardInterface {
  data: ClasesPurchasedInterface
}

const ClasesCard = ({ data }: ClasesCardInterface) => {
  const { schedule, triggerListUpdate, setTriggerListUpdate } = useContext(
    Clases,
  )

  const [changes, setChanges] = useState<boolean>(false)
  const [variableValues, setVariableValues] = useState({
    name: `${texts.lessons}`,
    value: data.clases_paid,
  })

  const removeClas = async () => {
    let success: boolean = false

    const body = {
      ...data,
      clases_paid: variableValues.value,
      days_and_hours: variableValues.value === 0 ? "" : data.days_and_hours,
    }

    const edit = await editPartnerPayment(body)
    if (edit.message === "payment updated successfully") {
      success = true
    } else {
      success = false
    }

    if (success) {
      setTriggerListUpdate(triggerListUpdate + 1)
      setChanges(false)
    } else {
      setTriggerListUpdate(triggerListUpdate + 1)
      setChanges(false)
    }
  }

  return (
    <Card>
      <Title>
        {data.partner_name} {data.partner_last_name}
      </Title>
      <Data>
        <Days>
          <p>{texts.lessonsLeft}</p>
          <DaysLeft>
            <button
              className="remove"
              type="button"
              onClick={() => {
                setChanges(true)
                if (variableValues.value > 0) {
                  setVariableValues({
                    name: `${texts.lessons}`,
                    value: variableValues.value - 1,
                  })
                }
              }}
            >
              <Icon icon="IconLess" />
            </button>
            {variableValues.value}
          </DaysLeft>
        </Days>
        <Days>
          <p>{texts.days} </p>
          {data.days_and_hours.length &&
            data.days_and_hours.map(d => (
              <ul key={d}>
                <li>{schedule.filter(ho => ho.id === d)[0].day_and_hour}</li>
              </ul>
            ))}
        </Days>
        {changes && (
          <ButtonContainer>
            <TextButton content={texts.save} cta onClick={() => removeClas()} />
            <TextButton
              content={texts.cancel}
              onClick={() => {
                setVariableValues({
                  name: `${texts.lessons}`,
                  value: data.clases_paid,
                })
                setChanges(false)
              }}
            />
          </ButtonContainer>
        )}
      </Data>
    </Card>
  )
}

export default ClasesCard
