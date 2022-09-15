import React, { useContext, useEffect, useState } from "react"
import getCombos from "services/Partners/GetCombos.service"
// import getTrainers from "services/Trainers/GetTrainers.service"
import { getSchedule } from "services/Trainers/Schedule.service"
import getPartnerPayments from "services/Partners/GetPartnerPayments.service"
import getPaymentByPartner from "services/Partners/SearchPayment.service"
import getPrices from "services/Partners/GetPrices.service"
import editPartnerPayment from "services/Partners/EditPartnerPayment.service"
import { PartnersContext } from "contexts/Partners"
import PaymentInterface from "interfaces/partners/PaymentInterface"
import ScrollView from "components/UI/ScrollView"
import SearchBar from "components/UI/SearchBar"
// import ModalForm from "components/UI/ModalForm"
// import Autocomplete from "components/UI/Autocomplete"
// import TextField from "components/UI/TextField"
// import Checkbox from "components/UI/Checkbox"
// import ComboBoxSelect from "components/UI/ComboBoxSelect"
import Container from "./styles"
import PaymentCard from "./PaymentCard"
// import {
//   HorizontalGroup,
//   SubContainer,
//   CheckboxContainer,
// } from "../CreatePartner/styles"

const PaymentsHistory = () => {
  const {
    setCombos,
    combos,
    // comboRef,
    comboSelected,
    // paidTimeRef,
    // setPaidTime,
    paidTime,
    // timeUnits,
    // paidTimeUnitRef,
    // setPaidTimeUnit,
    // setIsChecked,
    // clasesRef,
    // setAmountOfClases,
    amountOfClases,
    // trainersList,
    // trainertRef,
    // setTrainerSelected,
    // setComboSelected,
    // paymentMethods,
    // paymentRef,
    // setPaymentMethodSelected,
    // finalPrice,
    // isChecked,
    // setTrainersList,
    setFinalPrice,
    paymentMethodSelected,
    paidTimeUnit,
    setPrices,
    prices,
    // cleanStates,
    // setModalSuccess,
    // setModalError,
    setScheduleList,
    // setScheduleSelected,
    // scheduleList,
    // scheduleSelected,
    setActiveEdition,
  } = useContext(PartnersContext)
  const [paymentsList, setPaymentsList] = useState<PaymentInterface[]>([])
  const [triggerListUpdate, setTriggerListUpdate] = useState<number>(1)

  // const [newValues, setNewValues] = useState<PaymentInterface>(null)

  const [searchPartner, setSearchPartner] = useState<string>("")

  const fillData = async () => {
    if (searchPartner.length > 3) {
      const payments = await getPaymentByPartner(searchPartner, 1)
      setPaymentsList(payments.data)
      console.log(searchPartner)
    } else {
      const payments = await getPartnerPayments(1)
      setPaymentsList(payments.data)
    }
  }

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerListUpdate, searchPartner])

  const staticData = async () => {
    const data = await getCombos()
    setCombos(data.data)

    const pricesData = await getPrices()
    setPrices(pricesData.data)
  }

  useEffect(() => {
    staticData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerListUpdate])

  const combosAutocomplete = []
  combos.map(combo =>
    combosAutocomplete.push({
      id: combo.id,
      display_name: combo.name,
    }),
  )

  // const handleEdit = async e => {
  //   e.preventDefault()

  //   const today = new Date()
  //   const newDate = new Date(today.setMonth(today.getMonth() + paidTime))
  //   const expireDate = newDate.getDate()
  //   const expireMonth = newDate.getMonth()
  //   const expireYear = newDate.getFullYear()
  //   const finalExpireDay = expireDate > 9 ? expireDate : `0${expireDate}`
  //   let finalExpireMonth
  //   if (comboSelected !== null && comboSelected !== undefined) {
  //     finalExpireMonth =
  //       expireMonth + 2 > 9 ? expireMonth + 2 : `0${expireMonth + 2}`
  //   } else {
  //     finalExpireMonth =
  //       expireMonth + 1 > 9 ? expireMonth + 1 : `0${expireMonth + 1}`
  //   }

  //   const body = {
  //     ...newValues,
  //     price_paid: finalPrice,
  //     payment_expire_date:
  //       (paidTimeUnit !== undefined && paidTimeUnit.id === 2) ||
  //       (comboSelected !== null && comboSelected !== undefined)
  //         ? `${finalExpireDay}/${finalExpireMonth}/${expireYear}`
  //         : "",
  //     days_and_hours:
  //       scheduleSelected.length > 0 ? `${scheduleSelected}` : null,
  //   }

  //   await paidTimeUnitRef.current?.focus()
  //   // await trainertRef.current?.focus()
  //   await paymentRef.current?.focus()
  //   if (
  //     paidTimeUnitRef.current.attributes.getNamedItem("data-error").value ===
  //       "false" &&
  //     // trainertRef.current.attributes.getNamedItem("data-error").value ===
  //     //   "false" &&
  //     paymentRef.current.attributes.getNamedItem("data-error").value === "false"
  //   ) {
  //     const executeEdition = await editPartnerPayment(body)

  //     if (executeEdition.message === "payment updated successfully") {
  //       setModalSuccess({
  //         status: "success",
  //         icon: "IconCheckModal",
  //         title: "Excelente!",
  //         content: "El pago ha sido actualizado correctamente",
  //       })
  //       setTriggerListUpdate(triggerListUpdate + 1)
  //       setActiveEdition(null)
  //       setNewValues(null)
  //       cleanStates()
  //     } else {
  //       setModalError({
  //         status: "alert",
  //         icon: "IconExclamation",
  //         title: "UPS!",
  //         content:
  //           "El pago no se pudo procesar, por favor intentalo nuevamente o comunicate con el admin.",
  //       })
  //       setActiveEdition(null)
  //       setNewValues(null)
  //       cleanStates()
  //     }
  //   }
  // }

  // const cancelEdit = () => {
  //   setActiveEdition(null)
  //   setNewValues(null)
  //   cleanStates()
  // }

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

  const removeDays = async e => {
    const paymentUnit = paymentsList.filter(payment => payment.id === e)
    if (paymentUnit[0].time_paid > 0) {
      const calculate = paymentUnit[0].time_paid - 1
      if (calculate > 0) {
        const body = {
          ...paymentUnit[0],
          time_paid: calculate,
        }
        await editPartnerPayment(body)
      } else {
        const body = {
          ...paymentUnit[0],
          time_paid: 0,
          time_paid_unit: 0,
        }
        await editPartnerPayment(body)
      }
    }
    setTriggerListUpdate(triggerListUpdate + 1)
  }

  return (
    <div style={{ paddingTop: "20px" }}>
      <SearchBar
        searchValue={searchPartner}
        onChangeSearch={e => setSearchPartner(e.target.value)}
        width={250}
      />
      <ScrollView height={550}>
        <Container>
          {paymentsList.length &&
            paymentsList.map(payment => (
              <PaymentCard
                key={payment.id}
                id={payment.id}
                partner_name={payment.partner_name}
                partner_last_name={payment.partner_last_name}
                combo={payment.combo}
                time_paid={payment.time_paid}
                time_paid_unit={payment.time_paid_unit}
                clases_paid={payment.clases_paid}
                payment_expire_date={payment.payment_expire_date}
                date={payment.date}
                onClickEdit={() => {
                  setActiveEdition(payment)
                  // setNewValues(payment)
                }}
                onClickRemoveDays={removeDays}
              />
            ))}
        </Container>
      </ScrollView>
    </div>
  )
}

export default PaymentsHistory
