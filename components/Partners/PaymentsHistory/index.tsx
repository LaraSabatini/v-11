import React, { useContext, useEffect, useState } from "react"
import getCombos from "services/Partners/GetCombos.service"
import getPartnerPayments from "services/Partners/GetPartnerPayments.service"
import { PartnersContext } from "contexts/Partners"
import PaymentInterface from "interfaces/partners/PaymentInterface"
import ScrollView from "components/UI/ScrollView"
import ModalForm from "components/UI/ModalForm"
import PaymentCard from "./PaymentCard"
import Container from "./styles"

const PaymentsHistory = () => {
  const { setCombos } = useContext(PartnersContext)
  const [paymentsList, setPaymentsList] = useState<PaymentInterface[]>([])
  const [activeEdition, setActiveEdition] = useState<PaymentInterface>()

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

  const handleEdit = () => {}
  const cancelEdit = () => {}

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
              onClickEdit={() => setActiveEdition(payment)}
            />
          ))}
      </Container>
      {activeEdition !== undefined && (
        <ModalForm
          title={`Editar Pago - ${activeEdition.partner_name} ${activeEdition.partner_last_name}`}
          cancelButtonContent="Cancelar"
          submitButtonContent="Confirmar"
          submit={handleEdit}
          cancelFunction={cancelEdit}
        >
          <p>alo</p>
        </ModalForm>
      )}
    </ScrollView>
  )
}

export default PaymentsHistory
