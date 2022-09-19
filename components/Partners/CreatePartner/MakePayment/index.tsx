import React, { useContext, useEffect } from "react"
import { PartnersContext } from "contexts/Partners"
import { getSchedule } from "services/Trainers/Schedule.service"
import Autocomplete from "components/UI/Autocomplete"
import TextField from "components/UI/TextField"
import ComboBoxSelect from "components/UI/ComboBoxSelect"
import Checkbox from "components/UI/Checkbox"
import { HorizontalGroup, SubContainer, CheckboxContainer } from "../styles"
import { Form } from "./styles"

const MakePayment = () => {
  const {
    timeUnits,
    paidTimeUnitRef,
    paidTimeRef,
    comboRef,
    clasesRef,
    paymentRef,
    setPaidTime,
    setPaidTimeUnit,
    combos,
    paymentMethods,
    setComboSelected,
    setAmountOfClases,
    isChecked,
    setIsChecked,
    comboSelected,
    paidTimeUnit,
    paidTime,
    // prices,
    finalPrice,
    // setFinalPrice,
    amountOfClases,
    paymentMethodSelected,
    setPaymentMethodSelected,
    setScheduleList,
    scheduleList,
    setScheduleSelected,
    calculatePrice,
    usesDay,
    setUsesDay,
    // paymentUsers,
    // paymentUserRef,
    // setPaymentUserSelected,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const combosAutocomplete = []
  combos.map(combo =>
    combosAutocomplete.push({
      id: combo.id,
      display_name: combo.name,
    }),
  )

  useEffect(() => {
    calculatePrice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    paidTimeUnit,
    paidTime,
    paymentMethodSelected,
    comboSelected,
    amountOfClases,
  ])

  return (
    <Form>
      <HorizontalGroup>
        <Autocomplete
          label="Combo"
          width={180}
          options={combosAutocomplete}
          ref={comboRef}
          onChangeProps={(e: { id: number; display_name: string }) => {
            setComboSelected(e.id)
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
            value={paidTime}
            onChange={e => {
              const number = parseInt(e.target.value, 10)
              // eslint-disable-next-line no-restricted-globals
              if (isNaN(number)) {
                setPaidTime(0)
              } else {
                setPaidTime(number)
              }
            }}
          />
          <Autocomplete
            label="Unidad"
            required={paidTime !== 0 && paidTime !== ""}
            width={115}
            options={timeUnits}
            ref={paidTimeUnitRef}
            setValue={paidTimeUnit.display_name}
            onChangeProps={(e: { id: number; display_name: string }) => {
              setPaidTimeUnit(e)
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
          onChange={e => {
            const number = parseInt(e.target.value, 10)
            // eslint-disable-next-line no-restricted-globals
            if (isNaN(number)) {
              setAmountOfClases(0)
            } else {
              setAmountOfClases(number)
            }
          }}
        />
      </HorizontalGroup>
      <HorizontalGroup>
        {/* ACA ************************************** */}
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
            paymentMethods.filter(
              payment => payment.id === paymentMethodSelected,
            )[0].display_name
          }
          ref={paymentRef}
          onChangeProps={(e: { id: number; display_name: string }) =>
            setPaymentMethodSelected(e.id)
          }
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
      {/* <HorizontalGroup>
        <Autocomplete
          required={paymentMethodSelected === 2}
          label="MP User"
          width={150}
          options={paymentUsers}
          ref={paymentUserRef}
          onChangeProps={(e: { id: number; display_name: string }) =>
            setPaymentUserSelected(e)
          }
        />
      </HorizontalGroup> */}
      <div style={{ display: "flex", gap: "10px" }}>
        <CheckboxContainer>
          <Checkbox checked={isChecked} isDisabled idParam="free-pass" />
          <p>Pase libre</p>
        </CheckboxContainer>
        {paidTimeUnit.id === 1 && (
          <CheckboxContainer>
            <Checkbox
              ownState
              checked={usesDay}
              onChange={() => setUsesDay(!usesDay)}
              idParam="use-day"
            />
            <p>Usa dia hoy</p>
          </CheckboxContainer>
        )}
      </div>
    </Form>
  )
}

export default MakePayment
