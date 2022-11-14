import React, {
  useEffect,
  useState,
  //  useContext
} from "react"
import {
  getTillByDate,
  createTillClosure,
  updateTillClosure,
} from "services/Finances/ClosedTill.service"
import ModalForm from "components/UI/ModalForm"
import { calcTotalEarnings } from "utils"
import { day, month, year } from "const/time"
// import { GeneralContext } from "contexts/GeneralContext"
// import sendEmail from "services/SendEmail"
// import transformHTML from "mails/closeTill"
import TextField from "components/UI/TextField"
import {
  View,
  Title,
  Row,
  Amount,
  HorizontalGroup,
  DifferenceContainer,
} from "./styles"

interface TillPreviewInterface {
  closeTillPreview: () => void
}

function TillPreview({ closeTillPreview }: TillPreviewInterface) {
  // const { users } = useContext(GeneralContext)

  const [totalEarnings, setTotalEarnings] = useState<{
    cash: number
    mp: number
  }>({ cash: 0, mp: 0 })

  const [totalEarningsMofified, setTotalEarningsModified] = useState<{
    cash: number
    mp: number
  }>({ cash: 0, mp: 0 })

  const [difference, setDifference] = useState<{
    cash: number
    mp: number
  }>({ cash: 0, mp: 0 })

  const [tillDiff, setTillsDiff] = useState<boolean>(false)

  const currentUser = localStorage.getItem("user")

  const today = `${day}-${month}-${year}`

  const now = new Date()

  const closeTill = async e => {
    e.preventDefault()

    // const checkIfTillClosed = await getTillByDate(today)

    // let success = false

    // if (checkIfTillClosed.data.length > 0) {
    //   const tillBody = {
    //     id: checkIfTillClosed.data[0].id,
    //     date: checkIfTillClosed.data[0].date,
    //     software_cash: totalEarnings.cash,
    //     software_mp: totalEarnings.mp,
    //     real_cash: totalEarningsMofified.cash,
    //     real_mp: totalEarningsMofified.mp,
    //     closed_by: currentUser,
    //   }
    //   const updateTill = await updateTillClosure(tillBody)
    //   success = updateTill.message === "Till updated successfully"
    // } else {
    //   const tillBody = {
    //     id: 0,
    //     date: today,
    //     software_cash: totalEarnings.cash,
    //     software_mp: totalEarnings.mp,
    //     real_cash: totalEarningsMofified.cash,
    //     real_mp: totalEarningsMofified.mp,
    //     closed_by: currentUser,
    //   }
    //   const createTill = await createTillClosure(tillBody)
    //   success = createTill.message === "Till closed successfully"
    // }

    // if (success) {
    // till: {
    //   software: { cash: string; mp: string }
    //   real: { cash: string; mp: string }
    // },
    // earningsStore: { cash: string; mp: string },
    // earningsBoulder: { cash: string; mp: string },
    // user: string,
    // freePass: {
    //   fourPack: number
    //   eightPack: number
    //   total: number
    // },
    // lessons: {
    //   fourPack: number
    //   eightPack: number
    //   total: number
    // },
    // amountOfPeople: number,
    // date: string,
    // hour: string,

    // const htmlBody = {
    //   till: {
    //     software: totalEarnings,
    //     real: totalEarningsMofified,
    //   },
    //   earningsStore: earnigsStoreData,
    //   earningsBoulder: 0,
    //   user: currentUser,
    //   freePass: {
    //     fourPack: 0,
    //     eightPack: 0,
    //     total: 0,
    //   },
    //   lessons: {
    //     fourPack: 0,
    //     eightPack: 0,
    //     total: 0,
    //   },
    //   amountOfPeople: 0,
    //   date: today,
    //   hour: `${now.getHours()}:${now.getMinutes()}`,
    //   month: 0
    // }

    //
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
    // }
  }

  const getFinalEarings = async () => {
    const res = await calcTotalEarnings()
    setTotalEarnings(res)
    setTotalEarningsModified(res)
  }

  useEffect(() => {
    getFinalEarings()
  }, [])

  const calcDifference = () => {
    if (
      totalEarningsMofified.cash !== totalEarnings.cash ||
      totalEarningsMofified.mp !== totalEarnings.mp
    ) {
      setTillsDiff(true)
      const diffCash =
        totalEarningsMofified.cash > totalEarnings.cash
          ? totalEarningsMofified.cash - totalEarnings.cash
          : totalEarnings.cash - totalEarningsMofified.cash

      const diffMP =
        totalEarningsMofified.mp > totalEarnings.mp
          ? totalEarningsMofified.mp - totalEarnings.mp
          : totalEarnings.mp - totalEarningsMofified.mp

      setDifference({
        cash: diffCash,
        mp: diffMP,
      })
    } else {
      setTillsDiff(false)
    }
  }

  useEffect(() => {
    calcDifference()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalEarningsMofified, totalEarnings])

  return (
    <ModalForm
      title="CAJA"
      cancelButtonContent="Salir"
      submitButtonContent="Cerrar caja"
      submit={closeTill}
      cancelFunction={closeTillPreview}
    >
      <View>
        <HorizontalGroup>
          <Row>
            <Title>Caja Efectivo:</Title>
            <Amount>$ {totalEarnings.cash}</Amount>
          </Row>
          <Row>
            <Title>Caja Mercado Pago:</Title>
            <Amount>$ {totalEarnings.mp}</Amount>
          </Row>
        </HorizontalGroup>
        <HorizontalGroup>
          <TextField
            label="Caja Efectivo Fisico"
            type="number"
            value={`${totalEarningsMofified.cash}`}
            width={190}
            onChange={e => {
              if (e.target.value === "") {
                setTotalEarningsModified({
                  ...totalEarningsMofified,
                  cash: 0,
                })
              } else {
                setTotalEarningsModified({
                  ...totalEarningsMofified,
                  cash: parseInt(e.target.value, 10),
                })
              }
            }}
          />
          <TextField
            label="Caja MP Fisico"
            type="number"
            value={`${totalEarningsMofified.mp}`}
            width={190}
            onChange={e => {
              if (e.target.value === "") {
                setTotalEarningsModified({
                  ...totalEarningsMofified,
                  mp: 0,
                })
              } else {
                setTotalEarningsModified({
                  ...totalEarningsMofified,
                  mp: parseInt(e.target.value, 10),
                })
              }
            }}
          />
        </HorizontalGroup>
        <DifferenceContainer>
          {tillDiff && <p>Diferencia efectivo: {difference.cash}</p>}
          {tillDiff && <p>Diferencia mercado pago: {difference.mp}</p>}
        </DifferenceContainer>
      </View>
    </ModalForm>
  )
}

export default TillPreview
