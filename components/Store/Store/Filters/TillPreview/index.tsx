import React, {
  useEffect,
  useState,
  //  useContext
} from "react"
import ModalForm from "components/UI/ModalForm"
import { calcTotalEarnings } from "utils"
// import { day, month, year } from "const/time"
// import { GeneralContext } from "contexts/GeneralContext"
// import sendEmail from "services/SendEmail"
// import transformHTML from "mails/closeTill"

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

  // const currentUser = localStorage.getItem("user")

  const closeTill = async e => {
    e.preventDefault()

    // const getMails = users.map(user => user.email).filter(mail => mail !== "")
    // getMails.forEach((email, i) => {
    //   getMails[i] = { email }
    // })
    // const pruebaMail = [{ email: "sabatinilara@gmail.com" }]
    // const recipients = getMails
    // const recipients = pruebaMail
    // const HTMLToSend = transformHTML(totalEarnings, earningsStore, earningsBoulder, currentUser)
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
