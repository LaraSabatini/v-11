import React, { useContext, useEffect, useState } from "react"
import getCombos from "services/Partners/GetCombos.service"
import getPartnerPayments from "services/Partners/GetPartnerPayments.service"
import { PartnersContext } from "contexts/Partners"
import PaymentInterface from "interfaces/partners/PaymentInterface"
import PaymentCard from "./PaymentCard"

const PaymentsHistory = () => {
  const { setCombos } = useContext(PartnersContext)
  const [paymentsList, setPaymentsList] = useState<PaymentInterface[]>([])

  const fillData = async () => {
    const data = await getCombos()
    setCombos(data.data)

    const payments = await getPartnerPayments(1)
    setPaymentsList(payments.data)
  }

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ marginTop: "30px" }}>
      {paymentsList.length &&
        paymentsList.map(payment => (
          <PaymentCard
            // id={payment.id}
            // partner_id={payment.partner_id}
            partner_name={payment.partner_name}
            partner_last_name={payment.partner_last_name}
            combo={payment.combo}
            time_paid={payment.time_paid}
            time_paid_unit={payment.time_paid_unit}
            clases_paid={payment.clases_paid}
            // trainer_id={payment.trainer_id}
            trainer_name={payment.trainer_name}
            // payment_method_id={payment.payment_method_id}
            // payment_method_name={payment.payment_method_name}
            // price_paid={payment.price_paid}
            // date={payment.date}
            payment_expire_date={payment.payment_expire_date}
          />
        ))}
    </div>
  )
}

export default PaymentsHistory
