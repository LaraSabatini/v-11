import React, { useEffect, useState, useContext } from "react"
import { GeneralContext } from "contexts/GeneralContext"
import getFinancesData from "services/BusinessLogic/getFinancesData.service"
import { StoreContext } from "contexts/Store"
import sendEmail from "services/SendEmail.service"
import { getUsersAction } from "helpers/users"
import {
  getTillByDate,
  createTillClosure,
  updateTillClosure,
} from "services/Finances/ClosedTill.service"
import FinancialDataInterface from "interfaces/finances/FinancialData"
import { day, month, year } from "const/time"
import TextField from "components/UI/TextField"
import ModalForm from "components/UI/ModalForm"
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

function TillClosure({ closeTillPreview }: TillPreviewInterface) {
  const { users, setUsers } = useContext(GeneralContext)
  const { setModalSuccess, setModalError } = useContext(StoreContext)

  const [tillData, setTillData] = useState<FinancialDataInterface>()
  const [totalEarningsMofified, setTotalEarningsModified] = useState<{
    cash: number
    mp: number
  }>({ cash: 0, mp: 0 })
  const [difference, setDifference] = useState<{
    cash: number
    mp: number
  }>({ cash: 0, mp: 0 })
  const [tillDiff, setTillsDiff] = useState<boolean>(false)

  const today = `${day}-${month}-${year}`

  const currentUser = localStorage.getItem("user")
  const now = new Date()

  const getData = async () => {
    const financialData = await getFinancesData(today)
    setTillData(financialData.data)
  }

  const setUsersList = async () => {
    const getUserData = await getUsersAction()

    const cleanedUserArray = getUserData.filter(
      user => user.admin === 1 && user.email !== "",
    )
    setUsers(cleanedUserArray)
  }

  const calcDifference = () => {
    if (
      totalEarningsMofified.cash !== tillData.tillEarnings.cash ||
      totalEarningsMofified.mp !== tillData.tillEarnings.mp
    ) {
      setTillsDiff(true)
      const diffCash =
        totalEarningsMofified.cash > tillData.tillEarnings.cash
          ? totalEarningsMofified.cash - tillData.tillEarnings.cash
          : tillData.tillEarnings.cash - totalEarningsMofified.cash

      const diffMP =
        totalEarningsMofified.mp > tillData.tillEarnings.mp
          ? totalEarningsMofified.mp - tillData.tillEarnings.mp
          : tillData.tillEarnings.mp - totalEarningsMofified.mp

      setDifference({
        cash: diffCash,
        mp: diffMP,
      })
    } else {
      setTillsDiff(false)
    }
  }

  const closeTill = async e => {
    e.preventDefault()

    const checkIfTillClosed = await getTillByDate(today)

    let success = false

    if (checkIfTillClosed.data.length > 0) {
      const tillBody = {
        id: checkIfTillClosed.data[0].id,
        date: checkIfTillClosed.data[0].date,
        software_cash: tillData.tillEarnings.cash,
        software_mp: tillData.tillEarnings.mp,
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
        software_cash: tillData.tillEarnings.cash,
        software_mp: tillData.tillEarnings.mp,
        real_cash: totalEarningsMofified.cash,
        real_mp: totalEarningsMofified.mp,
        closed_by: currentUser,
      }
      const createTill = await createTillClosure(tillBody)
      success = createTill.message === "Till closed successfully"
    }

    if (success) {
      const htmlBody = {
        till: {
          software: tillData.tillEarnings,
          real: totalEarningsMofified,
        },
        earningsStore: {
          cash: tillData.store.earnings.cash,
          mp: tillData.store.earnings.mp,
        },
        earningsBoulder: {
          cash: tillData.boulder.earnings.cash,
          mp: tillData.boulder.earnings.mp,
        },
        user: currentUser,
        freePass: {
          fourPack: tillData.boulder.freePass.packFour,
          eightPack: tillData.boulder.freePass.packEight,
          individual: tillData.boulder.freePass.individual,
          total: tillData.boulder.freePass.total,
        },
        lessons: {
          fourPack: tillData.boulder.lessons.packFour,
          eightPack: tillData.boulder.lessons.packEight,
          individual: tillData.boulder.lessons.individual,
          total: tillData.boulder.lessons.total,
        },
        amountOfPeople:
          tillData.boulder.freePass.amountOfPeople +
          tillData.boulder.lessons.individual +
          tillData.boulder.lessons.packFour +
          tillData.boulder.lessons.packEight +
          tillData.boulder.month.total +
          tillData.boulder.combo.total +
          tillData.boulder.freePassWithDiscount.total,
        date: `${day}/${month}/${year}`,
        hour: `${now.getHours()}:${now.getMinutes()}`,
        month: tillData.boulder.month.total,
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
        setModalSuccess(send.message)
      } else {
        setModalError(send.message)
      }
    }
  }

  useEffect(() => {
    getData()
    setUsersList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (tillData !== undefined) {
      calcDifference()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalEarningsMofified, tillData])

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
            <Amount>$ {tillData?.tillEarnings.cash}</Amount>
          </Row>
          <Row>
            <Title>Caja Mercado Pago:</Title>
            <Amount>$ {tillData?.tillEarnings.mp}</Amount>
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

export default TillClosure
