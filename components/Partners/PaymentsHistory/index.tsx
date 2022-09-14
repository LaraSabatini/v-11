import React, { useContext, useEffect, useState } from "react"
import getCombos from "services/Partners/GetCombos.service"
import getTrainers from "services/Trainers/GetTrainers.service"
import getPartnerPayments from "services/Partners/GetPartnerPayments.service"
import getPrices from "services/Partners/GetPrices.service"
import editPartnerPayment from "services/Partners/EditPartnerPayment.service"
import { PartnersContext } from "contexts/Partners"
import PaymentInterface from "interfaces/partners/PaymentInterface"
import ScrollView from "components/UI/ScrollView"
import ModalForm from "components/UI/ModalForm"
import Autocomplete from "components/UI/Autocomplete"
import TextField from "components/UI/TextField"
import Checkbox from "components/UI/Checkbox"
import Container from "./styles"
import PaymentCard from "./PaymentCard"
import {
  HorizontalGroup,
  SubContainer,
  CheckboxContainer,
} from "../CreatePartner/styles"

const PaymentsHistory = () => {
  const {
    setCombos,
    combos,
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
    trainersList,
    trainertRef,
    setTrainerSelected,
    setComboSelected,
    paymentMethods,
    paymentRef,
    setPaymentMethodSelected,
    finalPrice,
    isChecked,
    setTrainersList,
    setFinalPrice,
    paymentMethodSelected,
    paidTimeUnit,
    setPrices,
    prices,
    cleanStates,
    setModalSuccess,
    setModalError,
  } = useContext(PartnersContext)
  const [paymentsList, setPaymentsList] = useState<PaymentInterface[]>([])
  const [activeEdition, setActiveEdition] = useState<PaymentInterface>()
  const [triggerListUpdate, setTriggerListUpdate] = useState<number>(1)

  const [newValues, setNewValues] = useState<PaymentInterface>(null)

  const fillData = async () => {
    const data = await getCombos()
    setCombos(data.data)

    const payments = await getPartnerPayments(1)
    setPaymentsList(payments.data)

    const pricesData = await getPrices()
    setPrices(pricesData.data)
  }

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerListUpdate])

  const combosAutocomplete = []
  combos.map(combo =>
    combosAutocomplete.push({
      id: combo.id,
      display_name: combo.name,
    }),
  )

  const handleEdit = async e => {
    e.preventDefault()

    const today = new Date()
    const newDate = new Date(today.setMonth(today.getMonth() + paidTime))
    const expireDate = newDate.getDate()
    const expireMonth = newDate.getMonth()
    const expireYear = newDate.getFullYear()
    const finalExpireDay = expireDate > 9 ? expireDate : `0${expireDate}`
    let finalExpireMonth
    if (comboSelected !== null && comboSelected !== undefined) {
      finalExpireMonth =
        expireMonth + 2 > 9 ? expireMonth + 2 : `0${expireMonth + 2}`
    } else {
      finalExpireMonth =
        expireMonth + 1 > 9 ? expireMonth + 1 : `0${expireMonth + 1}`
    }

    const body = {
      ...newValues,
      price_paid: finalPrice,
      payment_expire_date:
        (paidTimeUnit !== undefined && paidTimeUnit.id === 2) ||
        (comboSelected !== null && comboSelected !== undefined)
          ? `${finalExpireDay}/${finalExpireMonth}/${expireYear}`
          : "",
    }
    // eslint-disable-next-line no-console
    console.log(body)
    // calcular expire date

    await paidTimeUnitRef.current?.focus()
    await trainertRef.current?.focus()
    await paymentRef.current?.focus()
    if (
      paidTimeUnitRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      trainertRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      paymentRef.current.attributes.getNamedItem("data-error").value === "false"
    ) {
      const executeEdition = await editPartnerPayment(body)

      if (executeEdition.message === "payment updated successfully") {
        setModalSuccess({
          status: "success",
          icon: "IconCheckModal",
          title: "Excelente!",
          content: "El pago ha sido actualizado correctamente",
        })
        setTriggerListUpdate(triggerListUpdate + 1)
        setActiveEdition(null)
        setNewValues(null)
        cleanStates()
      } else {
        setModalError({
          status: "alert",
          icon: "IconExclamation",
          title: "UPS!",
          content:
            "El pago no se pudo procesar, por favor intentalo nuevamente o comunicate con el admin.",
        })
        setActiveEdition(null)
        setNewValues(null)
        cleanStates()
      }
    }
  }

  const cancelEdit = () => {
    setActiveEdition(null)
    setNewValues(null)
    cleanStates()
  }

  const fillTrainersData = async () => {
    const data = await getTrainers()
    const arrayTrainers = []
    data.data.map(trainer =>
      arrayTrainers.push({
        id: trainer.id,
        display_name: `${trainer.name} ${trainer.last_name}`,
      }),
    )

    setTrainersList(arrayTrainers)
  }

  useEffect(() => {
    fillTrainersData()
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
        // si paga un dia
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
            // si paga X dias
            price += prices[0].price_cash * paidTime
          } else {
            // si paga X meses
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
        // si paga un dia
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
            // si paga X dias
            price += prices[0].price_mp * paidTime
          } else {
            // si paga X meses
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    paidTimeUnit,
    paidTime,
    paymentMethodSelected,
    comboSelected,
    amountOfClases,
  ])

  return (
    <ScrollView height={500}>
      <Container>
        {paymentsList.length &&
          paymentsList.map(payment => (
            <PaymentCard
              key={payment.id}
              partner_name={payment.partner_name}
              partner_last_name={payment.partner_last_name}
              combo={payment.combo}
              time_paid={payment.time_paid}
              time_paid_unit={payment.time_paid_unit}
              clases_paid={payment.clases_paid}
              trainer_name={payment.trainer_name}
              payment_expire_date={payment.payment_expire_date}
              date={payment.date}
              onClickEdit={() => {
                setActiveEdition(payment)
                setNewValues(payment)
              }}
            />
          ))}
      </Container>
      {activeEdition !== undefined &&
        activeEdition !== null &&
        newValues !== null && (
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
                    ? combos.filter(combo => combo.id === newValues.combo)[0]
                        .name
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
              <Autocomplete
                label="Profesor"
                width={290}
                required={
                  amountOfClases !== undefined &&
                  amountOfClases !== 0 &&
                  amountOfClases !== ""
                }
                setValue={newValues.trainer_name}
                options={trainersList}
                ref={trainertRef}
                onChangeProps={(e: { id: number; display_name: string }) => {
                  setTrainerSelected(e)
                  setNewValues({
                    ...newValues,
                    trainer_id: e.id,
                    trainer_name: e.display_name,
                  })
                }}
              />
            </HorizontalGroup>
            <HorizontalGroup>
              <Autocomplete
                required
                label="Metodo de pago"
                width={150}
                options={paymentMethods}
                setValue={newValues.payment_method_name}
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
        )}
    </ScrollView>
  )
}

export default PaymentsHistory
