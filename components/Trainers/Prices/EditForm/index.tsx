/* eslint-disable no-console */
import React, { useState, useEffect } from "react"
import { LessonTypesInterface } from "interfaces/lessons/Calendar"
import { updateLessonType } from "services/Trainers/agenda.service"
import TextField from "@components/UI/TextField"
import ComboBoxSelect from "@components/UI/ComboBoxSelect"
import ModalForm from "components/UI/ModalForm"
import { hoursForComboBox } from "const/time"
import ModalAlert from "components/UI/ModalAlert"
import { Color, ColorPicker, createColor } from "material-ui-color"
import { ModalContent } from "../styles"

function EditForm({
  close,
  lesson,
}: {
  close: (arg?: any) => void
  lesson: LessonTypesInterface
}) {
  const [modalSuccess, setModalSuccess] = useState<boolean>(false)

  const [newType, setNewType] = useState<LessonTypesInterface>(lesson)
  const [hoursSelected, setHoursSelected] = useState<
    { id: number; display_name: string }[]
  >()
  const [color, setColor] = useState(createColor(lesson.colorSecondary))

  const handleChange = (newValue: Color) => {
    setColor(newValue)
  }

  const setOpacity = (hex: string, alpha: number) =>
    `${hex}${Math.floor(alpha * 255)
      .toString(16)
      .padStart(2, "0")}`

  const create = async (e: any) => {
    e.preventDefault()

    const hourIds: number[] = []
    hoursSelected.forEach(hour => hourIds.push(hour.id))

    const req = await updateLessonType({
      ...newType,
      hours: JSON.stringify(hourIds),
      color: `#${setOpacity(color.hex, 0.5)}`,
      colorSecondary: color.css.backgroundColor,
    })

    setModalSuccess(req.message.status === 200)
  }

  const formatHours = () => {
    const hoursToJSON = JSON.parse(newType.hours as string)
    const filteredHours = hoursForComboBox.filter(hour =>
      hoursToJSON.includes(hour.id),
    )
    setHoursSelected(filteredHours)
  }

  useEffect(() => {
    formatHours()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ModalForm
      title={`Editar: ${lesson.name}`}
      cancelButtonContent="Cancelar"
      submitButtonContent="Guardar cambios"
      submit={e => create(e)}
      cancelFunction={close}
    >
      <ModalContent>
        {modalSuccess && (
          <ModalAlert
            success
            message={{
              status: "success",
              icon: "IconCheck",
              title: "Excelente",
              content: "La clase se ha creado exitosamente",
            }}
            closeRefresh={close}
          />
        )}
        <TextField
          label="Nombre de categoria"
          type="text"
          required
          value={newType.name}
          onChange={e =>
            setNewType({
              ...newType,
              name: e.target.value,
              value: e.target.value.replaceAll(" ", "-"),
            })
          }
        />
        <ComboBoxSelect
          optionsList="single"
          label="Horario de clases"
          required
          options={hoursForComboBox}
          onChange={e => setHoursSelected(e)}
          activeOptions={hoursSelected}
        />
        <p className="tag">Precio Unitario</p>
        <div className="sub-container">
          <TextField
            label="Efectivo"
            type="text"
            width={145}
            required
            value={`${newType.unit_price_cash}`}
            onChange={e => {
              if (e.target.value === "") {
                setNewType({
                  ...newType,
                  unit_price_cash: 0,
                })
              } else {
                setNewType({
                  ...newType,
                  unit_price_cash: parseInt(e.target.value, 10),
                })
              }
            }}
          />
          <TextField
            label="Mercado Pago"
            type="text"
            width={145}
            required
            value={`${newType.unit_price_mp}`}
            onChange={e => {
              if (e.target.value === "") {
                setNewType({
                  ...newType,
                  unit_price_mp: 0,
                })
              } else {
                setNewType({
                  ...newType,
                  unit_price_mp: parseInt(e.target.value, 10),
                })
              }
            }}
          />
        </div>
        <p className="tag">Precio 4 clases</p>
        <div className="sub-container">
          <TextField
            label="Efectivo"
            type="text"
            width={145}
            required
            value={`${newType.four_price_cash}`}
            onChange={e => {
              if (e.target.value === "") {
                setNewType({
                  ...newType,
                  four_price_cash: 0,
                })
              } else {
                setNewType({
                  ...newType,
                  four_price_cash: parseInt(e.target.value, 10),
                })
              }
            }}
          />
          <TextField
            label="Mercado Pago"
            type="text"
            width={145}
            required
            value={`${newType.four_price_mp}`}
            onChange={e => {
              if (e.target.value === "") {
                setNewType({
                  ...newType,
                  four_price_mp: 0,
                })
              } else {
                setNewType({
                  ...newType,
                  four_price_mp: parseInt(e.target.value, 10),
                })
              }
            }}
          />
        </div>
        <p className="tag">Precio 8 clases</p>

        <div className="sub-container">
          <TextField
            label="Efectivo"
            type="text"
            width={145}
            required
            value={`${newType.eight_price_cash}`}
            onChange={e => {
              if (e.target.value === "") {
                setNewType({
                  ...newType,
                  eight_price_cash: 0,
                })
              } else {
                setNewType({
                  ...newType,
                  eight_price_cash: parseInt(e.target.value, 10),
                })
              }
            }}
          />
          <TextField
            label="Mercado Pago"
            type="text"
            width={145}
            required
            value={`${newType.eight_price_mp}`}
            onChange={e => {
              if (e.target.value === "") {
                setNewType({
                  ...newType,
                  eight_price_mp: 0,
                })
              } else {
                setNewType({
                  ...newType,
                  eight_price_mp: parseInt(e.target.value, 10),
                })
              }
            }}
          />
        </div>
        <TextField
          label="Cupo"
          type="text"
          width={145}
          required
          value={`${newType.quota}`}
          onChange={e =>
            setNewType({
              ...newType,
              quota: parseInt(e.target.value, 10),
            })
          }
        />

        <ColorPicker value={color} onChange={handleChange} />
      </ModalContent>
    </ModalForm>
  )
}

export default EditForm
