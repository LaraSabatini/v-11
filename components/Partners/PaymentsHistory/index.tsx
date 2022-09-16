import React, { useContext, useEffect, useState } from "react"
import getCombos from "services/Partners/GetCombos.service"
import getPartnerPayments from "services/Partners/GetPartnerPayments.service"
import getPaymentByPartner from "services/Partners/SearchPayment.service"
import getPrices from "services/Partners/GetPrices.service"
import editPartnerPayment from "services/Partners/EditPartnerPayment.service"
import { PartnersContext } from "contexts/Partners"
import PaymentInterface from "interfaces/partners/PaymentInterface"
import ScrollView from "components/UI/ScrollView"
import SearchBar from "components/UI/SearchBar"
import { createBoulderPayment } from "services/Partners/BoulderPayments.service"
import Container from "./styles"
import PaymentCard from "./PaymentCard"
import EditPayment from "./EditPayment"

const PaymentsHistory = () => {
  const {
    setCombos,
    setPrices,
    setActiveEdition,
    setNewValues,
    activeEdition,
    newValues,
    comboSelected,
    finalPrice,
    paidTimeUnit,
    scheduleSelected,
    paidTimeUnitRef,
    paymentRef,
    setModalSuccess,
    cleanStates,
    setModalError,
    paidTime,
  } = useContext(PartnersContext)
  const [paymentsList, setPaymentsList] = useState<PaymentInterface[]>([])
  const [triggerListUpdate, setTriggerListUpdate] = useState<number>(1)

  const [searchPartner, setSearchPartner] = useState<string>("")

  const fillData = async () => {
    if (searchPartner.length > 3) {
      const payments = await getPaymentByPartner(searchPartner, 1)
      setPaymentsList(payments.data)
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

  const today = new Date()
  const getDay = today.getDate()
  const getMonth = today.getMonth()
  const year = today.getFullYear()

  const day = getDay > 9 ? getDay : `0${getDay}`
  const month = getMonth + 1 > 9 ? getMonth + 1 : `0${getMonth + 1}`

  const handleEdit = async e => {
    e.preventDefault()

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
      days_and_hours: scheduleSelected.length > 0 ? `${scheduleSelected}` : "",
      date: `${day}/${month}/${year}`,
    }

    await paidTimeUnitRef.current?.focus()
    await paymentRef.current?.focus()
    if (
      paidTimeUnitRef.current.attributes.getNamedItem("data-error").value ===
        "false" &&
      paymentRef.current.attributes.getNamedItem("data-error").value === "false"
    ) {
      const executeEdition = await editPartnerPayment(body)

      const boulderBody = {
        id: 0,
        partner_id: newValues.partner_id,
        combo: newValues.combo,
        time_paid: newValues.time_paid,
        time_paid_unit: newValues.time_paid_unit,
        clases_paid: newValues.clases_paid,
        payment_method_id: newValues.payment_method_id,
        price_paid: finalPrice,
        date: `${day}/${month}/${year}`,
      }
      const boulderPayment = await createBoulderPayment(boulderBody)

      if (
        executeEdition.message === "payment updated successfully" &&
        boulderPayment.message === "payment created successfully"
      ) {
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
          {paymentsList.length ? (
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
                  setNewValues({
                    id: payment.id,
                    partner_id: payment.partner_id,
                    partner_name: payment.partner_name,
                    partner_last_name: payment.partner_last_name,
                    combo: 0,
                    time_paid: 0,
                    time_paid_unit: 0,
                    clases_paid: 0,
                    payment_method_id: 0,
                    payment_method_name: "",
                    price_paid: 0,
                    date: "",
                    payment_expire_date: "",
                    days_and_hours: "",
                  })
                }}
                onClickRemoveDays={removeDays}
              />
            ))
          ) : (
            <></>
          )}
        </Container>
        {activeEdition !== undefined &&
          activeEdition !== null &&
          newValues !== null && (
            <EditPayment handleEdit={handleEdit} cancelEdit={cancelEdit} />
          )}
      </ScrollView>
    </div>
  )
}

export default PaymentsHistory
