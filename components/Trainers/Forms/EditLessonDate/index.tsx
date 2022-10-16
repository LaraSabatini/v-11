import React, { useContext, useRef, useState, useEffect } from "react"
// SERVICES
import {
  getLessonsByDateAndShift,
  getByPartnerAndPaid,
  editLesson,
} from "services/Trainers/LessonsPurchased.service"
// DATA STORAGE & TYPES
import { Lessons } from "@contexts/LessonsContext"
import generalTexts from "strings/general.json"
import trainerTexts from "strings/trainers.json"
import { shifts, day, month, year } from "const/time"
import yesOrNoArr from "const/fixedVariables"
import LessonsSelectedInterface from "interfaces/trainers/LessonsSelected"
import ClasesPurchasedInterface from "interfaces/trainers/ClasesPurchasedInterface"
// COMPONENTS & STYLING
import Icon from "components/UI/Assets/Icon"
import ModalForm from "components/UI/ModalForm"
import InputCalendar from "components/UI/InputCalendar"
import Autocomplete from "components/UI/Autocomplete"
import { AcceptButton, Warning } from "../CreatePurchase/styles"
import {
  Form,
  CurrentDate,
  HorizontalGroup,
  DateSelectedContainer,
  UnselectButton,
  FutureLessonsList,
} from "./styles"

interface EditInterface {
  cancelEdit: () => void
}

const EditLessonDate = ({ cancelEdit }: EditInterface) => {
  const { purchaseSelected, setModalSuccess, setModalError } = useContext(
    Lessons,
  )
  const [cannotAddDate, setCannotAddDate] = useState<boolean>(false)
  const [provisionalSelection, setProvisionalSelection] = useState<{
    date: string
    shift: "AM" | "PM" | ""
  }>({
    date: "",
    shift: "",
  })

  const [dateSelected, setDateSelected] = useState<LessonsSelectedInterface>()
  const [futureLessons, setFutureLessons] = useState<
    ClasesPurchasedInterface[]
  >([])

  const newDateRef = useRef(null)
  const shiftRef = useRef(null)

  const handleEdit = async e => {
    e.preventDefault()

    await newDateRef.current?.focus()
    await shiftRef.current?.focus()
    await newDateRef.current?.focus()

    if (
      newDateRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      shiftRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      cannotAddDate === false &&
      dateSelected !== undefined &&
      dateSelected !== null
    ) {
      const lessonDay = `${dateSelected.date.slice(
        6,
        10,
      )}-${dateSelected.date.slice(3, 5)}-${dateSelected.date.slice(0, 2)}`
      const currentDate = new Date(lessonDay)

      const editLessonBody = {
        ...purchaseSelected,
        lesson_date: dateSelected.date,
        shift: dateSelected.shift,
        day_id: currentDate.getDay(),
      }

      const editLessonCall = await editLesson(editLessonBody)

      const success =
        editLessonCall.message === "Lesson purchase updated successfully"

      if (success) {
        setModalSuccess({
          status: "success",
          icon: "IconCheckModal",
          title: `${generalTexts.modalTitles.success}`,
          content: `${trainerTexts.edit.successModal.content}`,
        })
        cancelEdit()
      } else {
        setModalError({
          status: "alert",
          icon: "IconExclamation",
          title: `${generalTexts.modalTitles.error}`,
          content: `${trainerTexts.edit.errorModal.content}`,
        })
        cancelEdit()
      }
    }
  }

  const checkIfDateHasSpace = async () => {
    const dateCleaned = `${provisionalSelection.date.slice(
      0,
      2,
    )}-${provisionalSelection.date.slice(
      3,
      5,
    )}-${provisionalSelection.date.slice(6, 10)}`

    const checkAvailability = await getLessonsByDateAndShift(
      dateCleaned,
      provisionalSelection.shift,
    )

    if (checkAvailability.data.length >= 10) {
      setCannotAddDate(true)
    } else {
      setCannotAddDate(false)
      setDateSelected({
        id: 1,
        date: dateCleaned,
        shift: provisionalSelection.shift,
      })

      setProvisionalSelection({
        date: "",
        shift: "",
      })
    }
  }

  const checkLessonsPurchased = async () => {
    const checkLessonsCallPaid = await getByPartnerAndPaid(
      purchaseSelected.partner_id,
      `${yesOrNoArr[0].display_name}`,
    )
    const checkLessonsCallNotPaid = await getByPartnerAndPaid(
      purchaseSelected.partner_id,
      `${yesOrNoArr[1].display_name}`,
    )

    const filterActualLesson = checkLessonsCallPaid.data.filter(
      (lesson: ClasesPurchasedInterface) =>
        lesson.id !== purchaseSelected.id && lesson.id > purchaseSelected.id,
    )

    let newArrayOfLessons = []
    if (filterActualLesson.length) {
      newArrayOfLessons = [...newArrayOfLessons, filterActualLesson]
    } else {
      newArrayOfLessons = checkLessonsCallNotPaid.data
    }
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
      submitButtonContent={generalTexts.actions.pay}
      submit={handleEdit}
      cancelFunction={cancelEdit}
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
            {futureLessons.length ? (
              futureLessons.map(lesson => (
                <span>
                  • {lesson.lesson_date} {lesson.shift}
                </span>
              ))
            ) : (
              <></>
            )}
          </div>
        </FutureLessonsList>
        <HorizontalGroup>
          <InputCalendar
            width={220}
            required={dateSelected === undefined}
            label={trainerTexts.edit.new_date}
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
            onClick={() => {
              if (
                provisionalSelection.date !== "" &&
                provisionalSelection.shift !== ""
              ) {
                checkIfDateHasSpace()
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