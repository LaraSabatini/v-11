import React, {
  useEffect,
  useState,
  //  useContext
} from "react"
import ModalForm from "components/UI/ModalForm"
import { calcTotalEarnings } from "utils"
import TextField from "components/UI/TextField"
// import { day, month, year } from "const/time"
// import { GeneralContext } from "contexts/GeneralContext"
// import sendEmail from "services/SendEmail"
// import transformHTML from "mails/closeTill"

import {
  View,
  Title,
  Row,
  Amount,
  RowContainer,
  DifferenceData,
} from "./styles"

interface TillPreviewInterface {
  closeTillPreview: () => void
}

function TillPreview({ closeTillPreview }: TillPreviewInterface) {
  // const { users } = useContext(GeneralContext)

  const [totalEarningsSoftware, setTotalEarningsSoftware] = useState<{
    cash: number
    mp: number
  }>({ cash: 0, mp: 0 })

  const [totalEarningsMaterial, setTotalEarningsMaterial] = useState<{
    cash: number
    mp: number
  }>({ cash: 0, mp: 0 })

  const [difference, setDifference] = useState<{
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
    setTotalEarningsSoftware(res)
    setTotalEarningsMaterial(res)
  }

  useEffect(() => {
    getFinalEarings()
  }, [])

  const calcDifference = () => {
    // if(totalEarningsMaterial.cash > totalEarningsSoftware.cash) {

    // }
    const differenceCalc = {
      cash:
        totalEarningsMaterial.cash > totalEarningsSoftware.cash
          ? totalEarningsMaterial.cash - totalEarningsSoftware.cash
          : totalEarningsSoftware.cash - totalEarningsMaterial.cash,
      mp:
        totalEarningsMaterial.mp > totalEarningsSoftware.mp
          ? totalEarningsMaterial.mp - totalEarningsSoftware.mp
          : totalEarningsSoftware.mp - totalEarningsMaterial.mp,
    }

    setDifference(differenceCalc)
  }

  useEffect(() => {
    calcDifference()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalEarningsMaterial])

  return (
    <ModalForm
      title="CAJA"
      cancelButtonContent="Salir"
      submitButtonContent="Cerrar caja"
      submit={closeTill}
      cancelFunction={closeTillPreview}
    >
      <View>
        <RowContainer>
          <Row>
            <Title>SOFTWARE - Efectivo:</Title>
            <Amount>$ {totalEarningsSoftware.cash}</Amount>
          </Row>
          <Row>
            <Title>SOFTWARE - Mercado Pago:</Title>
            <Amount>$ {totalEarningsSoftware.mp}</Amount>
          </Row>
        </RowContainer>
        <RowContainer>
          <Row className="software">
            <Title>FISICO - Efectivo:</Title>
            <TextField
              label=""
              type="number"
              width={100}
              value={`${totalEarningsMaterial.cash}`}
              onChange={e => {
                setTotalEarningsMaterial({
                  cash: parseInt(e.target.value, 10),
                  mp: totalEarningsMaterial.mp,
                })
              }}
            />
          </Row>
          <Row className="software">
            <Title>FISICO - Mercado Pago:</Title>
            <TextField
              label=""
              type="number"
              width={100}
              value={`${totalEarningsMaterial.mp}`}
              onChange={e => {
                setTotalEarningsMaterial({
                  cash: totalEarningsMaterial.cash,
                  mp: parseInt(e.target.value, 10),
                })
              }}
            />
          </Row>
        </RowContainer>
        {totalEarningsMaterial === totalEarningsSoftware ? (
          <DifferenceData>Cajas coincidentes</DifferenceData>
        ) : (
          <DifferenceData>
            Diferencia FT: <b>$ {difference.cash}</b> | Diferencia MP:{" "}
            <b>$ {difference.mp}</b>
          </DifferenceData>
        )}
      </View>
    </ModalForm>
  )
}

export default TillPreview
