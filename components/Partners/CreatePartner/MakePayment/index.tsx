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
import Autocomplete from "components/UI/Autocomplete"
import TextField from "components/UI/TextField"
import Checkbox from "components/UI/Checkbox"
// import InputCalendar from "components/UI/InputCalendar"
import { HorizontalGroup, SubContainer, CheckboxContainer } from "../styles"
import { Form } from "./styles"

const MakePayment = () => {
  const {
    paidTimeUnitRef,
    paidTimeRef,
    comboRef,
    paymentRef,
    setPaidTime,
    setPaidTimeUnit,
    combos,
    setComboSelected,
    isChecked,
    setIsChecked,
    comboSelected,
    paidTimeUnit,
    paidTime,
    finalPrice,
    amountOfLessons,
    paymentMethodSelected,
    setPaymentMethodSelected,
    setScheduleList,
    calculatePrice,
    usesDay,
    setUsesDay,
    paymentUserRef,
    setPaymentUserSelected,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const combosAutocomplete = []
  combos.map((combo: CombosInterface) =>
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
    amountOfLessons,
  ])

  return (
    <Form>
      <HorizontalGroup>
        <Autocomplete
          label={partnerTexts.combo}
          width={180}
          options={combosAutocomplete}
          ref={comboRef}
          onChangeProps={(e: { id: number; display_name: string }) => {
            setComboSelected(e.id)
          }}
        />
        <TextField
          label={partnerTexts.combo_price}
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
            label={partnerTexts.time}
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
            label={partnerTexts.create.unit}
            required={paidTime !== 0 && paidTime !== ""}
            width={115}
            options={timeUnits}
            ref={paidTimeUnitRef}
            setValue={paidTime !== 0 ? paidTimeUnit.display_name : ""}
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
      </HorizontalGroup>
      <HorizontalGroup>
        <Autocomplete
          required
          label={partnerTexts.payment_method}
          width={150}
          options={paymentMethods}
          setValue={
            paymentMethods.filter(
              payment => payment.id === paymentMethodSelected,
            )[0].display_name
          }
          ref={paymentRef}
          onChangeProps={(e: { id: number; display_name: string }) => {
            setPaymentMethodSelected(e.id)
            if (e.id === 1) {
              setPaymentUserSelected(null)
            }
          }}
        />
        <TextField
          label={partnerTexts.final_price}
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
    </Form>
  )
}

export default MakePayment
