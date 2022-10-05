import React from "react"
// SERVICES
// import { Clases } from "contexts/Clases"
// import { editPartnerPayment } from "services/Partners/PartnerPayments.service"
// DATA STORAGE & TYPES
// import texts from "strings/trainers.json"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
// COMPONENTS & STYLING
// import Icon from "components/UI/Assets/Icon"
// import TextButton from "components/UI/TextButton"
// import { DaysLeft } from "components/Partners/PartnerDetails/DetailsView/styles"
import { Card, Title } from "./styles"

interface ClasesCardInterface {
  data: ClasesPurchasedInterface
}

const ClasesCard = ({ data }: ClasesCardInterface) => {
  // const { schedule, triggerListUpdate, setTriggerListUpdate } = useContext(
  //   Clases,
  // )

  // const [changes, setChanges] = useState<boolean>(false)

  // const [lessonsPurchasedData, setLessonsPurchasedData] = useState({
  //   name: `${texts.lessons}`,
  //   value: data.clases_paid,
  // })

  // const removeLesson = async () => {
  //   let success: boolean = false

  //   const body = {
  //     ...data,
  //     clases_paid: lessonsPurchasedData.value,
  //     days_and_hours:
  //       lessonsPurchasedData.value === 0 ? "" : data.days_and_hours,
  //   }

  //   const editPaymentCall = await editPartnerPayment(body)
  //   if (editPaymentCall.message === "payment updated successfully") {
  //     success = true
  //   } else {
  //     success = false
  //   }

  //   if (success) {
  //     setTriggerListUpdate(triggerListUpdate + 1)
  //     setChanges(false)
  //   } else {
  //     setTriggerListUpdate(triggerListUpdate + 1)
  //     setChanges(false)
  //   }
  // }

  return (
    <Card>
      <Title>
        {data.partner_name} {data.partner_last_name}
      </Title>
      {/* <Data>
        <Days>
          <p>{texts.lessonsLeft}</p>
          <DaysLeft>
            <button
              className="remove"
              type="button"
              onClick={() => {
                setChanges(true)
                if (lessonsPurchasedData.value > 0) {
                  setLessonsPurchasedData({
                    name: `${texts.lessons}`,
                    value: lessonsPurchasedData.value - 1,
                  })
                }
              }}
            >
              <Icon icon="IconLess" />
            </button>
            {lessonsPurchasedData.value}
          </DaysLeft>
        </Days>
        <Days>
          <p>{texts.days} </p>
          {data.days_and_hours.length &&
            data.days_and_hours.map(dayAndHour => (
              <ul key={dayAndHour}>
                <li>
                  {
                    schedule.filter(
                      scheduleHour => scheduleHour.id === dayAndHour,
                    )[0].day_and_hour
                  }
                </li>
              </ul>
            ))}
        </Days>
        {changes && (
          <ButtonContainer>
            <TextButton
              content={texts.save}
              cta
              onClick={() => removeLesson()}
            />
            <TextButton
              content={texts.cancel}
              onClick={() => {
                setLessonsPurchasedData({
                  name: `${texts.lessons}`,
                  value: data.clases_paid,
                })
                setChanges(false)
              }}
            />
          </ButtonContainer>
        )}
      </Data> */}
    </Card>
  )
}

export default ClasesCard
