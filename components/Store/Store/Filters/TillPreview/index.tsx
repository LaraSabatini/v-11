import React, { useEffect, useState, useContext } from "react"
import {
  getTillByDate,
  createTillClosure,
  updateTillClosure,
  getEarningsByDate,
} from "services/Finances/ClosedTill.service"
import { getUsersAction } from "helpers/users"
import ModalForm from "components/UI/ModalForm"
import { StoreContext } from "contexts/Store"
import { GeneralContext } from "contexts/GeneralContext"
import { calcTotalEarnings } from "utils"
import { day, month, year } from "const/time"
import sendEmail from "services/SendEmail.service"
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
  const { users, setUsers } = useContext(GeneralContext)
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

      const fourFreePass = getDataForMail.data.boulderData.freePass.packFour * 4
      const eightFreePass =
        getDataForMail.data.boulderData.freePass.packEight * 8

      const totalPassMinusPacks =
        getDataForMail.data.boulderData.freePass.total -
        fourFreePass -
        eightFreePass

      const fourLessons = getDataForMail.data.boulderData.lessons.packFour * 4
      const eightLessons = getDataForMail.data.boulderData.lessons.packEight * 8

      const totalLessonsMinusPacks =
        getDataForMail.data.boulderData.lessons.total -
        fourLessons -
        eightLessons

      const amountOfPeople =
        totalPassMinusPacks +
        getDataForMail.data.boulderData.freePass.packFour +
        getDataForMail.data.boulderData.freePass.packEight +
        totalLessonsMinusPacks +
        getDataForMail.data.boulderData.lessons.packFour +
        getDataForMail.data.boulderData.lessons.packEight +
        getDataForMail.data.boulderData.month

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
          individual: totalPassMinusPacks,
          total: getDataForMail.data.boulderData.freePass.total,
        },
        lessons: {
          fourPack: getDataForMail.data.boulderData.lessons.packFour,
          eightPack: getDataForMail.data.boulderData.lessons.packEight,
          individual: totalLessonsMinusPacks,
          total: getDataForMail.data.boulderData.lessons.total,
        },
        amountOfPeople,
        date: `${day}/${month}/${year}`,
        hour: `${now.getHours()}:${now.getMinutes()}`,
        month: getDataForMail.data.boulderData.month,
      }

      const getMails = users.map(user => user.email).filter(mail => mail !== "")
      getMails.forEach((email, i) => {
        getMails[i] = email
      })
      const recipients = getMails.join(", ")

      const body = {
        recipients,
        subject: "Cierre de caja",
        data: htmlBody,
      }

      const send = await sendEmail(body)

      if (send.status === 200) {
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

  const setUsersList = async () => {
    const getUserData = await getUsersAction()

    const cleanedUserArray = getUserData.filter(
      user => user.admin === 1 && user.email !== "",
    )
    setUsers(cleanedUserArray)
  }

  useEffect(() => {
    getFinalEarings()
    setUsersList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
