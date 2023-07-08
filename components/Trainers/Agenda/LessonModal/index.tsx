import React, { useEffect, useState, useContext } from "react"
import { TrainersContext } from "contexts/Trainers"
import {
  LessonPurchaseInterface,
  CalendarInterface,
  LessonTypesInterface,
} from "interfaces/lessons/Calendar"
import {
  updateSchedule,
  getLessonScheduleByDay,
  createLessonSchedule,
  getClientsByPurchaseIds,
} from "services/Trainers/agenda.service"
import Icon from "components/UI/Assets/Icon"
import { Checkbox, Button } from "antd"
import type { CheckboxChangeEvent } from "antd/es/checkbox"
import InputCalendar from "@components/UI/InputCalendar"
import { hoursForComboBox } from "const/time"
import Autocomplete from "@components/UI/Autocomplete"
import getWeekNumber from "../../Helpers/getWeekNumber"

import { Student, EditModal } from "./styles"

interface ILessonModal {
  lesson: CalendarInterface
  lessonTypes: LessonTypesInterface[]
}

function LessonModal({ lesson, lessonTypes }: ILessonModal) {
  const { setRefreshAgenda, refreshAgenda } = useContext(TrainersContext)

  const [purchases, setPurchases] = useState<LessonPurchaseInterface[]>([])
  const [partners, setPartners] = useState([])
  const [assistances, setAssistances] = useState<number[]>(
    lesson.assists as number[],
  )

  const [editPurchaseModal, setEditPurchaseModal] = useState<{
    purchase: LessonPurchaseInterface
    student: any
  } | null>(null)

  const getPurchasesAndPartners = async () => {
    const purchaseIds = lesson.purchaseIds as number[]

    const req = await getClientsByPurchaseIds({
      purchaseIds,
      type: lesson.type === "kids" ? "kids" : "partners",
    })
    setPartners(req.clients)
    setPurchases(req.purchases)
  }

  useEffect(() => {
    getPurchasesAndPartners()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChange = async (_e: CheckboxChangeEvent, id: number) => {
    const findIndex = assistances.indexOf(id)

    if (findIndex !== -1) {
      assistances.splice(findIndex, 1)

      await updateSchedule({
        ...lesson,
        purchaseIds: JSON.stringify(lesson.purchaseIds),
        assists: JSON.stringify(assistances.splice(findIndex, 1)),
      })
    } else {
      setAssistances([...assistances, id])
      await updateSchedule({
        ...lesson,
        purchaseIds: JSON.stringify(lesson.purchaseIds),
        assists: JSON.stringify([...assistances, id]),
      })
    }
  }

  const [noQuotaAvailable, setNoQuotaAvailable] = useState<boolean>(false)
  const [action, setAction] = useState<"edit" | "create" | null>(null)
  const [lessonToEdit, setLessonToEdit] = useState<CalendarInterface | null>(
    null,
  )

  const [isAvailable, setIsAvailable] = useState<boolean>(false)
  const [newDate, setNewDate] = useState<string>("")
  const [newHour, setNewHour] = useState<{
    id: number
    display_name: string
  } | null>(null)

  const type = lessonTypes.filter(
    lessonType => lessonType.value === lesson.type,
  )

  const hoursAvailable: {
    id: number
    display_name: string
  }[] = hoursForComboBox.filter(hour =>
    JSON.parse(type[0].hours as string).includes(hour.id),
  )

  const validateAvailability = async () => {
    const req = await getLessonScheduleByDay(newDate.replaceAll("/", "-"))

    const findSameType = req.data?.filter(
      searchedLesson =>
        searchedLesson.type === lesson.type &&
        parseInt(searchedLesson.hourRange, 10) === newHour.id,
    )

    if (req.data.length === 0 || findSameType.length === 0) {
      setIsAvailable(true)
      setAction("create")
      setLessonToEdit(null)
    } else {
      const amountOfStudents = JSON.parse(findSameType[0].purchaseIds)

      if (amountOfStudents.length < type[0].quota) {
        setNoQuotaAvailable(false)
        setIsAvailable(true)
        setAction("edit")
        setLessonToEdit(findSameType[0])
      } else {
        setNoQuotaAvailable(true)
        setLessonToEdit(null)
        setIsAvailable(false)
      }
    }
  }

  const executeChange = async () => {
    if (action === "edit") {
      const purchaseIdsOfLessonToEdit = JSON.parse(
        lessonToEdit.purchaseIds as string,
      )
      const body = {
        ...lessonToEdit,
        purchaseIds: JSON.stringify([
          ...purchaseIdsOfLessonToEdit,
          editPurchaseModal.purchase.id,
        ]),
      }

      const updateScheduleReq = await updateSchedule(body)

      // eliminar el purchaseId de la compra actual de la clase actual !!!
      const ids = lesson.purchaseIds as number[]
      const filterId = ids.filter(id => id !== editPurchaseModal.purchase.id)
      const bodyLessonToRemoveFrom = {
        ...lesson,
        assists: JSON.stringify(lesson.assists),
        purchaseIds: JSON.stringify(filterId),
      }

      const updateCurrentLesson = await updateSchedule(bodyLessonToRemoveFrom)

      if (
        updateScheduleReq.message.status === 200 &&
        updateCurrentLesson.message.status === 200
      ) {
        setEditPurchaseModal(null)
        setRefreshAgenda(refreshAgenda + 1)
      }
    } else {
      const weekId = getWeekNumber(newDate.replaceAll("/", "-")).week

      const body = {
        id: 0,
        date: newDate.replaceAll("/", "-"),
        weekId,
        hourRange: `${newHour.id}`,
        type: lesson.type,
        purchaseIds: JSON.stringify([editPurchaseModal.purchase.id]),
        assists: JSON.stringify([]),
      }

      const createLesson = await createLessonSchedule(body)

      const ids = lesson.purchaseIds as number[]
      const filterId = ids.filter(id => id !== editPurchaseModal.purchase.id)
      const bodyLessonToRemoveFrom = {
        ...lesson,
        assists: JSON.stringify(lesson.assists),
        purchaseIds: JSON.stringify(filterId),
      }

      const updateCurrentLesson = await updateSchedule(bodyLessonToRemoveFrom)

      if (
        createLesson.message.status === 200 &&
        updateCurrentLesson.message.status === 200
      ) {
        setEditPurchaseModal(null)
        // *** VER COMO ACTUALIZAR LA LISTA DE ALUMNOS
        setRefreshAgenda(refreshAgenda + 1)
      }
    }
  }

  return (
    <div>
      {editPurchaseModal === null ? (
        <div>
          {partners.length > 0 &&
            partners.map((partner, index) => (
              <Student key={partner.id}>
                <p>
                  • {partner.name} {partner.last_name}
                </p>
                <div className="interactions">
                  <button
                    type="button"
                    className="button-edit"
                    onClick={() =>
                      setEditPurchaseModal({
                        purchase: purchases[index],
                        student: partner,
                      })
                    }
                  >
                    <Icon icon="IconEdit" />
                  </button>
                  <Checkbox
                    checked={assistances.indexOf(partner.id) >= 0}
                    onChange={e => onChange(e, partner.id)}
                  />
                </div>
              </Student>
            ))}
        </div>
      ) : (
        <EditModal>
          <b>
            {editPurchaseModal.student.name}{" "}
            {editPurchaseModal.student.last_name}
          </b>
          <div className="selection">
            <InputCalendar
              reference={undefined}
              label="Fecha"
              required
              width={190}
              maxCalendarDate={editPurchaseModal.purchase.paymentExpireDate.replaceAll(
                "-",
                "/",
              )}
              onChange={e => {
                setNewDate(e.selectedChangeDate)
                setNoQuotaAvailable(false)
              }}
            />
            <Autocomplete
              width={100}
              required
              label="Horario"
              options={hoursAvailable}
              onChangeProps={(e: { id: number; display_name: string }) => {
                setNewHour(e)
                setNoQuotaAvailable(false)
              }}
            />
            <button
              type="button"
              className="validate"
              onClick={validateAvailability}
            >
              Validar disponibilidad
            </button>
          </div>
          {noQuotaAvailable && (
            <p className="error">
              No hay disponibilidad para la fecha y/u horario seleccionados
            </p>
          )}
          <div className="buttons">
            <Button
              onClick={() => {
                setEditPurchaseModal(null)
                setRefreshAgenda(refreshAgenda + 1)
              }}
            >
              Cancelar
            </Button>
            <Button
              disabled={!isAvailable}
              type="primary"
              onClick={executeChange}
            >
              Guardar cambios
            </Button>
          </div>
        </EditModal>
      )}
    </div>
  )
}

export default LessonModal
