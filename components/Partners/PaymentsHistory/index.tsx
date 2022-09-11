import React, { useContext, useEffect } from "react"
import getCombos from "services/Partners/GetCombos.service"
import { PartnersContext } from "contexts/Partners"
import PaymentInterface from "interfaces/partners/PaymentInterface"
import PaymentCard from "./PaymentCard"

const PaymentsHistory = () => {
  const { setCombos } = useContext(PartnersContext)

  const fillCombos = async () => {
    const data = await getCombos()
    setCombos(data.data)
  }

  useEffect(() => {
    fillCombos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hola: PaymentInterface = {
    id: 2,
    partner_id: 1,
    partner_name: "Lara",
    partner_last_name: "Sabatini",
    combo: 0,
    time_paid: 1,
    time_paid_unit: 1,
    clases_paid: 0,
    trainer_id: 0,
    trainer_name: "",
    payment_method_id: 1,
    payment_method_name: "Efectivo",
    price_paid: 750,
    date: "11/09/2022",
    payment_expire_date: "10/12/2022",
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <PaymentCard
        // id={hola.id}
        // partner_id={hola.partner_id}
        partner_name={hola.partner_name}
        partner_last_name={hola.partner_last_name}
        combo={hola.combo}
        time_paid={hola.time_paid}
        time_paid_unit={hola.time_paid_unit}
        clases_paid={hola.clases_paid}
        trainer_id={hola.trainer_id}
        trainer_name={hola.trainer_name}
        // payment_method_id={hola.payment_method_id}
        // payment_method_name={hola.payment_method_name}
        // price_paid={hola.price_paid}
        // date={hola.date}
        payment_expire_date={hola.payment_expire_date}
      />
    </div>
  )
}

export default PaymentsHistory
