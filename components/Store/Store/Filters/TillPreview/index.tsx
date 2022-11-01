import React, { useEffect, useState } from "react"
import ModalForm from "components/UI/ModalForm"
import calcTotalEarnings from "utils/calcTotalEarnings"
// import { day, month, year } from "const/time"
import { View, Title, Row, Amount } from "./styles"

interface TillPreviewInterface {
  closeTillPreview: () => void
}

function TillPreview({ closeTillPreview }: TillPreviewInterface) {
  const [totalEarnings, setTotalEarnings] = useState<{
    cash: number
    mp: number
  }>({ cash: 0, mp: 0 })

  const closeTill = async e => {
    e.preventDefault()
    // eslint-disable-next-line no-console
    console.log("cerrar caja")

    // window.open(
    //   `mailto:sabatinilara@gmail.com,roman@gmail.com?subject=Cierre de Caja ${day}-${month}-${year}&body=Caja efectivo: $${totalEarnings.cash},
    //   Caja MP: $${totalEarnings.mp}

    //   Se vendieron tantos pases
    //   `,
    // )
  }

  const getFinalEarings = async () => {
    const res = await calcTotalEarnings()
    setTotalEarnings(res)
  }

  useEffect(() => {
    getFinalEarings()
  }, [])

  return (
    <ModalForm
      title="CAJA"
      cancelButtonContent="Salir"
      submitButtonContent="Cerrar caja"
      submit={closeTill}
      cancelFunction={closeTillPreview}
    >
      <View>
        <Row>
          <Title>Caja Efectivo:</Title>
          <Amount>$ {totalEarnings.cash}</Amount>
        </Row>
        <Row>
          <Title>Caja Mercado Pago:</Title>
          <Amount>$ {totalEarnings.mp}</Amount>
        </Row>
      </View>
    </ModalForm>
  )
}

export default TillPreview
