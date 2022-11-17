import React, { useEffect, useState, useContext } from "react"
import {
  getTillByDate,
  createTillClosure,
  updateTillClosure,
  getEarningsByDate,
} from "services/Finances/ClosedTill.service"
import ModalForm from "components/UI/ModalForm"
import { StoreContext } from "contexts/Store"
import { GeneralContext } from "contexts/GeneralContext"
import { calcTotalEarnings } from "utils"
import { day, month, year } from "const/time"
import sendEmail from "services/SendEmail.service"
import transformHTML from "mails/tillPreview"
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
  const { users } = useContext(GeneralContext)
  const { setModalSuccess, setModalError } = useContext(StoreContext)

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

    const checkIfTillClosed = await getTillByDate(today)

    let success = false

    if (checkIfTillClosed.data.length > 0) {
      const tillBody = {
        id: checkIfTillClosed.data[0].id,
        date: checkIfTillClosed.data[0].date,
        software_cash: totalEarnings.cash,
        software_mp: totalEarnings.mp,
        real_cash: totalEarningsMofified.cash,
        real_mp: totalEarningsMofified.mp,
        closed_by: currentUser,
      }
      const updateTill = await updateTillClosure(tillBody)
      success = updateTill.message === "Till updated successfully"
    } else {
      const tillBody = {
        id: 0,
        date: today,
        software_cash: totalEarnings.cash,
        software_mp: totalEarnings.mp,
        real_cash: totalEarningsMofified.cash,
        real_mp: totalEarningsMofified.mp,
        closed_by: currentUser,
      }
      const createTill = await createTillClosure(tillBody)
      success = createTill.message === "Till closed successfully"
    }

    if (success) {
      const getDataForMail = await getEarningsByDate(today)

      const checkFourPackPass =
        getDataForMail.data.boulderData.freePass.packFour > 0
      const checkEightPackPass =
        getDataForMail.data.boulderData.freePass.packEight > 0

      let totalPeople =
        getDataForMail.data.boulderData.freePass.total -
        getDataForMail.data.boulderData.freePass.packFour * 4 -
        getDataForMail.data.boulderData.freePass.packEight * 8

      totalPeople = checkFourPackPass
        ? totalPeople + getDataForMail.data.boulderData.freePass.packFour
        : totalPeople

      totalPeople = checkEightPackPass
        ? totalPeople + getDataForMail.data.boulderData.freePass.packEight
        : totalPeople

      const checkFourPackLessons =
        getDataForMail.data.boulderData.lessons.packFour > 0
      const checkEightPackLessons =
        getDataForMail.data.boulderData.lessons.packEight > 0

      let totalPeopleLessons =
        getDataForMail.data.boulderData.lessons.total -
        getDataForMail.data.boulderData.lessons.packFour * 4 -
        getDataForMail.data.boulderData.lessons.packEight * 8

      totalPeopleLessons = checkFourPackLessons
        ? totalPeopleLessons + getDataForMail.data.boulderData.lessons.packFour
        : totalPeopleLessons

      totalPeopleLessons = checkEightPackLessons
        ? totalPeopleLessons + getDataForMail.data.boulderData.lessons.packEight
        : totalPeopleLessons

      const htmlBody = {
        till: {
          software: totalEarnings,
          real: totalEarningsMofified,
        },
        earningsStore: {
          cash: getDataForMail.data.storeData.cash,
          mp: getDataForMail.data.storeData.mp,
        },
        earningsBoulder: {
          cash: getDataForMail.data.boulderData.cash,
          mp: getDataForMail.data.boulderData.mp,
        },
        user: currentUser,
        freePass: {
          fourPack: getDataForMail.data.boulderData.freePass.packFour,
          eightPack: getDataForMail.data.boulderData.freePass.packEight,
          total: getDataForMail.data.boulderData.freePass.total,
        },
        lessons: {
          fourPack: getDataForMail.data.boulderData.lessons.packFour,
          eightPack: getDataForMail.data.boulderData.lessons.packEight,
          total: getDataForMail.data.boulderData.lessons.total,
        },
        amountOfPeople:
          totalPeople +
          totalPeopleLessons +
          getDataForMail.data.boulderData.month,
        date: `${day}/${month}/${year}`,
        hour: `${now.getHours()}:${now.getMinutes()}`,
        month: getDataForMail.data.boulderData.month,
      }

      const getMails = users.map(user => user.email).filter(mail => mail !== "")
      getMails.forEach((email, i) => {
        getMails[i] = { email }
      })
      const recipients = getMails

      const transformBody = transformHTML(htmlBody)
      const body = {
        recipients,
        subject: "Cierre de caja",
        text: transformBody,
        category: "finanzas",
      }
      const send = await sendEmail(body)

      if (send.info === "Mail sent successfully") {
        setModalSuccess({
          status: "success",
          icon: "IconCheckModal",
          title: "Excelente!",
          content: "La caja se ha cerrado correctamente",
        })
      } else {
        setModalError({
          status: "alert",
          icon: "IconExclamation",
          title: "UPS!",
          content:
            "Ha ocurrido un error al cerrar la caja, por favor intentalo nuevamente o comunicate con el administrador.",
        })
      }
    }
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
