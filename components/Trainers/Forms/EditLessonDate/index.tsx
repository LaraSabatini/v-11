import React, { useContext, useState, useEffect, useRef } from "react"
import { Lessons } from "contexts/Lessons"
import {
  getLessonsByPartnerAndPaidAction,
  editLessonAction,
} from "helpers/lessons"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
import LessonsSelectedInterface from "interfaces/trainers/LessonsSelected"
import yesOrNoArr from "const/fixedVariables"
import { shifts, day, month, year } from "const/time"
import generalTexts from "strings/general.json"
import trainerTexts from "strings/trainers.json"
import ModalForm from "components/UI/ModalForm"
import InputCalendar from "components/UI/InputCalendar"
import Autocomplete from "components/UI/Autocomplete"
import Icon from "components/UI/Assets/Icon"
import checkQuota from "../../Helpers/checkQuota"
import getWeekNumber from "../../Helpers/getWeekNumber"
import { HorizontalGroup } from "../CreatePurchase/styles"
import {
  Form,
  CurrentDate,
  FutureLessonsList,
  Warning,
  DateSelectedContainer,
  UnselectButton,
  AcceptButton,
} from "./styles"

interface EditLessonDateInterface {
  cancelEditLessonPurchase: () => void
}

function EditLessonDate({ cancelEditLessonPurchase }: EditLessonDateInterface) {
  const { purchaseSelected, setModalSuccess, setModalError } = useContext(
    Lessons,
  )

  const maxCalendarDate = `${purchaseSelected.payment_expire_date.slice(
    0,
    2,
  )}/${purchaseSelected.payment_expire_date.slice(
    3,
    5,
  )}/${purchaseSelected.payment_expire_date.slice(6, 10)}`

  const newDateRef = useRef(null)
  const shiftRef = useRef(null)

  const [disabledButton, setDisabledButton] = useState<boolean>(false)
  const [dateSelected, setDateSelected] = useState<LessonsSelectedInterface>()
  const [cannotAddDate, setCannotAddDate] = useState<boolean>(false)
  const [futureLessons, setFutureLessons] = useState<
    ClasesPurchasedInterface[]
  >([])
  const [provisionalSelection, setProvisionalSelection] = useState<{
    date: string
    shift: "AM" | "PM" | ""
  }>({
    date: "",
    shift: "",
  })

  const validateInputs = async () => {
    await newDateRef.current?.focus()
    await shiftRef.current?.focus()
    await newDateRef.current?.focus()

    return (
      newDateRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      shiftRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      cannotAddDate === false &&
      dateSelected !== undefined &&
      dateSelected !== null
    )
  }

  const handleEdit = async (e: any) => {
    e.preventDefault()

    const validate = await validateInputs()
    if (validate) {
      setDisabledButton(true)
      const weekId = getWeekNumber(dateSelected.date)

      const editLessonCall = await editLessonAction({
        ...purchaseSelected,
        lesson_date: dateSelected.date,
        shift: dateSelected.shift,
        day_id: weekId.day.getDay(),
        week_id: weekId.week,
        created_by: parseInt(localStorage.getItem("id"), 10),
      })

      if (editLessonCall.status === 200) {
        setModalSuccess(editLessonCall.message)
        cancelEditLessonPurchase()
      } else {
        setModalError(editLessonCall.message)
        cancelEditLessonPurchase()
      }
    }
  }

  const checkLessonsPurchased = async () => {
    const checkLessonsCallPaid = await getLessonsByPartnerAndPaidAction(
      purchaseSelected.partner_id,
      `${yesOrNoArr[0].display_name}`,
    )
    const checkLessonsCallNotPaid = await getLessonsByPartnerAndPaidAction(
      purchaseSelected.partner_id,
      `${yesOrNoArr[1].display_name}`,
    )

    const filterActualLesson = checkLessonsCallPaid.filter(
      (lesson: ClasesPurchasedInterface) =>
        lesson.id !== purchaseSelected.id && lesson.id > purchaseSelected.id,
    )

    const newArrayOfLessons = filterActualLesson.length
      ? filterActualLesson
      : checkLessonsCallNotPaid

    setFutureLessons(newArrayOfLessons)
  }

  useEffect(() => {
    if (purchaseSelected !== null) {
      checkLessonsPurchased()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseSelected])

  return (
    <ModalForm
      title={trainerTexts.edit.title}
      cancelButtonContent={generalTexts.actions.cancel}
      submitButtonContent={generalTexts.actions.save}
      submit={handleEdit}
      cancelFunction={cancelEditLessonPurchase}
      disabledButton={disabledButton}
    >
      <Form>
        <CurrentDate>
          <p>{trainerTexts.edit.change_date}</p>
          <span>
            {purchaseSelected.lesson_date} {purchaseSelected.shift}
          </span>
        </CurrentDate>
        <FutureLessonsList>
          <p>{trainerTexts.edit.reserved_lessons}</p>
          <div>
            {futureLessons?.length && futureLessons !== undefined ? (
              futureLessons.map(lesson => (
                <span>
                  • {lesson.lesson_date} {lesson.shift}
                </span>
              ))
            ) : (
              <div />
            )}
          </div>
        </FutureLessonsList>
        <HorizontalGroup>
          <InputCalendar
            width={220}
            required={dateSelected === undefined}
            label={trainerTexts.edit.new_date}
            maxCalendarDate={maxCalendarDate}
            reference={newDateRef}
            valueCalendar={provisionalSelection.date}
            minCalendarDate={`${day}/${month}/${year}`}
            onChange={e =>
              setProvisionalSelection({
                ...provisionalSelection,
                date: e.selectedChangeDate,
                shift: provisionalSelection.shift,
              })
            }
          />
          <Autocomplete
            width={140}
            options={shifts}
            ref={shiftRef}
            label={trainerTexts.createPurchase.shift}
            required={dateSelected === undefined}
            setValue={provisionalSelection.shift}
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
                const checkDate = await checkQuota(provisionalSelection, [
                  dateSelected,
                ])

                if (checkDate.can) {
                  setDateSelected({
                    id:
                      futureLessons !== undefined
                        ? futureLessons.length + 1
                        : 1,
                    date: checkDate.newDates[1].date,
                    shift: checkDate.newDates[1].shift as "AM" | "PM",
                  })
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
        </HorizontalGroup>
        {cannotAddDate && (
          <Warning>{trainerTexts.createPurchase.warningMessage}</Warning>
        )}
        {dateSelected !== undefined && dateSelected !== null && (
          <DateSelectedContainer>
            <p>
              {dateSelected.date} {dateSelected.shift}
            </p>
            <UnselectButton
              onClick={() => {
                setDateSelected(null)
              }}
              type="button"
            >
              <Icon icon="IconMenuOff" />
            </UnselectButton>
          </DateSelectedContainer>
        )}
      </Form>
    </ModalForm>
  )
}

export default EditLessonDate
