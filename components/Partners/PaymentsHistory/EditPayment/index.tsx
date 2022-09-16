import React, { useContext, useEffect } from "react"
import { getSchedule } from "services/Trainers/Schedule.service"
import { PartnersContext } from "contexts/Partners"
import ModalForm from "components/UI/ModalForm"
import Autocomplete from "components/UI/Autocomplete"
import TextField from "components/UI/TextField"
import Checkbox from "components/UI/Checkbox"
import ComboBoxSelect from "components/UI/ComboBoxSelect"
import {
  HorizontalGroup,
  SubContainer,
  CheckboxContainer,
} from "../../CreatePartner/styles"

interface EditPaymentInterface {
  handleEdit: (arg?: any) => void
  cancelEdit: (arg?: any) => void
}

const EditPayment = ({ handleEdit, cancelEdit }: EditPaymentInterface) => {
  const {
    comboRef,
    comboSelected,
    paidTimeRef,
    setPaidTime,
    paidTime,
    timeUnits,
    paidTimeUnitRef,
    setPaidTimeUnit,
    setIsChecked,
    clasesRef,
    setAmountOfClases,
    amountOfClases,
    setComboSelected,
    paymentMethods,
    paymentRef,
    setPaymentMethodSelected,
    finalPrice,
    isChecked,
    setFinalPrice,
    paymentMethodSelected,
    paidTimeUnit,
    prices,
    setScheduleList,
    setScheduleSelected,
    scheduleList,
    activeEdition,
    combos,
    setNewValues,
    newValues,
  } = useContext(PartnersContext)

  const fillScheduleData = async () => {
    const data = await getSchedule()
    const arraySchedule = []
    data.data.map(schedule =>
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

  const calculatePrice = () => {
    if (paymentMethodSelected === 1) {
      let price = 0
      if (comboSelected !== null && comboSelected !== undefined) {
        const comboCash = combos.filter(combo => combo.id === comboSelected)
        price += comboCash[0].price_cash
      }
      if (
        paidTime !== null &&
        paidTime !== 0 &&
        paidTimeUnit !== undefined &&
        paidTimeUnit.id !== null
      ) {
        //   si paga un dia
        if (paidTime === 1 && paidTimeUnit.id === 1) {
          price += prices[0].price_cash
        } else if (paidTime === 8 && paidTimeUnit.id === 1) {
          // si paga 8 dias
          price += prices[1].price_cash
        } else if (paidTime === 1 && paidTimeUnit.id === 2) {
          // si paga un mes
          price += prices[2].price_cash
        } else {
          // eslint-disable-next-line no-lonely-if
          if (paidTimeUnit.id === 1) {
            //   si paga X dias
            price += prices[0].price_cash * paidTime
          } else {
            //   si paga X meses
            price += prices[2].price_cash * paidTime
          }
        }
      }
      if (amountOfClases !== undefined) {
        if (amountOfClases === 1) {
          price += prices[3].price_cash
        } else if (amountOfClases === 4) {
          price += prices[4].price_cash
        } else if (amountOfClases === 8) {
          price += prices[5].price_cash
        } else {
          // si no son ni 1 ni 4 ni 8
          price += prices[3].price_cash * amountOfClases
        }
      }
      setFinalPrice(price)
    } else if (paymentMethodSelected === 2) {
      let price = 0
      if (comboSelected !== null && comboSelected !== undefined) {
        const comboCash = combos.filter(combo => combo.id === comboSelected)
        price += comboCash[0].price_mp
      }
      if (
        paidTime !== null &&
        paidTime !== 0 &&
        paidTimeUnit !== undefined &&
        paidTimeUnit.id !== null
      ) {
        //   si paga un dia
        if (paidTime === 1 && paidTimeUnit.id === 1) {
          price += prices[0].price_mp
        } else if (paidTime === 8 && paidTimeUnit.id === 1) {
          // si paga 8 dias
          price += prices[1].price_mp
        } else if (paidTime === 1 && paidTimeUnit.id === 2) {
          // si paga un mes
          price += prices[2].price_mp
        } else {
          // eslint-disable-next-line no-lonely-if
          if (paidTimeUnit.id === 1) {
            //   si paga X dias
            price += prices[0].price_mp * paidTime
          } else {
            //   si paga X meses
            price += prices[2].price_mp * paidTime
          }
        }
      }
      if (amountOfClases !== undefined) {
        if (amountOfClases === 1) {
          price += prices[3].price_mp
        } else if (amountOfClases === 4) {
          price += prices[4].price_mp
        } else if (amountOfClases === 8) {
          price += prices[5].price_mp
        } else {
          // si no son ni 1 ni 4 ni 8
          price += prices[3].price_mp * amountOfClases
        }
      }
      setFinalPrice(price)
    } else {
      setFinalPrice(0)
    }
  }

  useEffect(() => {
    calculatePrice()
    //   eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    paidTimeUnit,
    paidTime,
    paymentMethodSelected,
    comboSelected,
    amountOfClases,
  ])

  const combosAutocomplete = []
  combos.map(combo =>
    combosAutocomplete.push({
      id: combo.id,
      display_name: combo.name,
    }),
  )

  return (
    <>
      <ModalForm
        title={`Editar Pago - ${activeEdition.partner_name} ${activeEdition.partner_last_name}`}
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
                ? combos.filter(combo => combo.id === newValues.combo)[0].name
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
                    combos.filter(combo => combo.id === comboSelected)[0]
                      ?.price_cash
                  } /  $${
                    combos.filter(combo => combo.id === comboSelected)[0]
                      ?.price_mp
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
              label="Unidad"
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
          <TextField
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
          />
        </HorizontalGroup>
        <HorizontalGroup>
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
        </HorizontalGroup>
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
        <CheckboxContainer>
          <Checkbox checked={isChecked} isDisabled idParam="free-pass" />
          <p>Pase libre</p>
        </CheckboxContainer>
      </ModalForm>
    </>
  )
}

export default EditPayment
