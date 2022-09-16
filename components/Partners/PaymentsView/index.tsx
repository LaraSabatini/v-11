import React, { useContext, useEffect, useState } from "react"
import PaymentHistoryInterface from "interfaces/partners/PaymentHistoryInterface"
import getCombos from "services/Partners/GetCombos.service"
import { getBoulderPayments } from "services/Partners/BoulderPayments.service"
import { PaymentsHistory } from "contexts/PaymentsHistory"
import { PartnersContext } from "contexts/Partners"
import DataTable from "components/UI/DataTable"
import Filters from "./Filters"
import columns from "./const/content"
import { Container, TableContainer } from "./styles"

interface RowsInterface {
  partner_id: number
  combo: number
  time_paid: number
  time_paid_unit: string | number
  clases_paid: number
  payment_method_id: string | number
  price_paid: number | string
  date: Date
}

const PaymentsView = () => {
  const { setPaymentsList } = useContext(PaymentsHistory)
  const { combos, setCombos, timeUnits, paymentMethods } = useContext(
    PartnersContext,
  )
  // filtros
  // visual mensual
  // visual diario
  // mostrar hora
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [rows, setRows] = useState<{
    success: boolean
    message?: {
      icon: string
      content: string
    }
    rows: any[]
  }>()

  const fillData = async () => {
    const data = await getBoulderPayments(currentPage)
    setPaymentsList(data.data)

    const combosData = await getCombos()
    setCombos(combosData.data)

    const rowsCleaned: RowsInterface[] = []

    data.data.map((item: PaymentHistoryInterface) =>
      rowsCleaned.push({
        partner_id: item.partner_id,
        combo:
          item.combo !== 0
            ? combosData.data.filter(combo => combo.id === item.combo)[0].name
            : "-",
        time_paid: item.time_paid,
        time_paid_unit:
          item.time_paid_unit !== 0
            ? timeUnits.filter(
                timeUnit => timeUnit.id === item.time_paid_unit,
              )[0].display_name
            : "-",
        clases_paid: item.clases_paid,
        payment_method_id: paymentMethods.filter(
          payment => payment.id === item.payment_method_id,
        )[0].display_name,
        price_paid: `$${item.price_paid}`,
        date: item.date,
      }),
    )
    // const prueba = new Date(data.data[0].date)
    // console.log(prueba.toISOString().split("T")[0], prueba, data.data[0].date)

    setRows({
      success: true,
      rows: rowsCleaned,
    })
  }

  useEffect(() => {
    fillData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(combos)

  return (
    <Container>
      <Filters />
      <TableContainer>
        <DataTable columns={columns} rows={rows} height={500} />
      </TableContainer>
    </Container>
  )
}

export default PaymentsView
