import React, { useContext } from "react"
import { Lessons } from "contexts/Lessons"
import trainerTexts from "strings/trainers.json"
import { shifts, day, month, year } from "const/time"
import Autocomplete from "components/UI/Autocomplete"
import TextField from "components/UI/TextField"
import InputCalendar from "components/UI/InputCalendar"
import ScrollView from "components/UI/ScrollView"
import Icon from "components/UI/Assets/Icon"
import checkQuota from "../../../Helpers/checkQuota"
import removeLessonFromList from "../../../Helpers/removeLessonFromList"
import {
  Container,
  LessonsContainer,
  LessonsSubGroup,
  LessonsPurchasedList,
  DisablingDiv,
  AcceptButton,
} from "./styles"

function SelectLessons() {
  const {
    amountOfLessonsRef,
    amountOfLessons,
    setAmountOfLessons,
    lessonRef,
    datesSelected,
    setDatesSelected,
    setPaymentMethodSelected,
    setPaid,
    setFinalPrice,
    clientIsRegistered,
    shiftRef,
    setBuyedCombo,
    provisionalSelection,
    setProvisionalSelection,
    setCannotAddDate,
  } = useContext(Lessons)

  return (
    <Container>
      <LessonsContainer>
        <LessonsSubGroup>
          <TextField
            label={trainerTexts.createPurchase.amountOfLessons}
            type="number"
            max={10}
            width={100}
            required
            reference={amountOfLessonsRef}
            onChange={e => {
              if (e.target.value.length > 0) {
                setAmountOfLessons(parseInt(e.target.value, 10))
              } else {
                setAmountOfLessons(0)
              }
            }}
          />
        </LessonsSubGroup>

        {(amountOfLessons === 0 ||
          datesSelected.length === amountOfLessons) && <DisablingDiv />}

        <LessonsSubGroup>
          <InputCalendar
            position={clientIsRegistered ? "bottom-left" : "top-left"}
            label={trainerTexts.createPurchase.lessonsDate}
            minCalendarDate={`${day}/${month}/${year}`}
            valueCalendar={provisionalSelection.date}
            required={datesSelected.length < amountOfLessons}
            reference={lessonRef}
            width={150}
            onChange={e =>
              setProvisionalSelection({
                ...provisionalSelection,
                date: e.selectedChangeDate,
                shift: provisionalSelection.shift,
              })
            }
          />
          <Autocomplete
            setValue={provisionalSelection.shift}
            width={110}
            label={trainerTexts.createPurchase.shift}
            required={datesSelected.length < amountOfLessons}
            ref={shiftRef}
            options={shifts}
            onChangeProps={(e: { id: number; display_name: "AM" | "PM" }) =>
              setProvisionalSelection({
                ...provisionalSelection,
                date: provisionalSelection.date,
                shift: e.display_name,
              })
            }
          />
          <AcceptButton
            type="button"
            disabled={
              provisionalSelection.date === "" ||
              provisionalSelection.shift === ""
            }
            onClick={async () => {
              if (
                provisionalSelection.date !== "" &&
                provisionalSelection.shift !== ""
              ) {
                const checkDate = await checkQuota(
                  provisionalSelection,
                  datesSelected,
                )

                if (checkDate.can) {
                  setDatesSelected(checkDate.newDates)
                  setProvisionalSelection({
                    date: "",
                    shift: "",
                  })
                  setCannotAddDate(false)
                } else {
                  setCannotAddDate(true)
                }
              }
            }}
          >
            <Icon icon="IconCheck" />
          </AcceptButton>
        </LessonsSubGroup>
      </LessonsContainer>
      <LessonsPurchasedList>
        <p className="title">{trainerTexts.createPurchase.datesSelected}</p>
        <ScrollView height={100}>
          <div className="dates">
            {datesSelected.length > 0 &&
              datesSelected.map(date => (
                <p key={date.id}>
                  <span>• {date.date}</span> <b>{date.shift}</b>
                  <button
                    type="button"
                    onClick={() => {
                      const newArrayOfDates = removeLessonFromList(
                        date,
                        datesSelected,
                      )
                      setDatesSelected(newArrayOfDates)
                      if (newArrayOfDates.length !== amountOfLessons) {
                        setBuyedCombo(true)
                        setFinalPrice(0)
                        setPaid(null)
                        setPaymentMethodSelected(null)
                      }
                    }}
                  >
                    <Icon icon="IconMenuOff" />
                  </button>
                </p>
              ))}
          </div>
        </ScrollView>
      </LessonsPurchasedList>
    </Container>
  )
}

export default SelectLessons
