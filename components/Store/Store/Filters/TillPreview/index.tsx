import React, {
  useEffect,
  useState,
  //  useContext
} from "react"
import ModalForm from "components/UI/ModalForm"
import calcTotalEarnings from "utils/calcTotalEarnings"
// import { day, month, year } from "const/time"
// import { GeneralContext } from "contexts/GeneralContext"
// import sendEmail from "services/SendEmail"
// import "public/logo.png"
// import transformHTML from "mails/closeTill"
import calcEarningsStore from "utils/calcEarningsStore"
import { View, Title, Row, Amount } from "./styles"

interface TillPreviewInterface {
  closeTillPreview: () => void
}

function TillPreview({ closeTillPreview }: TillPreviewInterface) {
  // const { users } = useContext(GeneralContext)

  const [totalEarnings, setTotalEarnings] = useState<{
    cash: number
    mp: number
  }>({ cash: 0, mp: 0 })

  const closeTill = async e => {
    e.preventDefault()

    const prueba = await calcEarningsStore()

    // eslint-disable-next-line no-console
    console.log("EARNINGS STORE", prueba)

    const final = {
      cash: 0,
      mp: 0,
    }
    prueba.map(item => {
      if (item.payment_method_id === 1) {
        final.cash += item.profit
      } else {
        final.mp += item.profit
      }
      return {}
    })

    console.log(final)

    // const getMails = users.map(user => user.email).filter(mail => mail !== "")
    // getMails.forEach((email, i) => {
    //   getMails[i] = { email }
    // })
    // const pruebaMail = [{ email: "sabatinilara@gmail.com" }]
    // const recipients = getMails
    // const recipients = pruebaMail
    // const HTMLToSend = transformHTML(totalEarnings)
    // const html = HTMLToSend

    // const body = {
    //   recipients,
    //   subject: "otra prueba",
    //   text: html,
    //   category: "test",
    // }

    // eslint-disable-next-line no-console
    // console.log(body)

    // const send = sendEmail(body)
    // console.log(body, getMails)
    // condicional => "Mail sent successfully"
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
