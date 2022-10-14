import React, { useContext, useEffect } from "react"
// SERVICES
import { getSchedule } from "services/Trainers/Schedule.service"
// DATA STORAGE & TYPES
import { PartnersContext } from "contexts/Partners"
import { paymentMethods, paymentUsers } from "const/finances"
import { timeUnits } from "const/time"
import ScheduleInterface from "interfaces/trainers/ScheduleInterface"
import CombosInterface from "interfaces/partners/CombosInterface"
import partnerTexts from "strings/partners.json"
import generalTexts from "strings/general.json"
// COMPONENTS & STYLING
import ModalForm from "components/UI/ModalForm"
import Autocomplete from "components/UI/Autocomplete"
import TextField from "components/UI/TextField"
import Checkbox from "components/UI/Checkbox"
// import ComboBoxSelect from "components/UI/ComboBoxSelect"
import {
  HorizontalGroup,
  SubContainer,
  CheckboxContainer,
} from "../../../CreatePartner/styles"

interface EditPaymentInterface {
  handleEdit: (arg?: any) => void
  cancelEdit: (arg?: any) => void
  partnerName: string
  partnerLastName: string
}

const EditPayment = ({
  handleEdit,
  cancelEdit,
  partnerName,
  partnerLastName,
}: EditPaymentInterface) => {
  const {
    comboRef,
    comboSelected,
    paidTimeRef,
    setPaidTime,
    paidTime,
    paidTimeUnitRef,
    setPaidTimeUnit,
    setIsChecked,
    // clasesRef,
    // setAmountOfClases,
    // amountOfClases,
    setComboSelected,
    paymentRef,
    setPaymentMethodSelected,
    finalPrice,
    isChecked,
    paymentMethodSelected,
    paidTimeUnit,
    setScheduleList,
    // setScheduleSelected,
    // scheduleList,
    combos,
    setNewValues,
    newValues,
    calculatePrice,
    setPaymentUserSelected,
    paymentUserRef,
    usesDay,
    setUsesDay,
  } = useContext(PartnersContext)

  const fillScheduleData = async () => {
    const data = await getSchedule()
    const arraySchedule = []
    data.data.map((schedule: ScheduleInterface) =>
      arraySchedule.push({
        id: schedule.id,
        display_name: `${schedule.day_and_hour}`,
      }),
    )

    setScheduleList(arraySchedule)
  }

  useEffect(() => {
    fillScheduleData()
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    calculatePrice()
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    paidTimeUnit,
    paidTime,
    paymentMethodSelected,
    comboSelected,
    // amountOfClases,
  ])

  const combosAutocomplete = []
  combos.map((combo: CombosInterface) =>
    combosAutocomplete.push({
      id: combo.id,
      display_name: combo.name,
    }),
  )

  return (
    <>
      <ModalForm
        title={`Editar Pago - ${partnerName} ${partnerLastName}`}
        cancelButtonContent="Cancelar"
        submitButtonContent="Confirmar"
        submit={handleEdit}
        cancelFunction={cancelEdit}
      >
        <HorizontalGroup>
          <Autocomplete
            label="Combo"
            width={180}
            options={combosAutocomplete}
            setValue={
              newValues.combo !== 0 && newValues.combo !== null
                ? combos.filter(
                    (combo: CombosInterface) => combo.id === newValues.combo,
                  )[0].name
                : ""
            }
            ref={comboRef}
            onChangeProps={(e: { id: number; display_name: string }) => {
              setComboSelected(e.id)
              setNewValues({ ...newValues, combo: e.id })
            }}
          />
          <TextField
            label="Precio x Combo"
            type="number"
            disabledAutocompleted
            disabled
            width={100}
            value={
              comboSelected !== null && comboSelected !== undefined
                ? `$${
                    combos.filter(
                      (combo: CombosInterface) => combo.id === comboSelected,
                    )[0]?.price_cash
                  } /  $${
                    combos.filter(
                      (combo: CombosInterface) => combo.id === comboSelected,
                    )[0]?.price_mp
                  }`
                : ""
            }
          />
        </HorizontalGroup>
        <HorizontalGroup>
          <SubContainer>
            <TextField
              width={60}
              label="Tiempo"
              type="number"
              reference={paidTimeRef}
              value={`${newValues.time_paid}`}
              onChange={e => {
                const number = parseInt(e.target.value, 10)
                // eslint-disable-next-line no-restricted-globals
                if (isNaN(number)) {
                  setPaidTime(0)
                  setNewValues({ ...newValues, time_paid: 0 })
                } else {
                  setPaidTime(number)
                  setNewValues({ ...newValues, time_paid: number })
                }
              }}
            />
            <Autocomplete
              label={partnerTexts.create.unit}
              required={paidTime !== 0 && paidTime !== ""}
              width={115}
              options={timeUnits}
              setValue={
                newValues.time_paid_unit !== 0
                  ? timeUnits.filter(
                      tu => tu.id === newValues.time_paid_unit,
                    )[0]?.display_name
                  : ""
              }
              ref={paidTimeUnitRef}
              onChangeProps={(e: { id: number; display_name: string }) => {
                setPaidTimeUnit(e)
                setNewValues({ ...newValues, time_paid_unit: e.id })
                if (e.id !== 1) {
                  setIsChecked(true)
                } else {
                  setIsChecked(false)
                }
              }}
            />
          </SubContainer>
          {/* <TextField
            width={100}
            label="Clases"
            type="number"
            reference={clasesRef}
            value={`${newValues.clases_paid}`}
            onChange={e => {
              const number = parseInt(e.target.value, 10)
              // eslint-disable-next-line no-restricted-globals
              if (isNaN(number)) {
                setAmountOfClases(0)
                setNewValues({ ...newValues, clases_paid: 0 })
              } else {
                setAmountOfClases(number)
                setNewValues({ ...newValues, clases_paid: number })
              }
            }}
          /> */}
        </HorizontalGroup>
        {/* <HorizontalGroup>
          <ComboBoxSelect
            required={
              amountOfClases !== undefined &&
              amountOfClases !== 0 &&
              amountOfClases !== ""
            }
            onChange={e => {
              const ids = []
              e.map(data => ids.push(data.id))
              setScheduleSelected(ids)
            }}
            options={scheduleList}
            width={290}
            label="Dias y Horarios"
            optionsList="single"
          />
        </HorizontalGroup> */}
        <HorizontalGroup>
          <Autocomplete
            required
            label="Metodo de pago"
            width={150}
            options={paymentMethods}
            setValue={
              newValues.payment_method_name !== "0"
                ? `${newValues.payment_method_name}`
                : ""
            }
            ref={paymentRef}
            onChangeProps={(e: { id: number; display_name: string }) => {
              setPaymentMethodSelected(e.id)
              setNewValues({
                ...newValues,
                payment_method_name: e.display_name,
                payment_method_id: e.id,
              })
              if (e.id === 1) {
                setPaymentUserSelected(null)
              }
            }}
          />
          <TextField
            label="Precio final"
            type="text"
            disabledAutocompleted
            disabled
            width={130}
            value={`${finalPrice}` || ""}
          />
        </HorizontalGroup>
        {paymentMethodSelected === 2 && (
          <HorizontalGroup>
            <Autocomplete
              required
              label={generalTexts.payments.digital_user}
              width={150}
              options={paymentUsers}
              ref={paymentUserRef}
              onChangeProps={(e: { id: number; display_name: string }) =>
                setPaymentUserSelected(e)
              }
            />
          </HorizontalGroup>
        )}
        <div style={{ display: "flex", gap: "10px" }}>
          <CheckboxContainer>
            <Checkbox checked={isChecked} isDisabled idParam="free-pass" />
            <p>{partnerTexts.free_pass}</p>
          </CheckboxContainer>
          {paidTimeUnit.id === 1 && (
            <CheckboxContainer>
              <Checkbox
                ownState
                checked={usesDay}
                onChange={() => setUsesDay(!usesDay)}
                idParam="use-day"
              />
              <p>{partnerTexts.usesDay}</p>
            </CheckboxContainer>
          )}
        </div>
      </ModalForm>
    </>
  )
}

export default EditPayment
